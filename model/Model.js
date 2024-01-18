const mongoose = require('mongoose')

const productShema = new mongoose.Schema({

name :{
    type:String,
    required : [true,'product name is require'],

},
price:{
type:Number,
required:[true,'product price is require'],
},

featured : {
    type :Boolean,
    default : false,
},

rating : {
    type:Number,
    default:4.5,
},

createdAt : {
    type : Date,
    default : Date.now(),
},
 
company : {
    type : String,
    enum : {
        values : ['ikea','liddy','caressa','marcos'],
        message : '{VALUE} is not supported',
    },
},

image :{
type: String,
required : [true,'image must be provide'],
},




})



module.exports=mongoose.model('Product',productShema)





