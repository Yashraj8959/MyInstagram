const express = require('express')
const { registerController, loginUserController } = require('../controllers/user.controller')
const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginUserController)

module.exports = router