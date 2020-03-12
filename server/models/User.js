const mongoose = require('mongoose');

//Create a new User Schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 5
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema, "users");