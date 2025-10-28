import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  GetAllUser,
  SendMessage,
  ReceiveMessage,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", Protect, GetAllUser);

router.post("/sendMessage/:id", Protect, SendMessage);
router.get("/receiveMessage/:id", Protect, ReceiveMessage);

export default router;