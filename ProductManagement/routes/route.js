const router = require('express').Router()
const {catalogue,addRoom,productDetail,uploadFormData} = require('../controller/appController.js')
const multer = require('multer')
const upload = multer()



router.get('/catalogue',catalogue)

router.post('/addRoom',addRoom)

router.get('/productDetail',productDetail)

const cpUpload = upload.fields([{ name: 'propertyImage', maxCount: 4 }, { name: 'roomImage', maxCount: 8 }])
router.post('/uploadFormData',cpUpload,uploadFormData)



module.exports = router