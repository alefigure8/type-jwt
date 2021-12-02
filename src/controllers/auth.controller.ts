import { Request, Response } from 'express'
import User, {IUser} from '../models/users'

export const signUp = async (req: Request, res: Response) => {
    const { username, mail, password } = req.body
    const newUser: IUser = new User({username, mail, password})
    const savedUser = await newUser.save()
    console.log(savedUser)
    res.send('received')
}

export const signIn = (req: Request, res: Response) => {
    res.send('Sign In')
}


export const profile = (req: Request, res: Response) => {
    res.send('Profile')
}
