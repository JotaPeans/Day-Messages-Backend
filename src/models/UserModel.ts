import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    cpf: String,
    password: String,
    userPhoto: String
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;