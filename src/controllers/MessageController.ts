import MessageModel from "../models/MessageModel";
import { Request, Response } from "express";
import utcToZonedTime = require("date-fns-tz/utcToZonedTime");

interface IMessage {
    userFromId: string,
    userToId: string,
    message: string,
    date?: Date
}

class MessageController {
    async createMessage(req: Request, res: Response) {
        try {
            const { userFromId, userToId, message }: IMessage = req.body;
            const date = new Date().toISOString();

            const messageModel = new MessageModel({
                userFromId: userFromId,
                userToId: userToId,
                message: message,
                date: date,
            });

            const createdMessage = await MessageModel.create(messageModel);

            return res.status(200).json({message: "mensagem criada"});

        } catch (err) {
            return res.status(400).json({message: err});
        }

    }
    
    async getAllMessages(req: Request, res: Response) {
        try {
            const messages: IMessage[] | null = await MessageModel.find({});
            
            if(!messages) {
                return res.status(404).json({message: "nenhuma mensagem cadastrada"});
            }

            return res.status(200).json({message: messages});

        } catch (err) {
            return res.status(400).json({message: err});
        }
    }

    async getMessagesByUserToId(req: Request, res: Response) {
        try {
            const { userToId } = req.params;
            
            const messages: IMessage[] | null = await MessageModel.find({userToId: userToId});

            if(!messages) {
                return res.status(404).json({message: "nenhuma mensagem cadastrada"});
            }

            for(let message of messages) {
                message.date = utcToZonedTime(message.date, "America/Sao_Paulo")//.toLocaleDateString();
            }
            
            return res.status(200).json(messages);

        } catch (err) {
            return res.status(400).json({message: err});
        }
    }
}

export default new MessageController;