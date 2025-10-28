import express from "express";
import {
  Register,
  Login,
  GoogleLogin,
  SendOTPForRegister,
  SendOTPForLogin,
  Logout,
} from "../controllers/authController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/googleLogin", GoogleLogin);
router.post("/sendOtpRegister", SendOTPForRegister);
router.post("/sendOtpLogin", SendOTPForLogin);
router.get("/logout", Protect, Logout);

export default router;