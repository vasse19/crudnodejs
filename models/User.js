const mongoose = require('mongoose')
const Schema = mongoose.Schema 


const employeeSchema = new Schema({
    name: {
        type: String    
    },
    designation: {
        type: String    
    },
    email: {
        type: String    

    },
     phone: {
        type: Number 

    },
    age: {
        type: Number
    },
    password: {
        type: String
    },
    avatar: {
        type: String 
    }

},   {timestamps: true })

const User = mongoose.model('User', employeeSchema)
module.exports = User