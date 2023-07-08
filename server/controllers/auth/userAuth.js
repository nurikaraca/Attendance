const Admin = require('../../models/Admin');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const adminRegister = async (req, res, next) => {
  const { email, password } = req.body
  try {
    //email kullanılıyor mu  kontrolü
    const admin = await Admin.findOne({email:email})
    if (admin) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor' })
    }
    //uygun şifre  kontrolü
    if (password.length < 6) {
      res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır' })
    }
  
    // hash 
    const passwordHash = await bcrypt.hash(password, 10)
  
    // Email kontrolü 
    if(!isEmail(email)) res.status(400).json({ message: "Geçersiz email adresi" })
         
    // yeni  User oluşturma 
    const newAdmin = await Admin.create({ ...req.body, password: passwordHash })
    
    //token oluşturma
    const token = await jwt.sign({ id: newAdmin._id }, process.env.SECRET_KEY, { expiresIn: "1h" })

    //
    req.session.token = token;
    res.status(201).json({token,newAdmin})


  } catch (error) {
    res.status(500).json({ message: error })
  } 
}

const adminLogin = async (req, res, next) => {
  
  const { email, password,role } = req.body
  try {
    // kullanıcı var mı yok mu  kontrol ediyor.
    const admin = await Admin.findOne({email:email})
    if (!admin) {
      return res.status(400).json({ message: "Bu e-posta adresine ait bir kullanıcı bulunmamakta." })

    }

    // password kontrol
    const passwordCompare = await bcrypt.compare(password, admin.password)
    if (!passwordCompare) {
      return res.status(400).json({ message: "Şifreler  uyuşmuyor" })
    }

    //token oluşuturuluyor
    const token = await jwt.sign({ id: admin._id, }, process.env.SECRET_KEY, { expiresIn: '1h' })

    // sessiona tokenı kaydetmek ve kullanıcıyı göndermek
    req.session.token=token;
    req.session.role=admin.role;
  
    res.status(200).json({
      token,
      admin,
      role:admin.role

    });
   
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex))
        return true;

    else
        return false;
}


module.exports = { adminLogin, adminRegister }