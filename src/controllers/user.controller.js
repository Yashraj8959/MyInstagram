const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.registerController = async (req,res)=>{
    try {
        
        const {name, email, password} = req.body;
        
        if(!name){
            return res.status(400).json({message: "user name is required"})
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
                {name}
            ]
        })
    
        if(isUserExist){
            return res.status(400).json({message: "User already exists"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newuser = await UserModel.create({
            name,
            email,
            password:hashedPassword
        })
    
        const token = jwt.sign({_id: newuser._id,email: newuser.email},config.JWT_SECRET_KEY)
        res.status(200).json({
            message: 'user registered successfully',
            token: token
        })
    } catch (error) {
        console.log("error during register",error)
        res.status(500).send('Internal server error')
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

        const user = await UserModel.findOne({email})
        const isMatch = await bcrypt.compare(password,user.password )

        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const token = jwt.sign({email:user.email,_id:user._id},config.JWT_SECRET_KEY)
        console.log('Token: ', token)
        res.status(200).json({message: 'logged in',token: token})
    }
    catch(error){
        console.error('Error during login', error)
        res.status.send('Internal Server Error')
    }
}