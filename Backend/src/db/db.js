const mongoose = require('mongoose')
const config = require('../config/config')

const connect = () => {
    try {
        mongoose.connect(config.MONGO_URL)
        .then(()=>{
            console.log('MongoDB connected')
        })
        .catch(()=>{
            console.log('DB not connected')
        })
    } catch (error) {
        console.log('Error', error)
    }
}

module.exports = connect