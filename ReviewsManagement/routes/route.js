const router = require('express').Router()
const {addReview,getReview} = require('../controller/appController.js')



router.post('/reviews',addReview)
router.get('/reviews',getReview)

module.exports = router