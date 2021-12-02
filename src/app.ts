import express from 'express'
import auth from './routes/auth'
import morgan from 'morgan'
const app = express();

// port
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use('/', auth)

export default app