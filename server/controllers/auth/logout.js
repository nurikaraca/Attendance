const  logout = async(req,res,next) =>{
    try {
        req.session.destroy();
        res.clearCookie('token');

        res.status(200).json({message: "Çıkış başarılı"})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
module.exports= logout;