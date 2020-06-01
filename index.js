const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000
const {mongourl} = require('./keys');
const bcrypt = require('bcryptjs')



mongoose.connect(mongourl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})

mongoose.connection.on('error',(err)=>{
    console.log("error in connecting",err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))





app.listen(port,()=>{
    console.log("server is running on ",port)
}) 