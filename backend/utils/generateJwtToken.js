import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    // maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // Cookie inaccessible via JavaScript
    // secure: false, // Use true for production with HTTPS
    // sameSite: "lax", // Adjust according to your needs
    // path: "/", // Accessible site-wide
  });
};

export default generateTokenAndSetCookie;
