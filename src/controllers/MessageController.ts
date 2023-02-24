import MessageModel from "../models/MessageModel";
import { Request, Response } from "express";
import utcToZonedTime = require("date-fns-tz/utcToZonedTime");

interface IMessage {
    userFromId: string,
    userToId: string,
    messageFromBody: string,
    date?: string
}

class MessageController {
    async createMessage(req: Request, res: Response) {
        try {
            const { userFromId, userToId, messageFromBody }: IMessage = req.body;
            const date = new Date().toISOString();

            const message = new MessageModel({
                userFromId: userFromId,
                userToId: userToId,
                messageFromBody: messageFromBody,
                date: date,
            });

            const createdMessage = await MessageModel.create(message);

            return res.status(200).json({
                createdMessage: createdMessage
            });

        } catch (err) {
            return res.status(400).json({message: err});
        }

    }
    
    async getAllMessages(req: Request, res: Response) {
        try {
            const message: IMessage[] | null = await MessageModel.find({});
            
            if(!message) {
                return res.status(404).json({message: "nenhuma mensagem cadastrada"});
            }

            return res.status(200).json({message: message});

        } catch (err) {
            return res.status(400).json({message: err});
        }
    }

    async getMessagesByUserToId(req: Request, res: Response) {
        try {
            const { userToId } = req.params;
            
            const message: IMessage[] | null = await MessageModel.find({userToId: userToId});

            if(!message) {
                return res.status(404).json({message: "nenhuma mensagem cadastrada"});
            }

            return res.status(200).json({message: message});

        } catch (err) {
            return res.status(400).json({message: err});
        }
    }
}

export default new MessageController;