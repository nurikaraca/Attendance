const Student = require('../../models/Student');
const User = require('../../models/Admin').default
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const studentRegister = async (req,res,next) =>{
  const {studentNumber,password}=req.body
  
    try {
       
       // studentNumber ile öğrenci mevcut  mu kontrol ediliyor 
         const student = await Student.findOne({studentNumber:studentNumber})
         if(student) {
            return  res.status(400).json({message: 'Bu öğrenci  zaten var'})
         }

         //uygun şifre  kontrolü
         if(password < 6 ) {
            res.status(400).json({message: 'Şifre en az 6 karakter olmalıdır'})
         }
        
         // hash 
         const passwordHash = await bcrypt.hash(password,10)

         // yeni  Öğrenci oluşturma 
         const  newStudent  = await  Student.create({... req.body , password: passwordHash})

         //token oluşturma
         const token = await jwt.sign({id:newStudent._id},process.env.SECRET_KEY,{ expiresIn: "1h" })

         //Tokenı cookie e kaydedip kullanıcıyı ve tokenı gönderiyor
         res.cookie("token",token,{httpOnly:true}).status(201).json({token,newStudent})
            


    } catch (error) {
       
        res.status(500).json({ message: error })
    }
}

const studentLogin = async (req,res,next) =>{
    const {studentNumber,password}=req.body
try {
      // öğrenci  var mı yok mu  kontrol ediyor.
      const student  = await Student.findOne({studentNumber:studentNumber})
      if(!student){
        return res.status(400).json({message: "Bu Öğrenci numarasına ait bir öğrenci  bulunmamakta."})
      }
    
      // password kontrol
      const passwordCompare =  await bcrypt.compare(password,student.password)
      if (!passwordCompare){
        return res.status(400).json({message: "Şifreler  uyuşmuyor"})
      }
      
      //token oluşuturuluyor
      const  token = await jwt.sign({id:student._id,}, process.env.SECRET_KEY,{expiresIn:'1h'})
      
      // cookie   ve  student    gönderilir 
      res.cookie('token', token,{httpOnly:true}).status(200).json({
        token,
        student
      })
} catch (error) {
    res.status(500).json({ message: error })
}
} 


module.exports = { studentLogin, studentRegister}