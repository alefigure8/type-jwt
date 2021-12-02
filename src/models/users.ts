import { Schema, model, Document } from "mongoose"
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    username: string
    mail: string
    password: string
    encryptPassword(password: string): Promise<string>
    validatePassword(password: string): Promise<boolean>
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

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
    const genSalt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, genSalt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('Users', userSchema)