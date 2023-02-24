import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    cpf: String,
    password: String
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;