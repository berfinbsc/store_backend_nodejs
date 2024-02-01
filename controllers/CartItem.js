const CartItem = require('../model/CartItem')


const getCardItem =async(req,res)=>{
try {
    const id =req.cardItem
    const cardItem = await CartItem.findOne(id)
    res.status(200).json(cardItem);
}
 catch (error) {
    console.log(error)
}}




const updateCardItem = async(req,res)=>{
try {
    const id =req.productId
    const quantity = req.quantity
    const query = {productId : id}
    const cardItem =await CartItem.findByIdAndUpdate(query,{quantity : quantity },true)
    res.status(200).json(cardItem)

} catch (error) {
    console.log(error)
}}




const deleteCarItem =async(req,res)=>{
try {
    const id =req.productId
    const query = {productId : id}
    const cardItem =await CartItem.findOneAndDelete(query,true)
    res.status(200).json(cardItem)

} catch (error) {
    console.log(error)
}}