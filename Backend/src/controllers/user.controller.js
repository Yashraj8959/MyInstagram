const UserModel = require('../models/user.model')

module.exports.registerController = async (req,res)=>{
    const {username, email, password} = req.body;
    try {
       
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
    
        const token = newuser.generateToken();
        delete newuser._doc.password;
        res.status(201).json({
            message: 'user registered successfully',
            token: token,
            user: newuser
        })
    } catch (error) {
        // console.log("error during register",error)
        res.status(500).json({ message: error.message })
    }
    



}



module.exports.loginUserController = async (req,res) => {
    const {email,password} = req.body;
    try{
        
        const isUserExist = await UserModel
        .findOne({email})
        .select('+password')

        if(!isUserExist){
            return res.status(404).json({message: "User not found"})
        }

        const isMatch = await UserModel.comparePassword(password,isUserExist.password )

        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"})
        }

        const token = isUserExist.generateToken()
        delete isUserExist._doc.password;
        // console.log('Token: ', token)
        res.status(200).json({message: 'logged in',token: token})
    }
    catch(error){
        // console.error('Error during login', error)
        res.status(500).json({message: error.message  })
    }
}

module.exports.profileUserController = async (req, res) => {
    console.log(req.user)
    const user = await UserModel.findById(req.user._id).populate("posts")
    res.send(user)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
}