require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const path = require('path')
const session = require('express-session')
const expressLayout = require('express-ejs-layouts')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const passport = require('passport')


const PORT = process.env.PORT || 3300

// Database connection
const url = 'mongodb+srv://first:ShivaM123@cluster.l1ei5.mongodb.net/test';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
   console.log('Database connected...');
}).on('error', function (error) {
   console.log('error is:', error);
});




// session store
// let mongoStore = new MongoDbStore({
//    mongooseConnection: connection,
//    collection: 'sessions'
// })



// sesseion config 
app.use(session({
   secret: process.env.COOKIE_SECRET,
   resave: false,
   store: MongoDbStore.create({mongoUrl:'mongodb://localhost:27017/pizza'}),
   saveUninitialized: false,
   cookie: { maxAge: 1000 * 60 * 24 }

}))

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.urlencoded( {extended: false}))



// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


//Global middleware
app.use((req, res, next) => {
   res.locals.session = req.session
   res.locals.user = req.user
   next()
})

app.use(express.json())
require('./routes/web')(app)


app.listen(PORT, () => {
   console.log(`listening on port ${PORT}`)
})