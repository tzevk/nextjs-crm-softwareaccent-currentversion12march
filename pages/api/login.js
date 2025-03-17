import Cookies from 'cookies';
import clientPromise from "../../lib/mongodb";
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const client = await clientPromise;
      const db = client.db("Users");

      // Check if user exists
      const user = await db.collection("Profiles").findOne({ Username: username });

      if (!user) {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }

      // Hash the input password
      const guess_hash = createHash('sha256').update(password).digest('hex');

      // Verify password
      if (guess_hash === user.Password) {
        // Set authentication cookie
        const cookies = new Cookies(req, res);
        cookies.set('username', username, { httpOnly: true });

        // ✅ Send success response to frontend
        return res.status(200).json({ success: true, message: "Login successful! Redirecting to dashboard..." });
      } else {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}