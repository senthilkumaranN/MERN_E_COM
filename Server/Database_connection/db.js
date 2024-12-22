const mongoose = require('mongoose')

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGOODB_URL)
        console.log("database connected successfully")
    }catch(error){
        console.log("Error connecting on database",error)
        process.exit(1)
    }
}

module.exports = connectdb; 