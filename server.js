require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const indexRouter = require('./routes/index')
const mpaRouter = require('./routes/mpa')
const useRouter = require('./routes/user')
const authorityRouter = require('./routes/authority')
const setTimeLoginRouter = require('./routes/setTimeLogin')
const bankRouter = require('./routes/bank')
const connectDB = require('./config/database')
// require mongodb
connectDB()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(morgan('dev'))
// require html
app.use('/controllers', express.static(__dirname + '/controllers'))
app.set('views', __dirname+'/view');
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
// require routes
app.use('/', indexRouter)
// require mpa
app.use('/mpa', mpaRouter)
// require user
app.use('/user', useRouter)
// require authority
app.use('/authority', authorityRouter)
// require setTimeLogin
app.use('/setTimeLogin', setTimeLoginRouter)
// require bank
app.use('/bank', bankRouter)
const PORT = process.env.PORT || 7000
app.listen(PORT, console.log("connected server..."))