const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config() 
const express=require('express')
const app=express();
const connectDB =require('./db/Connect')
const productRouter=require('./routes/RoueProduct')
app.use(express.json());
const port =process.env.PORT
const url=process.env.MONGO_URI
app.use(express.static('./public'));
const cors = require('cors');
app.use(cors());

app.use('/api/v1',productRouter)


const start = async()=>{

    try{

        await connectDB(url)
        app.listen(port, ()=> console.log(`server is listening port ${port} `))



    }
catch(err){
console.log(err)
}


}

start();