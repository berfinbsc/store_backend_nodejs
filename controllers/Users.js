
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config() 
const bcrypt = require("bcrypt")

const User=require('../model/User')
const key=process.env.SECRET_KEY

const saltRounds = 10


const Login= async (req,res)=>{
try {
    
    const {email,password}=req.body
    console.log(email,password)

    const user = await User.findOne({email})
    console.log(user)

    if(!user){
        return res.status(401).json({error:'user did not avaliable'})
    }
    
    const isEqual= await bcrypt.compare(password,user.password)
    console.log(isEqual)

    if(!isEqual){
        return res.status(401).json({error:'wrong password'})
    }

    const token=jwt.sign({userId:user._id},key,{expiresIn:'1h'})
    res.status(200).json({token})
    console.log(token)


} catch (error) {
    res.status(500).json({error:'Login failed'})
}}





const Register=async(req,res)=>{

 try{

       const {userName,email,password}=req.body
       const hashedPassword=await bcrypt.hash(password,saltRounds)
       const user = new User({userName,email,password:hashedPassword})
       console.log(user)
      const a =  await user.save()
      console.log(a)
        res.status(201).json({message:'user registered successfully'})
             
    } catch(err){
        res.status(500).json({error: 'Registration failed'})
                }   
             

  
}  


const getAllUser=async(req,res)=>{
const users = await User.find();
console.log(users)
res.status(200).json(users)
}

module.exports={Login,Register,getAllUser}