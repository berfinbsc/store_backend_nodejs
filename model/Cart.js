const mongoose = require('mongoose')
const CartItem = require('./CartItem')

const cartShema = new mongoose.Schema({

userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    require : true    
},
products : [CartItem],

subTotal : {
    default : 0,
    type :Number,
},



})





module.exports=mongoose.model('Cart',cartShema)