import mongoose from "mongoose";
const {Schema} = mongoose
export let UsersSchema = new Schema({
    name: String,
    nickname: String,
    password: String,
    email: String,
    isCreate: {
        type:Boolean,
        default:true
    }
});








