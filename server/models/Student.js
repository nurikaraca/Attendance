const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
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
        required:true
    }


})

module.exports= mongoose.model('Student' , studentSchema)