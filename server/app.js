import express from 'express'
import cors from 'cors'
import User from './src/routes/user'
import Event from './src/routes/event'
import './src/config'
require('dotenv').config({path: `./${process.env.NODE_ENV}.env`})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/users', User)
app.use('/events', Event)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});