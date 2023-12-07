require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateToken = async(val,expireTime)=>{
    try{
        return await JWT.sign({id:val},process.env.jwtKey,{
            expiresIn: expireTime
        })
    }catch(err){
        console.log(err);  
    }
}

module.exports = generateToken;