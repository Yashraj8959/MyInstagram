const UserModel = require('../models/user.model')
const Post = require('../models/post.model')

module.exports.registerController = async (req,res)=>{
    try {
        
        const {username, email, password} = req.body;
        
        if(!username){
            return res.status(400).json({message: "username is required"})
        }
        if(!email){
            return res.status(400).json({message: "email is required"})
        }
        if(!password){
            return res.status(400).json({message: "password is required"})
        }
    
        const isUserExist = await UserModel.findOne({
            $or:[
                {email},
                {username}
            ]
        })
    
        if(isUserExist){
            return res.status(400).json({message: "User already exists"})
        }
    
        const hashedPassword = await UserModel.hashPassword(password)
    
        const newuser = await UserModel.create({
            username,
            email,
            password:hashedPassword
        })
    
        const token = newuser.generateToken()
        res.status(201).json({
            message: 'user registered successfully',
            token: token
        })
    } catch (error) {
        console.log("error during register",error)
        res.status(500).json({ message: "Internal server error" })
    }
    



}



module.exports.loginUserController = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email){
            return res.status(400).json({message: "email is required"})
        }

        if(!password){
            return res.status(400).json({message: "password is required"})
        }

        const isUserExist = await UserModel.findOne({email})

        if(!isUserExist){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isMatch = await UserModel.comparePassword(password,isUserExist.password )

        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = isUserExist.generateToken()
        console.log('Token: ', token)
        res.status(200).json({message: 'logged in',token: token})
    }
    catch(error){
        console.error('Error during login', error)
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports.profileUserController = async (req, res) => {
    console.log(req.user)
    const user = await UserModel.findById(req.user._id).populate("posts")
    res.send(user)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}