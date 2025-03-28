import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db("Leads");
      const collection = db.collection("Lead_Data");

      const newClient = req.body;
      const result = await collection.insertOne(newClient);
      res.status(201).json({ message: "Client added", id: result.insertedId });
    } catch (error) {
      console.error("Error inserting client:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}