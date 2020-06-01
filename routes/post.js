const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")


router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedby","_id name")
    .then(posts =>
        {
            res.json({posts})
        })
    .catch(err=>{
            console.log(err)
        })
})


router.get('/mypost',requirelogin,(req,res)=>{
    Post.find({postedby:req.user.id})
    .populate("postedby","_id name")
    .then(posts =>
        {
            res.json({posts})
        })
    .catch(err=>{
            console.log(err)
        })
})



router.post('/createpost',requirelogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body)
    {
        return res.status(422).json({error:"Please add all the fields"})
    }

    const post = new Post({
        title,
        body,
        postedby:req.user
    })
        req.user.password = undefined
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})




module.exports = router