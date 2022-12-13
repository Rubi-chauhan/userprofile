const mongoose = require('mongoose')
const user = require('./user')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
},{timestamps:true})

module.exports = mongoose.model('user', userSchema)