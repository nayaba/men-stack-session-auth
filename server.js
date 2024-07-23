require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride =  require('method-override')
const morgan = require('morgan')

const app = express()

// MONGOOSE DATABASE CONNECTION
const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name} 👮🏻‍♀️`)
})

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))

// START SERVER & LISTEN FOR INCOMING REQUESTS ON PORT 3000
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`)
})