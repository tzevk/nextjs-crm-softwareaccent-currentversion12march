import clientPromise from '../mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Leads");
    const collection = db.collection("Lead_Data");

    if (req.method === "GET") {
      const companies = await collection
        .find({}, { projection: { _id: 0, company_name: 1 } })
        .toArray();

      return res.status(200).json(companies);
    }

    if (req.method === "POST") {
      const { company_name } = req.body;

      if (!company_name || typeof company_name !== "string") {
        return res.status(400).json({ message: "Invalid company name" });
      }

      // Insert only if it doesn't exist
      const existing = await collection.findOne({ company_name });
      if (existing) {
        return res.status(409).json({ message: "Company already exists" });
      }

      await collection.insertOne({ company_name });
      return res.status(201).json({ message: "Company added successfully" });
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error handling companies API:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}