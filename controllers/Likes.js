const { Mongoose } = require("mongoose");

const like = async (req, res) => {
    
    const {productId,userId} = req.body;
    const product= await Product.findById(productId);
    const user = await User.findById(userId);

//user and product avaliable ?
    if(!user || !product){
    return res.status(400).json({message : "user or product not found"})
    }

//user already liked this product?
    if(user.likes.includes(productId)){
        user.likes.splice(user.likes.indexOf(productId),1);
        await user.save();
        product.likes -=1;
        await product.save();
        return res.status(200).json(product.likes.length,user.likes)
    }
//user not liked this product?
    user.likes.push(productId);
    await user.save();
    product.likes +=1;
    await product.save();
    return res.status(200).json(product.likes.length,user.likes)

}

module.exports = {like}