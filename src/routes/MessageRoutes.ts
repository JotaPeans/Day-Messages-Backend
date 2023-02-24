import { Router } from "express";
import MessageController from "../controllers/MessageController";
import checkToken from "../middlewares/CheckToken";

const MessageRoutes = Router();

MessageRoutes.post("/message", checkToken, MessageController.createMessage);
MessageRoutes.post("/message/all", checkToken, MessageController.createMessage);
MessageRoutes.post("/message/:userToId", checkToken, MessageController.createMessage);

export default MessageRoutes;