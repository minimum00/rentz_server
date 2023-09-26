const router = require('express').Router()
const {addItemToCart,getCartItem} = require('../controller/cartController.js')
const {postsignup,postlogin} = require('../controller/accountController.js')
const authMiddleware  = require('../middleware/authMiddeware.js')
const ownerSignUp = require('../controller/ownerSignUp')
const  UserLogOut  = require('../controller/logOut')
const DeleteCartItem = require('../controller/deleteCartItem.js')
const ResetPassword = require('../controller/resetPassword.js')
const GoogleSignUp = require('../controller/googleProvider.js')



router.post('/addItemToCart',authMiddleware,addItemToCart)
router.get('/getCartItem',authMiddleware,getCartItem)

router.post('/signup',postsignup)
router.post('/login',postlogin)

router.post('/ownerSignUp',ownerSignUp)
router.post('/logOut', UserLogOut);

router.post('/deleteCartItem', DeleteCartItem);
router.post('/resetPassword', ResetPassword)
router.post('/googleSignUp', GoogleSignUp)



module.exports = router