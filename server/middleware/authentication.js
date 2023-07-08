


function isAdmin(req, res, next) {
    
    try {
        
        if (req.session.token) {
            if (req.session.role === 'admin') {
                next();
            } else {
                res.status(403).json({ message: 'Yetkisiz erişim.' });
            }
        } else {
            res.status(401).json({ message: 'Yetkilendirme başarısız. Geçerli bir oturum bulunamadı.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}


function isTeacher(req, res, next) {
    
    try {
        
        if (req.session.token) {
            if (req.session.role === 'teacher' ) {
                next();
            } else {
                res.status(403).json({ message: 'Yetkisiz erişim.' });
            }
        } else {
            res.status(401).json({ message: 'Yetkilendirme başarısız. Geçerli bir oturum bulunamadı.' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
}

module.exports ={
    isAdmin,
    isTeacher
}