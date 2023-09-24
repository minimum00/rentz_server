const router = require('express').Router()
const {addItemToCart,getCartItem} = require('../controller/cartController.js')
const {postsignup,postlogin} = require('../controller/accountController.js')
const authMiddleware  = require('../middleware/authMiddeware.js')
const ownerSignUp = require('../controller/ownerSignUp')

router.post('/addItemToCart',authMiddleware,addItemToCart)
router.get('/getCartItem',authMiddleware,getCartItem)

router.post('/signup',postsignup)
router.post('/login',postlogin)

router.post('/ownerSignUp',ownerSignUp)

module.exports = router