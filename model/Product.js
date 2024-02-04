const mongoose = require('mongoose')
const User = require('./User')
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


createdAt : {
    type : Date,
    default : Date.now(),
},
 
brand : {
    type : String,
    enum : {
        values : ['Avon','Oriflame','Pandora','Yves Saint Lauren','Monlain'],
        message : '{VALUE} is not supported',
    },
},


   gender:{
    type:String,
    enum:{values : ['Women','Men']},
    required : [true,'gender must be provide']
},

rating : {
    type:Number,
},


image :{
type: String,
required : [true,'image must be provide'],
},

likesCount : {
    type : Number,
    default : 0,
},

})



module.exports=mongoose.model('Product',productShema)





