const express = require('express')
const router = express.Router()
const {emailConfirmation,verifyEmailAndSavesDataToDb,authUser} = require('../controller/userController')


/*****************Route for email confirmation ************************/
router.route('/confirmemail').post(emailConfirmation)

/*****************Route for email verification and saves data to db ************************/
router.route('/verifyemail/:token').get(verifyEmailAndSavesDataToDb)

/*****************Route for login ************************/
router.route('/authuser').post(authUser)


module.exports = router