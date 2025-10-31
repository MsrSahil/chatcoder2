import express from "express";
import { Protect } from "../middlewares/authMiddleware.js";
import {
  GetAllUser,
  SendMessage,
  ReceiveMessage,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", Protect, GetAllUser);

// Get a single user by id (public fields only)
router.get("/get/:id", Protect, GetUserById);

router.post("/sendMessage/:id", Protect, SendMessage);
router.get("/receiveMessage/:id", Protect, ReceiveMessage);

export default router;