const express = require('express')
const app = express()
const userRoutes = require('./routes/users.routes')
const postRoutes = require('./routes/posts.routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users',userRoutes)
app.use('/posts', postRoutes)


module.exports = app;