const router = require('express').Router()
const {addItemToCart,getCartItem,DeleteCartItem} = require('../controller/cartController.js')
const {postsignup,postlogin,UserLogOut, getUserDetail} = require('../controller/accountController.js')
const authMiddleware  = require('../middleware/authMiddeware.js')


router.post('/addItemToCart',authMiddleware,addItemToCart)
router.get('/getCartItem',authMiddleware,getCartItem)
router.get('/deleteCartItem',authMiddleware,DeleteCartItem);

router.get('/userDetails',getUserDetail)



router.post('/signup',postsignup)
router.post('/login',postlogin)
router.get('/logout',UserLogOut)

module.exports = router