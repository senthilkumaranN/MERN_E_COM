const user = require("../model/auth_model.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    const { username, password, email } = req.body;

    try {

        const existingUser = await user.findOne({ email })

        if (existingUser) {
          return res.status(409).json({
                success: false,
                message: "User Email already exist"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 12)
        const newlyUser = new user({
            username, password: hashedPassword, email
        })

        await newlyUser.save();
        if (newlyUser) {
            res.status(201).json({
                success: true,
                message: "user register is successfully done"
            })
        }

    } catch (error) {
        res.status(409).json({
            success: false,
            message: ("Registeration error", error)
        })
    }
}

const Login = async (req,res) =>{
    const {email, password} = req.body;
    try{
       
       const checkUser = await user.findOne({email})
       if(!checkUser){
          return res.status(404).json({
              success: false,
              message: "User Email did'nt exist"
           })
       }

       const ispasswordMatch = await bcrypt.compare(password,checkUser.password)
       if(!ispasswordMatch){
         return res.status(404).json({
            success: false,
            message: "User Password did'nt Match"
        })
       }

       const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.username
       }, 'CLIENT_SHOPPING_KEY',{
             expiresIn : '60m'
       })
       
       res.cookie('token', token ,{httpOnly: true, secure : false}).json({
          success: true,
          message: "Logged in successfully",
          user:{
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            userName: checkUser.username
          }
       })

    }catch(error){
        
         return res.status(500).json({
            success: false,
            message: "Sign In error"
        })
    }
}

const logout = (req,res) =>{
    res.clearCookie("token").json({
        success: true,
        message: "logout successfully"
    })
}

const authMiddleware = async(req,res,next) =>{
    const token = req.cookies.token
    if(!token){
       return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        })
    }

    try{
        const decoded = jwt.verify(token,"CLIENT_SHOPPING_KEY");
        req.user = decoded;
        next();

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Token error"
        })
    }
}

module.exports = {register,Login,logout,authMiddleware}