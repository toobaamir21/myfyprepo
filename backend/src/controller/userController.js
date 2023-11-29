const User = require('../model/User');
const sendsEmail = require('../middlewares/sendsEmail')

const emailConfirmation = async(req,res)=>{
    try{
        const UserData = req.body;
        console.log(UserData);
        const email = UserData.email;
        const userExists = await User.findOne({email});
        console.log(userExists);
        if(userExists){
            console.log('user exists');
            res.status(200).json({message:"This Email has already exist"})
        }
        else{
            sendsEmail(UserData,res)
        }
    }catch(error){
        console.log(error);
        res.status(500).json({ErrorMessage:error.message})
    }
}

module.exports = {emailConfirmation}