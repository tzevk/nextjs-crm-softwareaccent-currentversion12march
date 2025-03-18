import Cookies from "cookies";

export default function handler(req, res) {
  if (req.method === "POST") {
    // ✅ Initialize Cookies
    const cookies = new Cookies(req, res);

    // ✅ Clear session cookie
    cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Expire immediately
      path: "/",
    });

    // ✅ Redirect to login
    return res.status(200).json({ success: true, message: "Logged out successfully!" });
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}