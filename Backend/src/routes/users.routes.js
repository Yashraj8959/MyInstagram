const express = require('express')
const { registerController, loginUserController, profileUserController } = require('../controllers/user.controller')
const { authUser, loginValidation, registerValidation } = require('../middlewares/user.middleware')
const router = express.Router()

router.post('/register',  registerValidation,  registerController)
router.post('/login', loginValidation,  loginUserController)
router.get('/profile', authUser ,profileUserController)

module.exports = router