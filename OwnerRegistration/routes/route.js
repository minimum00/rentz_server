const router = require('express').Router()
const ownerSignUp = require('../controller/signUpcontroller')

router.post('/ownerSignUp',ownerSignUp);

module.exports = router