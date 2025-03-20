import Cookies from "cookies";
import { createHash } from "crypto";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password } = req.body;
      const client = await clientPromise;
      const db = client.db("Users");

      // 1) Fetch the admin from the Admins collection
      const admin = await db.collection("Admins").findOne({ Username: username });
      if (!admin) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // 2) Compare hashed passwords
      const guessHash = createHash("sha256").update(password).digest("hex");
      if (guessHash !== admin.Password) {
        return res.status(401).json({ success: false, message: "Incorrect credentials" });
      }

      // 3) Set an adminSession cookie to signify an authenticated admin
      const cookies = new Cookies(req, res);
      cookies.set("adminSession", username, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: "/",
      });

      return res.status(200).json({ success: true, message: "Admin Authenticated!" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}