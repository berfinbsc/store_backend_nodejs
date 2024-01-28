const express = require('express')
const router = express.Router()

const {getAllProducts,} = require('../controllers/Products')
const {Login, Register} = require('../controllers/Users')
const { VerifyToken } = require('../middleware/VerifyToken')

router.route('/products').get(getAllProducts)
router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/about').get(VerifyToken,(req,res)=>{
    return res.status(200).json({msg:'protected route accessed'})

})

//router.route('/').get(getAllTasks).post(createTask)
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router 