require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
const generateToken = require('./generateToken');
const client = require('../client');

// SendinBlue setup
const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.sendInBlueApiKey; //yaha wo key use krni h jo send ki thi

// function for create contact in brevo
const apiInstance = new SibApiV3Sdk.ContactsApi();

const addContactToBrevo = async (userData) => {
    let createContact = new SibApiV3Sdk.CreateContact();
    const email = userData.email
    createContact = { 'email' : email };
    
    await apiInstance.createContact(createContact).then(function(data) {
      console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
      console.error(error);
    });
};

const sendVerificationEmail = async (UserData,link,templateId) => {
  const email = UserData.email;
  const sendinblueData = new SibApiV3Sdk.SendSmtpEmail();
  sendinblueData.to = [{ email: email }];
  sendinblueData.templateId = templateId;
  sendinblueData.params = {
    verification_link: link
  };

  try {
    const sendinblueResponse = await sendinblue.sendTransacEmail(sendinblueData);
    console.log('SendinBlue Email Sent:', sendinblueResponse);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};

const sendsEmail = async (UserData, res) => {
  try {
    // Add contact to Brevo
    await addContactToBrevo(UserData);

    // Generate verification token and set it in Redis
    const email = UserData.email;
    const verificationToken = await generateToken(email);
    client.setex(verificationToken, 30000, JSON.stringify({ UserData }));
    const link = `http://localhost:8000/api/users/verifyemail/${verificationToken}`
    const templateId = 1

    // Send verification email
    await sendVerificationEmail(UserData,link,templateId);

    res.json({ message: 'Contact added to Brevo, and email sent for verification' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

const sendsResetPassword = async (UserData, res) => {
  try {
    // Generate verification token and set it in Redis
    const email = UserData.email;
    console.log(`testing : ${email}`);
    const verificationToken = await generateToken(email);
    const link = `http://localhost:8000/api/users/resetpassword/${verificationToken}`
    const templateId = 2

    // Send verification email
    await sendVerificationEmail(UserData,link,templateId);

    res.json({ message: 'sends reset password link' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

module.exports = {sendsEmail,sendsResetPassword};
