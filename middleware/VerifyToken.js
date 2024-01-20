const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config() 

const User = require('../model/User')
const key=process.env.SECRET_KEY

const VerifyToken = (req,res,next)=>{

   const authHeader=  req.header('Authorization');
   console.log(authHeader)
    if(!authHeader)
    return res.status(401).json({error:'Access denied'})
    if(!authHeader.startsWith('Bearer '))
    return res.status(401).json({error:'token dügün değil'})

    console.log("fff....................."+authHeader)
    const token = authHeader.split(' ')[1]
console.log("polopolo................."+token)
console.log("jojo...................."+key)

try {
    
    const decoded=jwt.verify(token,key)
    if(decoded.exp<Date.now()/1000) return res.status(401).json({message:'Token has expired'})
    const {userId}=decoded
    const user=User.findById(userId)
    if(!user) return res.status(401).json({message:'user not avaliable'})
    req.userId=userId
    next()
} catch (error) {
    res.status(401).json({error})
    console.log("verify errorooooooo: "+ error)
}

      
}

module.exports={VerifyToken}