const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const userCtrl = require('../dbos/userController')
// get users
router.get('/', checkAuth, userCtrl.getAll)
// get users Info and authority
router.get('/getAuthority', checkAuth, userCtrl.getAuthority)
// get user
router.get('/:userId', checkAuth, userCtrl.get)
// signup
router.post('/signup', userCtrl.signup)
// login
router.post('/login', userCtrl.login)
router.post('/update/:userId', checkAuth, userCtrl.update)
module.exports = router