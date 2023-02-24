import "dotenv/config";
import app from "./app";
import Loaders from "./loaders/index";

const PORT = process.env.PORT || 3000;

Loaders.start();

app.listen(PORT, () => console.log("Server is Running"))