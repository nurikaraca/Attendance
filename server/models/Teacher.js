const mongoose = require('mongoose')

const TeacherSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
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
        default: 'teacher'
    }


})

module.exports= mongoose.model('TeacherSchema' , UserSchema)