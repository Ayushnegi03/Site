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
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
);
// productSchema.statics.findNonDeleted=async function (id){
//     return this.find(id,{isDeleted:true});
// }

productSchema.statics.softDeleteById=async function (id){
    return this.findByIdAndUpdate(id,{isDeleted:true},{new:true})
}

// productSchema.statics.restoreById=async function (id){
//     return this.findByIdAndUpdate(id,{isDeleted:true},{new:true})
// }

module.exports=mongoose.model('products',productSchema)