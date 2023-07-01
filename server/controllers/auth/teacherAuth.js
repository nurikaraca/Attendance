const Teacher = require('../../models/Teacher');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const teacherRegister = async (req,res,next) =>{
    
    const {email,password}=req.body
  
    try {
       
       //email kullanılıyor mu  kontrolü
         const teacher = await Teacher.findOne(email)
         if(teacher) {
            return  res.status(400).json({message: 'Bu e-posta adresi zaten kullanılıyor'})
         }

         //uygun şifre  kontrolü
         if(password > 6 ) {
            res.status(400).json({message: 'Şifre en az 6 karakter olmalıdır'})
         }
        
         // hash 
         const passwordHash = await bcrypt.hash(password,10)

         // Email kontrolü 
         if(isEmail(email)) res.status(400).json({ message: "Geçersiz email adresi" })
         

         // yeni  User oluşturma 
         const  newTeacher  = await  Teacher.create({... req.body , password: passwordHash})

         //token oluşturma
         const token = await jwt.sign({id:newUser._id},process.env.SECRET_KEY,{ expiresIn: "1h" })

         //Tokenı cookie e kaydedip kullanıcıyı ve tokenı gönderiyor
         res.cookie("token",token,{httpOnly:true}).status(201).json({token,newTeacher})
            


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

const teacherLogin = async (req,res,next) =>{
const {email,password} = req.body
try {
      // kullanıcı var mı yok mu  kontrol ediyor.
      const teacher  = await Teacher.findOne(email) 
      if(!teacher){
        return res.status(400).json({message: "Bu e-posta adresine ait bir kullanıcı bulunmamakta."})

      }
    
      // password kontrol
      const passwordCompare =  await bcrypt.compare(password,teacher.password)
      if (!passwordCompare){
        return res.status(400).json({message: "Şifreler  uyuşmuyor"})
      }
      
      //token oluşuturuluyor
      const  token = await jwt.sign({id:teacher._id,}, process.env.SECRET_KEY,{expiresIn:'1h'})
      
      // cookie   ve  user    gönderilir 
      res.cookie('token', token,{httpOnly:true}).status(200).json({
        token,
        teacher
      })
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


module.exports = { teacherLogin, teacherRegister }