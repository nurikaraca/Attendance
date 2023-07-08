const jwt = require('jsonwebtoken')

const verifyToken =(req,res,next ) =>{
    const token = req.cookies.token;
    if(!token){
        res.status(500).json({message: "Login değilsiniz."})
    }
    jwt.verify(token, process.env.SECRET_KEY ,(err,user) =>{
        if(err) res.status(500).json({message:"Token geçersiz ..."})
        req.user=user
        next();
    })
}

const verifyUser = (req,res,next) =>{
    
}