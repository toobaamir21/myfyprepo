require('dotenv').config()
const JWT = require('jsonwebtoken')

const generateToken = async(val)=>{
    try{
        return await JWT.sign({id:val},process.env.jwtKey,{
            expiresIn:'3d'
        })
    }catch(err){
        console.log(err);  
    }
}

module.exports = generateToken;