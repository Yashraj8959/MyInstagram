const Post = require('../models/post.model');

module.exports.createPostController = async (req, res) => {
    try {
        const { media, caption } = req.body;
        const author = req.user._id;

        const newPost = new Post({
            media,
            caption,
            author
        });

        const savedPost = await newPost.save();
        res.status(201).json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
};