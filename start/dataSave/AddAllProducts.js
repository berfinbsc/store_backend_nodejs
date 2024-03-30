const dotenv=require('dotenv')
dotenv.config()
const connectDB =require('../../dataBase/Connect')
const url=process.env.MONGO_URI
const Product=require('../../model/Product')
const jsonData=require('../../products.json')
const startAdd = async()=>{

try{

await connectDB(url)
await Product.deleteMany()
await Product.create(jsonData)
console.log('All data have been created successfully')
//process.exit(0)
}

catch(err){
console.log(err);
//procces.exit(1)
}




}
startAdd();