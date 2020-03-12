const mongoose = require('mongoose');

//Create a new Action Schema 
const actionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    loginDate: {
        type: Date,
        required: false,
        default: null
    },
    streams: {
        type: Array,
        required: false,
        default: []
    },
    logoutDate: {
        type: Date,
        required: false,
        default: null
    }
})

module.exports = mongoose.model('Action', actionSchema, "actions");