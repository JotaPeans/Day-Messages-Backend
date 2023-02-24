import express from "express";
import UserRoutes from "./routes/UserRoutes";
import MessageRoutes from "./routes/MessageRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json())
app.use(UserRoutes);
app.use(MessageRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({message: "server is on!"})
})

export default app;