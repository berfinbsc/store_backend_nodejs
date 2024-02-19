const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config() 

const User = require('../model/User')
const key=process.env.SECRET_KEY

const VerifyToken = (req,res,next)=>{
    
console.log("verify : : " + req.header('Authorization'))
   const authHeader=  req.header('Authorization');
    if(!authHeader)
    return res.status(401).json({error:'bsc : Access denied'})
    if(!authHeader.startsWith('Bearer '))
    return res.status(401).json({error:'token düzgün değil'})



try {
    const token = authHeader.split(' ')[1]
    const decoded=jwt.verify(token,key)
    if(decoded.exp<Date.now()/1000) return res.status(401).json({message:'Token has expired'})
    const {userId}=decoded
    const user=User.findById(userId)
    if(!user) return res.status(401).json({message:'user not avaliable'})
    req.userId=userId
console.log("user id : "+userId)
    next()
} catch (error) {
    res.status(401).json({error})
    console.log("verify error : "+ error)
}

      
}

module.exports={VerifyToken}