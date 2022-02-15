const express = require('express')
const router = express.Router()
const mpaCtrl = require('../dbos/mpaController')
const checkAuth = require('../middleware/check_auth')
// get authority mpa 
router.get('/getAuthorityMpa/:userId', mpaCtrl.getAuthorityMpa)
// get mpa
router.get('/mpaInfo',checkAuth, mpaCtrl.get)
// signup
router.post('/signup', mpaCtrl.signup)
// login
router.post('/login', mpaCtrl.login)
module.exports = router