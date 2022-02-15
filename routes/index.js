const express = require('express')
const router = express.Router()
router
.get('/mpaSignup', (req, res) => {
    res.render('./mpaSignup.html')
})
.get('/mpaLogin', (req, res) => {
    res.render('./mpaLogin.html')
})
router
.get('/userSignup', (req, res) => {
    res.render('./userSignup.html')
})
.get('/userLogin', (req, res) => {
    res.render('./userLogin.html')
})
router
.get('/viewAuthority', (req, res) => {
    res.render('./viewAuthority.html')
})
.get('/setting', (req, res) => {
    res.render('./setting.html')
})
.get('/setUserAuthority', (req, res) => {
    res.render('./setUserAuthority.html')
})
router
.get('/confirmAuth', (req, res) => {
    res.render('./confirmAuthority.html')
})
router
.get('/checkBank', (req, res) => {
    res.render('./checkBank.html')
})
.get('/bankSignup', (req, res) => {
    res.render('./bankSignup.html')
})
.get('/bankLogin', (req, res) => {
    res.render('./bankLogin.html')
})
.get('/bankShow', (req, res) => {
    res.render('./bankShow.html')
})
.get('/bankUserShow', (req, res) => {
    res.render('./bankUserShow.html')
})
module.exports = router