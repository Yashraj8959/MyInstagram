const Post = require('../models/post.model');

module.exports.createPostController = async (req, res) => {
    console.log(req.body);
    try {
        // const { media, caption } = req.body;
        // const author = req.user._id;

        // const newPost = new Post({
        //     media,
        //     caption,
        //     author
        // });
        const newPost = await Post.create({
            media: {
                id: req.body.media.fileId,
                url: req.body.media.url,
                thumbnail: req.body.media.thumbnailUrl,
            },
            caption: req.body.caption,
            author: req.user._id,
        })
        // const savedPost = await newPost.save();
        res.status(201).json({ message: "Post created successfully", data: newPost });
    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
};