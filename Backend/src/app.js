const express = require('express')
const userRoutes = require('./routes/users.routes')
const postRoutes = require('./routes/posts.routes')
const indexRoutes = require('./routes/index.routes')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())  // added cookie parser middleware for storing JWT token in cookies.  //
app.use(cors())   // added cors middleware for enabling cross-origin resource sharing. //
app.use(morgan('dev'))
app.use(express.json())  // added json middleware for parsing incoming request bodies. //
app.use(express.urlencoded({extended: true}))  // added urlencoded middleware for parsing incoming request bodies. //

app.use('/', indexRoutes)
app.use('/v1/api/users',userRoutes)
app.use('/v1/api/posts', postRoutes)


module.exports = app;