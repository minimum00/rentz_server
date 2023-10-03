const router = require('express').Router()
const {addItemToCart,getCartItem, DeleteCartItem} = require('../controller/cartController.js')
const {postsignup,postlogin, ownerSignUp, UserLogOut, ResetPassword} = require('../controller/accountController.js')
const authMiddleware  = require('../middleware/authMiddeware.js')
const gatherData = require('../controller/formDataCollection.js')
const multer = require('multer')
const upload = multer();
const cpUpload = upload.fields([{ name: 'roomImage', maxCount: 10 }, { name: 'propertyImage', maxCount: 8 }])
const ReviewsTesting = require('../controller/reviewsTesting')


router.post('/addItemToCart',authMiddleware,addItemToCart)
router.get('/getCartItem',authMiddleware,getCartItem)

router.post('/signup',postsignup)
router.post('/login',postlogin)

router.post('/ownerSignUp',ownerSignUp)
router.post('/logOut', UserLogOut)
router.get('/deleteCartItem', authMiddleware, DeleteCartItem);
router.post('/resetPassword', ResetPassword)
router.post('/formDataSubmit', cpUpload, gatherData)
router.post('reviewsTesting', ReviewsTesting);






module.exports = router