import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface IUser {
    _id?: string,
    name: string,
    cpf: string,
    password: string,
    userPhoto: string //base64
}

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { name, cpf, password, userPhoto }: IUser = req.body;
            if(!cpf || !password || !name) {
                return res.status(400).json({message: "dados faltando"});
            }

            const userByCpf: IUser | null = await UserModel.findOne({cpf: cpf});

            if (!userByCpf) {
                const salt = await bcrypt.genSalt(12);
                const passwordHashed = await bcrypt.hash(password, salt);
                const register = new UserModel({
                    name: name,
                    cpf: cpf,
                    password: passwordHashed,
                    userPhoto: userPhoto
                });
                const createdUser = await UserModel.create(register);

                return res.status(200).json({
                    cpf: cpf,
                });
            }

            return res.status(400).json({message: "Usuário já existe"});

        } catch (err) {
            return res.status(400).json({message: "erro"});
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { cpf, password }: IUser = req.body;
        
            if(!cpf || !password) {
                return res.status(400).json({message: "CPF e password são obrigatórios"});
            }
        
            const user: IUser | null = await UserModel.findOne({cpf: cpf})
            if (!user) {
                return res.status(404).json({message: "Usuário não encontrado"});
            }
        
            const checkPassword = await bcrypt.compare(password, user.password);
        
            if(!checkPassword) {
                return res.status(400).json({message: "Senha invalida"});
            }

            const secret = process.env.JWT_SECRET;

            const token = jwt.sign({
                id: user._id
            }, secret);

            return res.status(200).json({userName: user.name, userId: user._id, userPhoto: user.userPhoto, token: token});

        } catch (err) {
            return res.status(400).json({error: err});
        }
        
    }

    async showAll(req: Request, res: Response) {
        try {
            const users: IUser[] | null = await UserModel.find({isAdmin: false}, "-password");
            if(!users) {
                return res.status(404).json({message: "Usuário inexistente"});
            }

            return res.status(200).json(users);

        } catch (err) {
            return res.status(400).json({error: err});
        }
    }
    
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user: IUser | null = await UserModel.findById(id, "-password");
            
            if(!user) {
                return res.status(404).json({message: "Usuário inexistente"});
            }
            
            return res.status(200).json(user);
        } catch (err){
            return res.status(400).json({error: err});
        }
    }
}

export default new UserController();