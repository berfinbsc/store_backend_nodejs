const mongoose = require('mongoose')

const likeShema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        require : true
    }
})


mongoose.model('LikeProduct',likeShema)