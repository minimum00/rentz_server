const router = require('express').Router()
const {catalogue,addRoom,productDetail} = require('../controller/appController.js')



router.get('/catalogue',catalogue)

router.post('/addRoom',addRoom)

router.get('/productDetail',productDetail)



module.exports = router