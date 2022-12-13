const express = require('express')
const app = express()
const mongoose = require("mongoose");

// const multer = require("multer");
const route = require('./src/routes/route')
require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true})
  .then(() => console.log("mongoDB Connected")) 
  .catch((err) => console.log(err)); 

app.listen(PORT ,()=>{console.log('server is up and running')})


app.use('/', route)
