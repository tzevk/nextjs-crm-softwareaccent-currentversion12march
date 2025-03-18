import Cookies from 'cookies';
import clientPromise from "../../lib/mongodb";
const { createHash } = require('node:crypto');

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const client = await clientPromise;
      const db = client.db("Users");

      console.log("🔍 Checking user:", username);

      // Check if user exists
      const user = await db.collection("Profiles").findOne({ Username: username });

      console.log("📂 Fetched user from DB:", user);

      if (!user) {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }

      // Hash the input password
      const guess_hash = createHash('sha256').update(password).digest('hex');

      console.log("🔐 Entered Password Hash:", guess_hash);
      console.log("🔐 Stored Password Hash:", user.Password);

      // Verify password
      if (guess_hash === user.Password) {
        // Set authentication cookie
        const cookies = new Cookies(req, res);
        cookies.set("session", username, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
          path: "/"
        });

        res.setHeader("Set-Cookie", `session=${username}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24}`);

        console.log("✅ Authentication Successful!");
        return res.status(200).json({ success: true, message: "Login successful! Redirecting to dashboard..." });
      } else {
        console.log("❌ Password Mismatch!");
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}