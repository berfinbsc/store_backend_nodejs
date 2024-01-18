
const User=require('../model/User')
const SECRET_KEY='3apples'
const Login= async (req,res)=>{
try {
    
    const {email,password}=req.body
    const user = await User.findOne({email})

    if(!user){
        return res.status(401).json({error:'user did not avaliable'})
    }
    
    const isEqual= await bcrypt.compare(password,user.password)
    
    if(!isEqual){
        return res.status(401).json({error:'wrong password'})
    }

    const token=jwt.sign({userId:user._id},SECRET_KEY,{expiresIn:'1h'})
    res.status(200).json({token})
    

} catch (error) {
    res.status(500).json({error:'Login failed'})
}}


const Register=async(req,res)=>{

 try{

       const {userName,email,password}=req.body
const hashedPassword=await bcrypt.hash(password,10)
const user = new User({userName:userName,email:email,password:hashedPassword})
await user.save()
res.status(201).json({message:'user registered successfully'})


                } 
                catch(err){
        res.status(500).json({error: 'Registration failed'})
                }   
             

  
}  


const LogOut=async(req,res)=>{
//kullanıcının auth ıslemlerı
}

module.exports={Login,LogOut,Register}