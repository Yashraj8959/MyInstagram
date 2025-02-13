const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profileIamge: {
        type: String,
        default: "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, //ek ek data ka type object id rahe ga jo ki ek array me staore ho ga 
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});





userSchema.methods.generateToken = function() {
    return jwt.sign({ 
        id: this._id,
        username: this.username,
        email: this.email, 
    }, config.JWT_SECRET_KEY);
}

userSchema.statics.verifyToken = function(token) {
    return jwt.verify(token, config.JWT_SECRET_KEY);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

userSchema.statics.comparePassword = async function(password, hash){
    return await bcrypt.compare(password, hash);
}


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;