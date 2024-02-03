const express = require('express')
const router = express.Router()

const {getAllProducts,} = require('../controllers/Products')
const {Login, Register, getAllUser} = require('../controllers/Users')
const { VerifyToken } = require('../middleware/VerifyToken')
const { getCart, addItemToCart } = require('../controllers/Cart')

router.route('/products').get(getAllProducts)
router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/about').get(VerifyToken,(req,res)=>{
    return res.status(200).json({msg:'protected route accessed'})

})
router.route('/getusers').get(getAllUser)
router.route('/getcart').get(getCart)
router.route('/addtocart').post(addItemToCart)
//router.route('/').get(getAllTasks).post(createTask)
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router 