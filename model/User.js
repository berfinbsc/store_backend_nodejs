const mongoose =require('mongoose')

const userShema=new mongoose.Schema({
userName:{
    type:String,
    required:[true,'you must provide userName'],
},
email:{
    type:String,
    required:[true,'you must provide email'],
},
password:{
    type:String,
    required:[true,'you must provide password'],
},


})


module.exports=mongoose.model('User',userShema)