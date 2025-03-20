// pages/api/tasks.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("TasksDatabase");
  const collection = db.collection("Tasks");

  if (req.method === "GET") {
    try {
      const tasks = await collection.find({}).toArray();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "Text is required" });
      const result = await collection.insertOne({ text, completed: false });
      res.status(201).json({ _id: result.insertedId, text, completed: false });
    } catch (error) {
      res.status(500).json({ error: "Failed to add task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}