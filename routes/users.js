const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/CatchAsync')
const User = require('../models/user')
const { storeReturnTo } = require('../middleware')
const reviews = require('../controllers/users')

router.get('/register', reviews.renderRegister)

router.post('/register', catchAsync(reviews.createUser))

router.get('/login', reviews.renderLogin)

router.post('/login', storeReturnTo, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), reviews.loginUser)

router.get('/logout', reviews.logoutUser)

module.exports = router