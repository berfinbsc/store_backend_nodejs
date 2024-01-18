const express = require('express')
const router = express.Router()

const {getAllProducts,getAllProductsStatic} = require('../controllers/Products')
const {Login, Register} = require('../controllers/Users')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)
router.route('/login').post(Login)
router.route('/register').post(Register)

//router.route('/').get(getAllTasks).post(createTask)
//router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router 