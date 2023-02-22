import express from "express";
import UserRoutes from "./routes/UserRoutes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(UserRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({message: "server is on!"})
})

export default app;