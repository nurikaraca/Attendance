const express = require('express');
const router = express.Router();
const  {createAttendance } = require('../controllers/attendanceController');
const {isAdmin,isTeacher} = require('../middleware/authentication')


router.post('/createAttendance',isTeacher, createAttendance)

module.exports=router