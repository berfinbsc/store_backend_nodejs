const Product = require("../model/Product");
const User = require("../model/User");

const like = async (req, res) => {
    
    try {
        
        const {productId,userId} = req.body;
        const product= await Product.findById(productId);
        const user = await User.findById(userId);
    
        console.log(product,user)
    
    //user and product avaliable ?
        if(!user || !product){
        return res.status(400).json({message : "user or product not found"})
        }
    
    //user already liked this product?
        const finIndex = user.liked.findIndex(p=>p._id==productId)
        if(finIndex!== -1){
            console.log("user already liked this product")
            user.liked.pull(productId);
            await user.save();
            product.likesCount -=1;
            await product.save();
            return res.status(200).json({productLikes : product.likesCount,userLikes : user.liked.length})
        }
    //user not liked this product?
       else{
        console.log("user not liked this product")
        user.liked.push(productId);
        await user.save();
        product.likesCount +=1;
        await product.save();
        return res.status(200).json({productLikes : product.likesCount,userLikes : user.liked.length})
    
       }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {like}