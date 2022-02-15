const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check_auth')
const bankCtrl = require('../dbos/bankController')
// get detail mpa in bank
router.get('/getDetailMpa/:mpaNUM', checkAuth, bankCtrl.getDetailMpa)
// get detail user in bank
router.get('/getDetailUser/:mpaNUM', checkAuth, bankCtrl.getDetailUser)
// get user in bank
router.get('/getUser/:company', checkAuth, bankCtrl.getUser)
// get mpa in bank
router.get('/getMpa', checkAuth, bankCtrl.getMpa)
// save option BANK in MPA
router.post('/updateBank/:mpaId', checkAuth, bankCtrl.updateBank)
// save option BANK in USER
router.post('/updateUserBank/:mpaId', checkAuth, bankCtrl.updateUserBank)
// cansel option BANK in MPA
router.post('/canselBank/:mpaId', checkAuth, bankCtrl.canselBank)
// cansel option BANK in USER
router.post('/canselBankUser/:userId', checkAuth, bankCtrl.canselBankUser)
router.post('/signup', bankCtrl.signup)
router.post('/login', bankCtrl.login)
module.exports = router