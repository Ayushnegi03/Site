const mongoose = require('mongoose');


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MOONGO)
        console.log('MongoDB connected...');
    }
    catch(err){
        console.error(err)
        process.exit(1);
        //res.status(401).json({
          // msg:'Error Occured' 
        //})

    }
}


module.exports=connectDB