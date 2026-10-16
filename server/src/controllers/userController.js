import mongoose from "mongoose";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const GetAllUser = async (req, res, next) => {
  try {
    const currentUser = req.user?._id;
    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized", data: [] });
    }
    const users = await User.find({ _id: { $ne: currentUser } }).select(
      "-password"
    );
    res.status(200).json({ message: "All User Fetched", data: users });
  } catch (error) {
    next(error);
  }
};

export const SendMessage = async (req, res, next) => {
  try {
    const receiverID = req.params.id;
    const senderID = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(receiverID)) {
      const error = new Error("Invalid receiver ID");
      error.statusCode = 400;
      return next(error);
    }

    const messagePack = req.body.messagePack || req.body;
    const { text, timestamp } = messagePack || {};

    if (!receiverID || !senderID || !text) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const newMessage = await Message.create({
      receiverID,
      senderID,
      text,
      timestamp: timestamp || new Date().toISOString(),
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("receiverID", "fullName photo")
      .populate("senderID", "fullName photo");

    res
      .status(201)
      .json({ message: "Message Sent Sucessfully", data: populatedMessage });
  } catch (error) {
    next(error);
  }
};

export const ReceiveMessage = async (req, res, next) => {
  try {
    const ReceiverID = req.params.id;
    const SenderID = req.user?._id;

    if (!ReceiverID || !SenderID) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    if (!mongoose.Types.ObjectId.isValid(ReceiverID)) {
      return res.status(200).json({ message: "Invalid user ID", data: [] });
    }

    const conversation = await Message.find({
      $or: [
        { senderID: SenderID, receiverID: ReceiverID },
        { senderID: ReceiverID, receiverID: SenderID },
      ],
    })
      .populate("receiverID", "fullName photo")
      .populate("senderID", "fullName photo")
      .sort({ createdAt: 1 });
    res.status(200).json({ message: "Conversation fetched successfully", data: conversation });
  } catch (error) {
    next(error);
  }
};

export const GetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Valid user id required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: "User fetched", data: user });
  } catch (error) {
    next(error);
  }
};