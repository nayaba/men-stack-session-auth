require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')

const app = express()

// MONGOOSE DATABASE CONNECTION
const port = process.env.PORT ? process.env.PORT : '3000'

// CONTROLLERS
const authCtrl = require('./controllers/auth.js')

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 👮🏻‍♀️`)
})

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

// LINK PUBLIC DIRECTORY
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES
app.get('/', async (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  })
})
app.get('/vip-lounge', (req, res) => {
  req.session.user
    ? res.send(`Welcome to the party ${req.session.user.username}`)
    : res.send('Sorry, no guests allowed.')
})

// AUTH ROUTER
app.use('/auth', authCtrl)

// START SERVER & LISTEN FOR INCOMING REQUESTS ON PORT 3000
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`)
})
