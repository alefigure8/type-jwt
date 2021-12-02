import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string
    iat: number
    exp: number
}

const TokenValidation = function (req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json('Access denied!')
    const payload = jwt.verify(token, process.env.JWT_TOKEN || 'tokentest') as IPayload
    req.userId = payload._id
    next()
}

export default TokenValidation