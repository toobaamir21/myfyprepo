const express = require('express')
const router = express.Router()
const {emailConfirmation,verifyEmailAndSavesDataToDb,authUser,forgetPassword,handleReset} = require('../controller/userController')


/*****************Route for email confirmation ************************/
router.route('/confirmemail').post(emailConfirmation)

/*****************Route for email verification and saves data to db ************************/
router.route('/verifyemail/:token').get(verifyEmailAndSavesDataToDb)//it will be change to post

/*****************Route for login ************************/
router.route('/authuser').post(authUser)

/*****************Route for forgot password ************************/
router.route('/forgotpass').post(forgetPassword)

/*****************Route for reset password ************************/
router.route('/resetpassword/:token').get(handleReset)//it will be change to post


module.exports = router