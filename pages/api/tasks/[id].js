import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { parse } from "cookie";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("TasksDatabase");
  const collection = db.collection("Tasks");

  const { id } = req.query;
  const cookies = parse(req.headers.cookie || "");
  const userEmail = cookies.session;

  if (!userEmail) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "PUT") {
    const { text } = req.body;
    await collection.updateOne(
      { _id: new ObjectId(id), user: userEmail },
      { $set: { text } }
    );
    return res.status(200).json({ message: "Task updated" });
  }

  if (req.method === "DELETE") {
    await collection.deleteOne({ _id: new ObjectId(id), user: userEmail });
    return res.status(200).json({ message: "Task deleted" });
  }

  if (req.method === "PATCH") {
    const { completed } = req.body;
    await collection.updateOne(
      { _id: new ObjectId(id), user: userEmail },
      { $set: { completed } }
    );
    return res.status(200).json({ message: "Task updated" });
  }

  res.setHeader("Allow", ["PUT", "DELETE", "PATCH"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}