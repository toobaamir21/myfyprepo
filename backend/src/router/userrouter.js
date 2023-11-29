const express = require('express')
const router = express.Router()
const {emailConfirmation} = require('../controller/userController')


/*****************Route for email confirmation ************************/
router.route('/confirmemail').post(emailConfirmation)


module.exports = router