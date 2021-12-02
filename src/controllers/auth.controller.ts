import { Request, Response } from 'express'
import User, {IUser} from '../models/users'
import jwt from 'jsonwebtoken'
import { token } from 'morgan'

export const signUp = async (req: Request, res: Response) => {

    const { username, mail, password } = req.body

    // validate user
    const userSign = await User.findOne({mail})
    if(userSign) return res.status(400).send('User is already register!')

    // saving new user
    const newUser: IUser = new User({username, mail, password})
    newUser.password = await newUser.encryptPassword(newUser.password)
    const savedUser = await newUser.save()

    // token
    const token: string = jwt.sign({ _id: savedUser._id }, process.env.JWT_TOKEN || 'tokentest')

    res.header('auth-token', token).json(savedUser)
}

export const signIn = async (req: Request, res: Response) => {
   const { username, mail, password } = req.body

   // find user & validate
   const userLogin = await User.findOne({mail})
   if(!userLogin) return res.status(400).json('Email or Password is incorrect!')

   //validate password
   const validatePassword: boolean = await userLogin.validatePassword(password)
   if(!validatePassword) return res.status(400).json('Invalid password!')

  const token: string =  jwt.sign({_id: userLogin._id}, process.env.JWT_TOKEN || 'tokentest', {expiresIn: 60 * 60})

   res.header('auth-token', token).send(userLogin)
}


export const profile = async (req: Request, res: Response) => {
   const user = await User.findById(req.userId, {password: 0})
   if(!user) return res.status(404).json('No user found')
    res.json({user})
}
