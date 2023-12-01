const User = require("../model/User");
const sendsEmail = require("../middlewares/sendsEmail");
const client = require("../client");
const generateToken = require("../middlewares/generateToken");

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
        const dbData = await User.create(obj.UserData);
        if (dbData) {
          const deleteFromRedis = await client.getdel(token);
          console.log(`deleted : ${deleteFromRedis}`);
          res.status(201).json({ msg: "Email Verified Successfully" });
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

module.exports = { emailConfirmation, verifyEmailAndSavesDataToDb, authUser };
