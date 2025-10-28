import jwt from "jsonwebtoken";

const genToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const isProd = process.env.NODE_ENV === "production";

  // Browsers require secure=true for cookies with SameSite='None'.
  // Use environment-aware settings so local dev remains simple.
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd, // true in production (HTTPS), false in local dev
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  });

  return;
};

export default genToken;
