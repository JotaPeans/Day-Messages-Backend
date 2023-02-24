import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import "dotenv/config";

function checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if(!token) {
        return res.status(401).json({message: "acesso negado"});
    }

    try {
        const secret = process.env.JWT_SECRET;
        jwt.verify(token, secret);

        next();

    } catch (err) {
        return res.status(404).json({message: "Token inválido"});
    }
}

export default checkToken;