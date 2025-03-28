import clientPromise from "./mongodb";
import { parse } from "cookie";
// import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("TasksDatabase");
  const collection = db.collection("Tasks");

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.session;

  if (!token) {
    console.log("❌ No session cookie found.");
    return res.status(200).json([]); // Don't crash the frontend
  }

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }

  const username = decoded.username; // ✅ use username

  if (req.method === "GET") {
    try {
      const tasks = await collection.find({ user: username }).toArray(); // ✅ match this to how you stored it
      console.log("✅ Fetched tasks for:", username, tasks);
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  if (req.method === "POST") {
    try {
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "Text is required" });

      const result = await collection.insertOne({
        text,
        completed: false,
        user: username, // ✅ match here
      });

      return res.status(201).json({ _id: result.insertedId, text, completed: false });
    } catch (error) {
      return res.status(500).json({ error: "Failed to add task" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}