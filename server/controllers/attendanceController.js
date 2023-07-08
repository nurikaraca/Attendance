const Attendance = require('../models/Attendance');

const createAttendance = async(req,res,next) =>{
  const {studentId, date, lessonNo, attended} = req.body;

  try {
    const newAttendance = await Attendance.create({
        studentId,
        date,
        lessonNo,
        attended
    });
   res.status(201).json({attendance: newAttendance })
  } catch (error) {
    console.log("Error -> " , error)
    res.status(500).json({ message: 'Devam kaydı oluşturulurken bir hata oluştu.' });
  }


}


module.exports = { createAttendance };


