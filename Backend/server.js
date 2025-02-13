require('dotenv').config()
const app = require('./src/app')
const config = require('./src/config/config')
const connectDB = require('./src/db/db')

app.listen(config.PORT,()=>{
    console.log(`server listening on Port ${config.PORT}`)
})

connectDB();   