import jwt from "jsonwebtoken";

const genToken = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ only send over HTTPS in production
    sameSite: "none", // ✅ allow cross-site cookies
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  });

  return;
};

export default genToken;
