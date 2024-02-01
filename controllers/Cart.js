const Cart = require('../model/Cart')

const getCard = async(req,res)=>{
const userId = req.userId
const card = await Cart.findOne({userId:userId}.exec())
res.status(200).json(card)

}


const deleteCard = async(req,res)=>{
    const userId = req.userId
    const card = await Cart.findOneAndDelete({userId : userId})
    res.status(200).json(card)
}


const deleteItemFromCard =async(req,res)=>{
    const userId = req.userId
    const productId = req.productId
    const card = await Cart.findOneAndDelete(
        {userId:userId},
       { $pull : {prducts :{productId : productId}}},
        {new :true}
    )
    res.status(200).json(card)
}


const addItemToCard = async(req,res)=>{





    
    let newquantity = 1;
    const userId = req.userId
    const productId = req.productId
    Cart.findOne(
        {userId : userId},
        {products : {productId : productId}}
    ).then(item=>{
        if(item){
         newquantity = item.quantity + 1
        }
        

    })

    
}