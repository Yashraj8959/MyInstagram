const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

module.exports.createPostController = async (req,res) =>{
    const {media, caption} = req.body;

    
    if(!media){
        return res.status(400).json({message: "media is required"})
    }
    if(!caption){
        return res.status(400).json({message: "caption is required"})
    }
    const newPost = await PostModel.create({
        media,
        caption
    })
    console.log(req.user)
    await UserModel.findByIdAndUpdate(req.user._id, {
        $push: {
            posts: newPost._id
        }
    })
    res.status(201).json(newPost)

}