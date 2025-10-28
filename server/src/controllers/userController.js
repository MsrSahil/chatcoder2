import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const GetAllUser = async (req, res, next) => {
  try {
    const currentUser = req.user._id;
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
    const senderID = req.user._id;

    const { text, timestamp } = req.body.messagePack;

    if (!receiverID || !senderID || !text || !timestamp) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const newMessage = await Message.create({
      receiverID,
      senderID,
      text,
      timestamp,
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
    const SenderID = req.user._id;

    if (!ReceiverID || !SenderID) {
      const error = new Error("Please fill all the fields");
      error.statusCode = 400;
      return next(error);
    }

    const conversatation = await Message.find({
      $or: [
        { senderID: SenderID, receiverID: ReceiverID },
        { senderID: ReceiverID, receiverID: SenderID },
      ],
    })
      .populate("receiverID", "fullName photo")
      .populate("senderID", "fullName photo")
      .sort({ createdAt: 1 });

    res
      .status(201)
      .json({ message: "Message Sent Sucessfully", data: conversatation });
  } catch (error) {
    next(error);
  }
};