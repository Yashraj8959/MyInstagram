const express = require('express')
const app = express()
const userRoutes = require('./routes/users.routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users',userRoutes)


module.exports = app;