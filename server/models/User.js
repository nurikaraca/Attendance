const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    birthDate:{
        type:Date,
        required:true,
    },
    role: {
        type: String,
        default: 'admin'
    }


})

module.exports= mongoose.model('User' , userSchema)