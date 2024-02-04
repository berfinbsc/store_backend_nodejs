const Cart = require('../model/Cart')
const Product = require('../model/Product')



const reduceQuantity = async(req,res)=>{
const {userId,productId} =req.body;
const query = {userId : userId}
0
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
}




}



const deleteItemFromCart =async(req,res)=>{
  const {userId,productId} =req.body;
  const query = {userId : userId} 
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
}
}






const addItemToCart = async(req,res)=>{

const {userId,productId} =req.body;
const quantity = req.body.quantity || 1


console.log("u : " + userId + " p : " + productId + " q : " + quantity)

try {
    const cart = await Cart.findOne({userId : userId}).exec()
    const product = await Product.findById(productId)
    console.log("product : " + product + "cart : " + cart)
    const {price} = product
    if(cart){
        console.log("have a cart")
        const indexFound =cart.products.findIndex(p => p.productId==productId)
        console.log("productId :  " + productId)
        console.log("cart items : " + cart.products + "length : " + cart.products.length)
        console.log("indexFound : " + indexFound)   
            if(indexFound !=-1) {
                console.log("have cart have product :  ")

                cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity
                cart.products[indexFound].total = cart.products[indexFound].price * cart.products[indexFound].quantity
                cart.subTotal = cart.products.map(p =>p.total).reduce((acc,curr)=>acc + curr)
                cart.save();
                res.status(200).json(cart)
            }
            else if (indexFound==-1) {
                console.log("have cart no product :  ")
                cart.products.push({
                    productId : productId,
                    quantity : quantity,
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
                })
            }
    }
    else {
        console.log("no cart yet")
        let cartData = ({
            userId : userId,
            products:[{
                productId : productId,
                quantity : quantity,
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

module.exports = {addItemToCart,reduceQuantity,deleteItemFromCart}