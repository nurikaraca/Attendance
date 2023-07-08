const express = require('express');
const { adminRegister,adminLogin } = require('../../controllers/auth/userAuth.js');
const { teacherRegister,teacherLogin } = require('../../controllers/auth/teacherAuth.js');
const { studentRegister, studentLogin} = require('../../controllers/auth/studentAuth.js');
const authenticationMiddleware = require('../../middleware/authentication.js');
const logout= require('../../controllers/auth/logout.js')
const router = express.Router();

// admin 
router.post('/adminRegister', adminRegister)
router.post('/adminLogin' , adminLogin)

// teacher
router.post('/teacherRegister' ,authenticationMiddleware, teacherRegister)
router.post('/teacherLogin' ,teacherLogin)

//student
router.post('/studentRegister' ,authenticationMiddleware,studentRegister )
router.post('/studentLogin' ,  studentLogin )

// logout
router.post('/logout', logout);
module.exports=router
