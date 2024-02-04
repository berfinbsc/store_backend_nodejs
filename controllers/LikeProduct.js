const { model } = require('mongoose');
const LikeProduct = require('../model/LikeProduct')
const Product = require('../model/Product')
const User = require('../model/User')

const addLike = async(req,res)=>{
    const {userId,productId}=req.body;
    console.log(userId,productId)
    const queryUser = {_id : userId}
    const queryProduct = {_id : productId}

    const user  = await User.findOne(queryUser)
    const product = await Product.findOne(queryProduct)
    if(!user ||!product){
        console.log(user,product)
        console.log("user or product not found")
        res.status(400).json({message : "user or product not found"})
    }

    else{
        user.liked.push(productId)
        await user.save()
        product.likes.push(userId)
        await product.save()
        const like = new LikeProduct({
            userId : userId,
            productId : productId,
        })
       const likesave= await like.save()
        res.status(200).json(likesave)
    }
}

const removeLike = async(req,res)=>{
    const {userId,productId}=req.body;
    const queryUser = {userId : userId}
    const queryProduct = {productId : productId}
    const user  = await User.findOne(queryUser) 
    const product = await Product.findOne(queryProduct)

    if(!user ||!product){
        console.log("user or product not found")
        res.status(400).json({message : "user or product not found"})
    }
    else{
        const findIndex = user.liked.findIndex(productId=>productId==productId)
        const findIndex2 = product.likes.findIndex(userId=>userId==userId)
        if(findIndex!=-1 || findIndex2!=-1){
            user.liked.splice(findIndex,1)
            await user.save()
            product.likes.splice(findIndex2,1)
            await product.save()
            await LikeProduct.findOneAndDelete({userId : userId, productId : productId})
            res.status(200).json({message : "like removed "})

         }
        else  if (findIndex==-1){
        console.log("not found")
        res.status(400).json({message : "product not found in the cart"})
        }   
        
    }


}

module.exports = {addLike,removeLike}