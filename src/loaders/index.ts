import mongoose from "mongoose";
import { config } from "dotenv";
import { resolve } from "path";

config({
    path: resolve(__dirname, "../../.env")
})

async function startDB() {
    mongoose.set('strictQuery', true);
    const mongoURL = process.env.DB_URL;
    await mongoose.connect(mongoURL);
}

class Loaders { 
    start() {
        startDB();
    }
}

export default new Loaders();