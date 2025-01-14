const User = require('../Model/users')
const jwt = require('jsonwebtoken')


const isAdmin = async(req,res,next)=>{
    try{
         const token = req.header('Authorization');
         if (!token) return res.status(401).json({message:'Access Denied'}) 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access only.' });
          }

       req.user =user;
       next();


    }
    catch(error){
          res.status(401).json({message:'Invalid token.'})
    }
}


module.exports = isAdmin;