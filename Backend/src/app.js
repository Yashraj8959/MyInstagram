const express = require('express')
const userRoutes = require('./routes/users.routes')
const postRoutes = require('./routes/posts.routes')
const indexRoutes = require('./routes/index.routes')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', indexRoutes)
app.use('/users',userRoutes)
app.use('/posts', postRoutes)


module.exports = app;