const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, { useUnifiedTopology: true })
const db = mongoose.connection
db.on("error", (error) => {
    console.error(error)    ``
})

db.once('open', () => {
    console.log("Connected to Database")
})

app.use(express.json())

const reservationRouter = require('./routes/reservations')


app.use('/reservations', reservationRouter)


app.listen(3000, () => console.log('Server Started'))