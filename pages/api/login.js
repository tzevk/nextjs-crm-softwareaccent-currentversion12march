import Cookies from "cookies";
import { createHash } from "crypto";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const client = await clientPromise;
      const db = client.db("Users");

      // 1) Fetch the user from the Profiles collection
      const user = await db.collection("Profiles").findOne({ Username: username });
      if (!user) {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }

      // 2) Compare hashed passwords
      const guessHash = createHash("sha256").update(password).digest("hex");
      if (guessHash !== user.Password) {
        return res.status(401).json({ success: false, message: "Incorrect username or password" });
      }

      // 3) Set a session cookie to signify an authenticated user
      const cookies = new Cookies(req, res);
      cookies.set("session", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: "/",
      });

      return res.status(200).json({ success: true, message: "Login successful!" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}