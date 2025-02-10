const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports.registerController = async (req,res)=>{
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

    const isUserExist = UserModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserExist){
        return res.status(400).json({message: "User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({email,username},config.JWT_SECRET_KEY)



}



module.exports.loginUserController = async (req,res) => {
    const {email,password} = req.body;
    if(!email){
        return res.status(400).json({message: "email is required"})
    }

    if(!password){
        return res.status(400).json({message: "password is required"})
    }

    const isUserExist = await UserModel.findOne({email})

    if(!isUserExist){
        
    }
}