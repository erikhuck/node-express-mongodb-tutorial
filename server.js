// If we are running in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Import the router (acts as the controller in MVC)
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Successfully Connected to MongoDB!')) // Called once when we connect to the DB

app.use('/', indexRouter)

// Default to 3000 if the PORT environment variable is not available
app.listen(process.env.PORT || 3000, () => {
    console.log('Successfully Started Server!')
})