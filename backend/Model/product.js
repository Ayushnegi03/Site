const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        description:{
            type:String,required:true
        },
        price:{type:Number,required:true},
        imageUrl:{
            type:String,required:true
        },
        quantity:{
            type:Number,
        } ,
        date:{
            type:Date,
            default: Date.now,
        }
    }
)


module.exports=mongoose.model('products',productSchema)