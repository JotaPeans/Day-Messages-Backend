import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    userFromId: String,
    userToId: String,
    message: String,
    date: String
});

const MessageModel = mongoose.model("user", MessageSchema);

export default MessageModel;