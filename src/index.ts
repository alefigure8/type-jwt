import dotenv from 'dotenv'
import app from './app'
dotenv.config()
import './database'
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});