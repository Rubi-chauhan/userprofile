const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
// const user = require('./user')

const userProfileSchema = new mongoose.Schema({
    userId: {type : ObjectId, ref : 'user', required : true },
    fname:{ type: String,required : true, trim: true },
    lname:{ type: String,required : true, trim: true },
    phone: { type: Number, required: true, unique: true, trim: true },
    gender: { type: String, trim: true, enum: ["Male", "Female", "LGBTQ", "Prefer not to say"] },
    profileImage: { type: String },
    // location: { type: String, trim: true },
    // DOB: { type: String, trim: true },
},{timestamps:true})

module.exports = mongoose.model('userProfile', userProfileSchema)