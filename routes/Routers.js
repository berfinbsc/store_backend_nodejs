const express = require('express')
const router = express.Router()

const {getAllProducts, getOneProduct,} = require('../controllers/Products')
const {Login, Register, getAllUser} = require('../controllers/Users')
const { VerifyToken } = require('../middleware/VerifyToken')
const { addItemToCart, deleteItemFromCart, reduceQuantity, getCart } = require('../controllers/Cart')
const { like } = require('../controllers/Likes')

router.route('/products').get(getAllProducts)
router.route('/product/:productId').get(getOneProduct)
router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/about').get(VerifyToken,(req,res)=>{
    return res.status(200).json({msg:'protected route accessed'})

})
router.route('/getusers').get(getAllUser)
router.route('/addtocart').post(VerifyToken,addItemToCart)
router.route('/getcart').get(VerifyToken,getCart)
router.route('/deletefromcart').post(deleteItemFromCart)
router.route('/reducequantity').post(reduceQuantity)
router.route('/like').post(like)
//router.route('/').get(getAllTasks).post(createTask)
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router 