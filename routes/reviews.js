const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/CatchAsync')
const { isLoggedIn, reviewValidate, isReviewAuthor } = require('../middleware')
const reviews = require('../controllers/reviews')

router.post('/', isLoggedIn, reviewValidate, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router