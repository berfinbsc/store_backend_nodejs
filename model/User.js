const mongoose =require('mongoose')
const Product = require('./Product')

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

liked : [{
    type :mongoose.Schema.Types.ObjectId,
    ref : 'Product',
    require : true ,

}],

})


module.exports=mongoose.model('User',userShema)