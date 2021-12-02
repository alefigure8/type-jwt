import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/jwt-test')
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err))

