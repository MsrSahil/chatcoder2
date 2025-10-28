import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (err) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }
};