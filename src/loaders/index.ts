import mongoose from "mongoose";
import "dotenv/config";

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