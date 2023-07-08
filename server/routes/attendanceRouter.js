const express = require('express');
const router = express.Router();
const  {createAttendance } = require('../controllers/attendanceController');



router.post('/createAttendance', createAttendance)

module.exports=router