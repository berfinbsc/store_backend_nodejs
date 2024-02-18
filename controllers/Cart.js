const Cart = require('../model/Cart')
const Product = require('../model/Product')



const getCart = async(req,res)=>{

try {
    const userId = req.userId;
    const cart = await Cart.findOne({userId : userId}).exec()
    console.log("USER ID : " + userId)
    console.log("CART : " + cart)
    res.status(200).json({cart})

} catch (error) {
    console.log(error)
    res.status(500).json({msg : "bsc : user cant found "})
}


}




const reduceQuantity = async(req,res)=>{
    const {productId} =req.body;
    const userId =req.userId;
    const query = {userId : userId}
    console.log("product id : : " + productId);
    console.log("user id : : " + userId);

try {
    const cart =await Cart.findOne(query)
    const indexFound = cart.products.findIndex(p => p.productId==productId)

if(indexFound !=-1) {
    console.log("found")
    if(cart.products[indexFound].quantity >1){
        cart.products[indexFound].quantity -=1
        await cart.save();
        res.status(200).json(cart)
    }
    else if(cart.products[indexFound].quantity ==1)
        cart.products.splice(indexFound,1)
        await cart.save();
        res.status(200).json(cart)
    
   
}
else if(indexFound ==-1){
    console.log("not found")
            res.status(400).json({message : "product not found in the cart"})
}
} catch (error) {
    console.log(error)
}}





const increaseQuantity = async(req,res)=>{

    const {productId} =req.body;
    const userId =req.userId;
    const query = {userId : userId}
    console.log("product id : : " + productId);
    console.log("user id : : " + userId);

    

    try {
        const cart =await Cart.findOne(query)
        const indexFound = cart.products.findIndex(p => p.productId==productId)
    
    if(indexFound !=-1) {
        console.log("found")
        if(cart.products[indexFound].quantity <5){
            cart.products[indexFound].quantity +=1
            await cart.save();
            res.status(200).json(cart)
        }
        else {
           console.log("max quantity is 5");
            res.status(200).json({msg : "max quantity is 5"});
        } }

    else if(indexFound ==-1){
        console.log("not found")
                res.status(400).json({message : "product not found in the cart"})
    }
    } catch (error) {
        console.log(error)
    }}










const deleteItemFromCart =async(req,res)=>{

    const {productId} =req.body;
    const userId =req.userId;
    const query = {userId : userId}
    console.log("product id : : " + productId);
    console.log("user id : : " + userId);
  
  
  const cart =await Cart.findOne(query)
  const indexFound = cart.products.findIndex(p => p.productId==productId)
  if(indexFound !=-1) {
        cart.products.splice(indexFound,1)
        await cart.save()   
        res.status(200).json(cart)
        console.log("indexFound : " + indexFound)  
}
else{  
console.log("not found")
            res.status(400).json({message : "product not found in the cart"})
}}






const addItemToCart = async(req,res)=>{

    const {productId} =req.body;
    const userId =req.userId;
    const query = {userId : userId}
    console.log("product id : : " + productId);
    console.log("user id : : " + userId);
    const quantity = req.body.quantity || 1


try {
    const cart = await Cart.findOne(query)
    const product = await Product.findById(productId)
    const {price} = product

    if(cart){
        const indexFound =cart.products.findIndex(p => p.productId==productId)
        
            if(indexFound !=-1) {
                console.log("have cart have product b :  ")
                if(cart.products[indexFound].quantity + quantity <5){
                    cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity
                cart.products[indexFound].total = cart.products[indexFound].price * cart.products[indexFound].quantity
                cart.subTotal = cart.products.map(p =>p.total).reduce((acc,curr)=>acc + curr)
                cart.save();
                res.status(200).json(cart)
                }
                else{
                    console.log("max quantity is 5");
                    res.status(200).json({msg : "max quantity is 5"});
                }
                
            }
            else if (indexFound==-1) {
                console.log("have cart no product :  ")
                cart.products.push({
                    productId : productId,
                    quantity : quantity,
                    productName : product.name,
                    image : product.image,
                    price : price,
                    total : price * quantity
                })
                cart.subTotal = cart.products.map(p =>p.total).reduce((acc,curr)=>acc + curr)
                cart.save();
                res.status(200).json(cart)
            }

            else{
                return res.status(400).json({
                    error0 : 400,
                    messgae : "invalid request" 
                })}}
    else {
        console.log("no cart yet")
        let cartData = ({
            userId : userId,
            products:[{
                productId : productId,
                quantity : quantity,
                productName : product.name,
                image : product.image,
                price : price,
                total :price * quantity
            }],
            subTotal :price * quantity
        })

        cart = new Cart(cartData)
        let data = await cart.save()
        res.json(data)
        console.log("dataaa :  " + data)
    }
}

catch(err){
console.log(err)
}


}

module.exports = {addItemToCart,reduceQuantity,deleteItemFromCart,getCart,increaseQuantity}