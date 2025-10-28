import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    const error = new Error("Unauthorized");
    error.status = 401;
    return next(error);
  }
};