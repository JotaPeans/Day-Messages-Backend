import { Router } from "express";
import UserController from "../controllers/UserController";
import CheckToken from "../middlewares/CheckToken";

const UserRoutes = Router();

UserRoutes.get("/user/:id", CheckToken, UserController.show);
UserRoutes.get("/user", CheckToken, UserController.showAll);
UserRoutes.post("/signup", UserController.create);
UserRoutes.post("/signin", UserController.login);

export default UserRoutes;