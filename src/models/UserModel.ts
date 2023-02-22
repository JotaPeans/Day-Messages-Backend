import mongoose, { mongo } from "mongoose";
import Schema from "./Schema";

const UserSchema = new Schema({
    cpf: String,
    password: String
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;