const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    studentNumber:{
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
        default: 'student'
    }


})

module.exports= mongoose.model('User' , UserSchema)