const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/user.middleware');
const { createPostController } = require('../controllers/posts.controller');
const multer = require('multer');
const imagekit = require("../services/imagekit.service");
const upload = multer({ storage: multer.memoryStorage() });
const { Readable } = require('stream');
const mongoose = require('mongoose');

router.post('/create',
    authUser,
    upload.single('media'),
    async (req, res, next) => {
        try {
            const file = await imagekit.upload({
                file: Readable.from(req.file.buffer),
                fileName: new mongoose.Types.ObjectId().toString(),
                isPublished: true,
                isPrivateFile: false,
            });
            req.body.media = file.url; // Use file.url to store the image URL
            next();
        } catch (error) {
            console.error("ImageKit upload error:", error);
            res.status(500).json({ message: "Image upload failed" });
        }
    },
    createPostController
);

module.exports = router;