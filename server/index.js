const express = require('express')
const app= express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const db = require('./config/db.js')

//routes 
const  userRoutes = require('./routes/auth/authRouter.js')
const  attendanceRouter= require('./routes/attendanceRouter.js')

dotenv.config()
app.use(cors())
app.use(bodyParser.json({limit: '30mb' , extended:true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cookieParser())

//session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

app.use('/', userRoutes)
app.use('/', attendanceRouter)


db();
const PORT = 3000;
app.listen(PORT , () =>{
    console.log(`server  is running on port - > ${PORT}`)
})
