const mongoose = require('mongoose')

const cartItem = new mongoose.Schema({

productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required : true
        },


quantity : {
            type : Number,
            default : 1,
            min :[1,"quantity can not be less than 1"]
        },
price : {
    type : Number,
    required : true,
},

total : {
    type :Number,
    required : true,
},


})

module.exports=mongoose.model('CartItem',cartItem)