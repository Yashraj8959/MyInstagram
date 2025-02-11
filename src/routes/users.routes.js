const express = require('express')
const { registerController, loginUserController, profileUserController } = require('../controllers/user.controller')
const { authUser } = require('../middlewares/user.middleware')
const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginUserController)
router.get('/profile', authUser ,profileUserController)

module.exports = router