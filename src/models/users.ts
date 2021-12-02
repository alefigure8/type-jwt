import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    username: string,
    mail: string,
    password: string
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

export default model<IUser>('Users', userSchema)