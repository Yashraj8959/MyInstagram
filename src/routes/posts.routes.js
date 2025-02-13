const express = require('express');
const { authUser } = require('../middlewares/user.middleware');
const { createPostController } = require('../controllers/posts.controller');
const router = express.Router();


router.post('/create', authUser, createPostController)


module.exports = router;