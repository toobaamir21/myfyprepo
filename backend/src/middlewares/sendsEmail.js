const SibApiV3Sdk = require('sib-api-v3-sdk');
const generateToken = require('./generateToken');
const client = require('../client');
const { ContactsApi, Contact } = require('@getbrevo/brevo');

// SendinBlue setup
const sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

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

const sendVerificationEmail = async (UserData, verificationToken) => {
  const email = UserData.email;
  const sendinblueData = new SibApiV3Sdk.SendSmtpEmail();
  sendinblueData.to = [{ email: email }];
  sendinblueData.templateId = 1;
  sendinblueData.params = {
    verification_link: `http://api/users/verifyemail/${verificationToken}`
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
    client.setex(verificationToken, 300, JSON.stringify({ UserData }));

    // Send verification email
    await sendVerificationEmail(UserData, verificationToken);

    res.json({ message: 'Contact added to Brevo, and email sent for verification' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

module.exports = sendsEmail;
