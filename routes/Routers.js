const express = require('express')
const router = express.Router()

const {getAllProducts, getOneProduct,} = require('../controllers/Products')
const {Login, Register, getAllUser, getUser} = require('../controllers/Users')
const { VerifyToken } = require('../middleware/VerifyToken')
const { addItemToCart, deleteItemFromCart, reduceQuantity, getCart, increaseQuantity } = require('../controllers/Cart')
const { like } = require('../controllers/Likes')

router.route('/products').get(getAllProducts)
router.route('/product/:productId').get(getOneProduct)
router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/about').get(VerifyToken,(req,res)=>{
    return res.status(200).json({msg:'protected route accessed'})

})
router.route('/user').get(VerifyToken,getUser)
router.route('/getUser').get(VerifyToken,getCart)

router.route('/getCart').get(VerifyToken,getCart)
router.route('/addToCart').post(VerifyToken,addItemToCart)
router.route('/deleteFromcart').post(VerifyToken,deleteItemFromCart)
router.route('/reduceQuantity').post(VerifyToken,reduceQuantity)
router.route('/increaseQuantity').post(VerifyToken,increaseQuantity)

router.route('/like').post(like)
//router.route('/').get(getAllTasks).post(createTask)
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router 