const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Postschema = mongoose.Schema({
    title:{
        type:String,
    required:true
    },
    body:{
        type:String,
    required:true
    },
    photo:{
    type:String,
    default:"no photo"
    },
    postedby:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Post",Postschema)