const User = require("../model/User");
const { sendsEmail, sendsResetPassword } = require("../middlewares/sendsEmail");
const client = require("../client");
const generateToken = require("../middlewares/generateToken");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const emailConfirmation = async (req, res) => {
  try {
    const UserData = req.body;
    console.log(UserData);
    const email = UserData.email;
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      console.log("user exists");
      res.status(200).json({ message: "This Email has already exist" });
    } else {
      sendsEmail(UserData, res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: error.message });
  }
};

const verifyEmailAndSavesDataToDb = async (req, res) => {
  try {
    const token = req.params.token;
    if (token) {
      const redisData = await client.get(token);
      const obj = await JSON.parse(redisData);
      if (obj !== undefined) {
        const data = await User.create(obj.UserData);
        if (data) {
          const deleteFromRedis = await client.getdel(token);
          console.log(`deleted : ${deleteFromRedis}`);
          res.status(201).json({
            fname: data.fname,
            lname: data.lname,
            phone: data.phone,
            role: data.role,
            email: data.email,
            accessToken: await generateToken(data._id),
          });
        } else {
          res.status(500).json({ msg: "Error Occured in create user in db" });
        }
      } else {
        res
          .status(500)
          .json({ msg: "Error Occured in fetching data from redis" });
      }
    } else {
      res.status(500).json({ msg: "Error Occured in getting token" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ ErrorMsg: err.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: "Please Enter Email or Password" });
    } else {
      const data = await User.findOne({ email });
      if (data && (await data.matchPassword(password))) {
        res.status(200).json({
          fname: data.fname,
          lname: data.lname,
          phone: data.phone,
          role: data.role,
          email: data.email,
          accessToken: await generateToken(data._id),
        });
      } else {
        res.status(404).json({ msg: "Email or Password is not correct" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ ErrorMsg: err.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "user not exists" });
    } else {
      sendsResetPassword(user, res);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ ErrorMessage: err.message });
  }
};

const handleReset = async (req, res) => {
  try {
    const token = req.params.token;
    const {password} = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const decoded = await jwt.decode(token)
    // console.log(`decoded : ${decoded.id}`);
    if(decoded && hashPassword){
      const email = decoded.id
      console.log(`email : ${email}`);
      const user = await User.findOneAndUpdate({email},{password:hashPassword},{new:true})
      res.status(201).json({user})
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ ErrorMessage: err.message });
  }
};

module.exports = {
  emailConfirmation,
  verifyEmailAndSavesDataToDb,
  authUser,
  forgetPassword,
  handleReset,
};
