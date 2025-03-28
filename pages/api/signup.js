import clientPromise from './mongodb';
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password, passwordagain } = req.body;

      // Check if passwords match
      if (password !== passwordagain) {
        return res.status(400).json({ success: false, message: "The two passwords don't match" });
      }

      const client = await clientPromise;
      const db = client.db("Users");

      // Check if username already exists
      const existingUser = await db.collection("Profiles").findOne({ Username: username });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "A user already has this username" });
      }

      // Hash the password
      const password_hash = createHash('sha256').update(password).digest('hex');
      const currentDate = new Date().toUTCString();

      // Insert user into DB
      await db.collection("Profiles").insertOne({
        Username: username,
        Password: password_hash,
        Created: currentDate,
      });

      // ✅ Send a success response to frontend
      return res.status(200).json({ success: true, message: "User registered successfully. Redirecting to login..." });

    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}