import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Leads"); // Your database name
    const data = await db
      .collection("Lead_Data")
      .find({ status: { $in: ["Awarded", "Closed"] } })
      .toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}