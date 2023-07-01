const express = require('express');
const { register } = require('../../controllers/auth/userAuth.js');
const router = express.Router();

router.post('/register', register)
//router.post('/login', login)

module.exports=router