const Teacher = require('../../models/Teacher');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const teacherRegister = async (req, res, next) => {
console.log("req.body 1")
  const { username, password } = req.body

  try {

    console.log("req.body 1")
    // email kullanılıyor mu  kontrolü
    const teacher = await Teacher.findOne({ username: username })
    if (teacher) {
      return res.status(400).json({ message: 'Bu kullanıcı adı zaten  kullanılıyor' })
    }

    //uygun şifre  kontrolü
    if (password.length < 6) {
      res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır' })
    }
    console.log("req.body 3")
    // hash 
    const passwordHash = await bcrypt.hash(password, 10)
    console.log("req.body 4")
    // yeni  Teacher oluşturma 
    const newTeacher = await Teacher.create({ ...req.body, password: passwordHash })

    //token oluşturma
    const token = await jwt.sign({ id: newTeacher._id }, process.env.SECRET_KEY, { expiresIn: "1h" })
    //
    req.session.token = token;
    res.status(201).json({ token, newTeacher })

    console.log("req.body 5")


  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error })
  }
}

const teacherLogin = async (req, res, next) => {
  const { username, password } = req.body
  try {
    // kullanıcı var mı yok mu  kontrol ediyor.
    const teacher = await Teacher.findOne({ username: username })
    if (!teacher) {
      return res.status(400).json({ message: "Böyle bir  kullanıcı  bulunmamakta." })

    }

    // password kontrol
    const passwordCompare = await bcrypt.compare(password, teacher.password)
    if (!passwordCompare) {
      return res.status(400).json({ message: "Şifreler  uyuşmuyor" })
    }

    //token oluşuturuluyor
    const token = await jwt.sign({ id: teacher._id, }, process.env.SECRET_KEY, { expiresIn: '1h' })

    // cookie   ve  user    gönderilir 
    res.cookie('token', token, { httpOnly: true }).status(200).json({
      token,
      teacher
    })
  } catch (error) {
    res.status(500).json({ message: error })
  }
}





module.exports = { teacherLogin, teacherRegister }