const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const setTimeLoginCtrl = require('../dbos/setTimeLoginController')
// check setTimeLogin
router.get('/checkTime/:userID', setTimeLoginCtrl.checkTime)
// get confirmAuthority
router.get('/confirmAuthority', checkAuth, setTimeLoginCtrl.confirmAuthority)
// get setTimeLogin
router.get('/:userID', checkAuth, setTimeLoginCtrl.get)
router.post('/save/:userID', checkAuth, setTimeLoginCtrl.save)
router.post('/update/:userID', checkAuth, setTimeLoginCtrl.update)
module.exports = router 