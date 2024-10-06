
const {Login,Signup} = require('../controllers/usercontroller')
const router = require('express').Router()


router.post('/login',Login)
router.post('/signup',Signup)

module.exports = router