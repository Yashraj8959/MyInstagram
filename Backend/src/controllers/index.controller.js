
const Post = require('../models/post.model');

module.exports.feedController = async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 }); // Fetch all posts, sorted by newest first
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts" });
    }
};