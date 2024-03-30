const mongoose  = require("mongoose");


const filterShema = new mongoose.Schema({

category : {
    type : String,
    required : true
},

values : {
    type : [String],
    required : true
}

})

module.exports=mongoose.model('Filter',filterShema)