import clientPromise from '../mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Leads"); 
    const collection = db.collection("Lead_Data");

    const { year } = req.query;
    let query = {};
    
    if (year) {
      query.year = parseInt(year, 10); // Ensure year is a number
    }

    console.log("📡 Querying MongoDB with:", query);

    // Fetch raw data to confirm if enquiry_status exists
    const rawData = await collection.find(query, { year: 1, enquiry_status: 1 }).toArray();
    console.log("📂 Raw MongoDB Data:", rawData);

    const result = await collection.aggregate([
      { $match: { ...query, enquiry_status: { $exists: true, $ne: null } } }, // Ignore missing enquiry_status
      {
        $group: {
          _id: { $toLower: "$enquiry_status" }, // Normalize case
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    console.log("✅ Aggregation result:", result);

    const statusMap = {
      open: "Open",
      "under discussion": "Under Discussion",
      awaiting: "Awaiting",
      awarded: "Awarded",
      closed: "Closed",
      close: "Closed"
    };

    const counts = { Open: 0, "Under Discussion": 0, Awaiting: 0, Awarded: 0, Closed: 0 };

    result.forEach((item) => {
      if (item._id && statusMap[item._id.trim()]) {
        counts[statusMap[item._id.trim()]] += item.count;
      }
    });

    console.log(`📊 Final counts for ${year}:`, counts);
    res.status(200).json(counts);
  } catch (error) {
    console.error("❌ Error fetching lead counts:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
}