const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const User = require('../model/User')
dotenv.config() 
const key=process.env.SECRET_KEY

const verifyToken = (req,res,next)=>{

   const authHeader=  req.header('Authorization');
    if(!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({error:'Access denied'})
    const token = authHeader.split(' ')[1]

  
        jwt.verify(token,key,(err,decoded)=>{
            if(err) return res.status(403).json({message:'Invalid Token'})
            if(decoded.exp<Date.now()/1000) return res.status(401).json({message:'Token has expired'})
            const {userId}=decoded
            const user=User.findOne(userId)
            if(!user) return res.status(401).json({message:'user not avaliable'})
            req.userId=userId
            next()
        }) 

        


}

module.exports={verifyToken}