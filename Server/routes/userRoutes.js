
const {Login,Signup, getUser} = require('../controllers/usercontroller')
const { checkUser } = require('../middlewares/auth')
const router = require('express').Router()


router.post('/login',Login)
router.post('/signup',Signup)
router.get('/getUser',checkUser,getUser);

module.exports = router