const Cart = require('../model/Cart')
const Product = require('../model/Product')

const getCart = async(req,res)=>{


}


const deleteCart = async(req,res)=>{


}


const deleteItemFromCart =async(req,res)=>{
  
}


const addItemToCart = async(req,res)=>{

let {userId,productId} =req.body;
let quantity = req.body.quantity

console.log("u : " + userId + " p : " + productId + " q : " + quantity)

try {
    let cart = await Cart.findOne({userId : userId}).exec()
    let product = await Product.findById(productId)
    console.log("product : " + product + "cart : " + cart)
    let {price} = product
    if(cart){
        console.log("have a cart")
        let indexFound =cart.products.findIndex(p => p.productId==productId)
            if(indexFound !== -1){
                console.log("have cart have product :  ")

                cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity
                cart.products[indexFound].total = cart.products[indexFound].price * cart.products[indexFound].quantity
                cart.subTotal = cart.products.map(p =>p.total).reduce((acc,curr)=>acc + curr)

            }
            else if (indexFound===-1) {
                console.log("have cart no product :  ")
                cart.products.push({
                    productId : productId,
                    quantity : quantity,
                    price : price,
                    total : price * quantity
                })
                cart.subTotal = cart.products.map(p =>p.total).reduce((acc,curr)=>acc + curr)

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

module.exports = {getCart,addItemToCart,deleteCart,deleteItemFromCart}