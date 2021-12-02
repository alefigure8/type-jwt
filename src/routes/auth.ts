import { Router, Request, Response } from 'express'
const router: Router = Router()
import { signUp, signIn, profile } from '../controllers/auth.controller'
import TokenValidation from '../lib/verifyToken'

router.post('/signin', signIn)
router.post('/signup', signUp)
router.get('/profile', TokenValidation, profile)

export default router