const { register,Login,logout,authMiddleware} = require('../controller/auth_Controller')
const express = require('express')
const router = express.Router()


router.post('/register', register)
router.post('/login', Login)
router.post('/logout',logout)
router.get('/checkauth', authMiddleware, (req,res)=>{
    const user = req.user
    res.status(200).json({
        success: true,
        message: 'Authenticated User!',
        user
    })
})



module.exports = router