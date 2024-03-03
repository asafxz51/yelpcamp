const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/CatchAsync')
const campgrounds = require('../controllers/camgrounds')
const { isLoggedIn, isAuthor, campValidate } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })


router.get('/', catchAsync(campgrounds.index))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), campValidate, catchAsync(campgrounds.createNewCamp))

router.get('/:id', catchAsync(campgrounds.renderCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), campValidate, catchAsync(campgrounds.editForm))

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))

module.exports = router