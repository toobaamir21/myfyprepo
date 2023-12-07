const express = require('express')
const router = express.Router()
const {emailConfirmation,verifyEmailAndSavesDataToDb,authUser,forgetPassword,handleReset,showReset} = require('../controller/userController')


/*****************Route for email confirmation ************************/
router.route('/confirmemail').post(emailConfirmation)

/*****************Route for email verification and saves data to db ************************/
router.route('/verifyemail/:token').get(verifyEmailAndSavesDataToDb)

/*****************Route for login ************************/
router.route('/authuser').post(authUser)

/*****************Route for forgot password ************************/
router.route('/forgotpass').post(forgetPassword)

/*****************Route for reset password ************************/
router.route('/resetpage/:token').get(showReset)

/*****************Route for reset password ************************/
router.route('/resetpassword').post(handleReset)

module.exports = router