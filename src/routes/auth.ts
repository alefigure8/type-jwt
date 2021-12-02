import { Router, Request, Response } from 'express'
const router: Router = Router()
import { signUp, signIn, profile } from '../controllers/auth.controller'

router.post('/signin', signIn)
router.post('/signup', signUp)
router.get('/profile', profile)

export default router