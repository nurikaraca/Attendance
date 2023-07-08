const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },   
    role: {
        type: String,
        required:true
    }


})

module.exports= mongoose.model('Teacher' , teacherSchema)