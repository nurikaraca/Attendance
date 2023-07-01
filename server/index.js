const express = require('express')
const app= express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const db = require('./config/db.js')


//routes 
const  userRoutes = require('./routes/auth/authRouter.js')


dotenv.config()
app.use(cors())
app.use(bodyParser.json({limit: '30mb' , extended:true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cookieParser())

app.use('/', userRoutes)


db();
const PORT = 3000;
app.listen(PORT , () =>{
    console.log(`server  is running on port - > ${PORT}`)
})
