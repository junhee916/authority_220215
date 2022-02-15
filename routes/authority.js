const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const authorityCtrl = require('../dbos/authorityController')
// get confirm authority
router.get('/check', checkAuth, authorityCtrl.check)
// get authority
router.get('/:userID', checkAuth, authorityCtrl.get)
router.post('/save/:userID', checkAuth, authorityCtrl.save)
router.post('/update/:userID', checkAuth, authorityCtrl.update)
module.exports = router