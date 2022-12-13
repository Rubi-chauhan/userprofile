const userModel = require('../models/user')
const userProfile = require('../models/userProfile')
const {isValidObjectId,isValidPass,isValidBody,enumGender,isValidEmail, isValidPhone} = require('../utility/validation')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





const createUser = async(req,res)=>{
try{
    let data = req.body;

    let {
    email, password
    } = data;

    if (!isValidBody(email) || !isValidEmail(email)) {
        return res.status(400).send({
          status: false,
          message: `Please! enter a valid email.`,
        });
      }

        //unique fields validation
        let checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
          return res.status(400).send({
            status: false,
            message: `${email} already exist use different email`,
          });
        }

    if (data.password) {

        let securePassword = data.password;
        
        const encryptedPassword = async function (securePassword) {
            const passwordHash = await bcrypt.hash(securePassword, 10);
            data.password = passwordHash;
          };
          encryptedPassword(securePassword);

    }


    const user = await userModel.create(data);
    res.status(201).send({ status: true, message: `Registration successfull.`, data: user })
  } catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}


const loginUser = async (req, res) => {
    try {
      let data = req.body
      // condition to check body should not be empty
      if (!data) {
        return res.status(400).send({ status: false, message: "plz enter emailId and password" })
      }
      let { email, password } = data

      if (!isValidBody(email)) {
        return res.status(400).send({ status: false, message: "email is required" })
      }
  
  
  
      if (!isValidBody(password)) {
        return res.status(400).send({ status: false, message: "password is required" })
      }
      password = password.trim()
      if (!isValidPass(password)) {
        return res.status(400).send({ status: false, message: "enter valid email" })
      }
      //  password Validation
  
      const emailCheck = await userModel(email)
      if (!emailCheck) {
        return res.status(404).send({ status: false, message: `${email} not found` })
      }
  
      const dbPassword = emailCheck.password
  
      const passwordMathched = await bcrypt.compare(password, dbPassword)
      if (!passwordMathched) {
        return res.status(401).send({ status: false, message: "Please provide valid credentils" })
      }
  
      let userId = emailCheck._id
      
      const token = jwt.sign(
        {
          userId: userId
        },
        "secretkey", { expiresIn: "24hr" }
      );
      res.setHeader("token", token)
      return res.status(200).send({ message: 'login successfull' })
  
    } catch (error) {
      res.status(500).send({ status: false, message: error.message })
    }
  
  }


const createProfile = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
      }
}


const getUser = async(req,res)=>{
    try {
        const findUsers = await userProfile.find()
        return res.status(200).send({ message: 'List of all the users', data:findUsers })
        
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
      }
}

  //-------------------------------------------------------updateUser-----------------------------------------------------------------------------//
const updateUser = async (req, res) => {

    try {
      let userId = req.params.userId;
      let data = req.body;
  
  
      if (data["email"]) {
        return res
          .status(400)
          .send({ status: false, message: "Email can't be updated" });
      }
      if (data["password"]) {
        return res
          .status(400)
          .send({ status: false, message: "Password can't be updated" });
      }
  
      const userUpdate = await userProfile.findByIdAndUpdate(userId, data, {
        new: true,
      });
      return res
        .status(200)
        .send({ status: true, message: "Updated", data: userUpdate });
    } catch (error) {
      return res.status(500).send({ status: false, error: error.message })
    }
  };

module.exports = { createUser,loginUser,createProfile,getUser,updateUser}