import express from "express";
import Conversation from "../models/conversation.js";
import Message from "../models/message.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const router = express.Router();

//SEND MESSAGE ROUTE
router.post(
  "/send/:id",

  protectedRoute,

  //SEND MESSAGE ROUTE
  async (req, res) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      let conversation = await Conversation.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      //   await conversation.save();
      //   await newMessage.save();

      await Promise.all([conversation.save(), newMessage.save()]);

      // SOCKET IO FUNCTIONALITY WILL GO HERE
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//GET MESSAGES ROUTE
router.get("/:id", protectedRoute, async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGES FROM THE MESSAGES ARRAY

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
