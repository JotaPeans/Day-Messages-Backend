import { Router } from "express";
import MessageController from "../controllers/MessageController";
import checkToken from "../middlewares/CheckToken";

const MessageRoutes = Router();

MessageRoutes.post("/message", checkToken, MessageController.createMessage);
MessageRoutes.get("/message/all", checkToken, MessageController.getAllMessages);
MessageRoutes.get("/message/:userToId", checkToken, MessageController.getMessagesByUserToId);

export default MessageRoutes;