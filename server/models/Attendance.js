const mongoose = require('mongoose')
const attendanceSchema =  mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student',
        required:true
    },
    date:{
        type:Date,
        required:true
    },

    lessonNo: {
        type:Number,
        required: true
    },
    
    attended: {
        type:Boolean,
        required:true
    }
});

module.exports=mongoose.model('Attendance',attendanceSchema);