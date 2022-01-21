import mongoose from "mongoose";
const {model} = mongoose
import {UsersSchema} from "../mongoSchema/userScheama.js";

export const UserModel = model('users',UsersSchema)






