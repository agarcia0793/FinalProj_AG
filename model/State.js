const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    stateCode: {
        required: true,
        type: String,
        unique: true
    },
    funfacts: [String],
})

module.exports = mongoose.model('State', stateSchema)