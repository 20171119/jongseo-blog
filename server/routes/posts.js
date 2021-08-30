const express = require('express');
const router = express.Router();
const { Post } = require("../models/Post");
const multer = require('multer');

const { auth } = require("../middleware/auth");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


//=================================
//             Post
//=================================

router.post("/uploadImage", auth, (req, res) => {
    console.log("uploadImage")
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })

});

module.exports = router;

// auth 빠짐
router.post("/uploadPosts", auth, (req, res) => {
    console.log("/posts/uploadPosts")
    //save all the data we got from the client into the DB 
    const post = new Post(req.body)
    post.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

// auth 빠짐
router.post("/getPosts", (req, res) => {
    console.log("/posts/getPosts");
    Post.find()
        .sort({updatedAt: -1})
        .populate("writer")
        .exec((err, posts) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, posts})
        })

});

router.get("/:postId", (req, res) => {
    console.log('post_detail')
    let postId = req.params.postId
    
    //we need to find the product information that belong to product Id 
    Post.findOne({"_id": postId})
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({success: true, post})
        })
});

router.post("/posts_by_user", (req, res) => {
    console.log('posts_by_user')
    let userId = req.body.userId
    // console.log("in the posts_by_user" + userId)
    //we need to find the product information that belong to product Id 
    Post.find({"writer": userId})
        .populate('writer')
        .exec((err, posts) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({success: true, posts})
        })
});

router.delete("/delete", auth, (req, res) => {
    console.log('post_delete')
    let postIds = req.body.postId
    Post.findOneAndDelete({"_id": postIds}, (err, post) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true, post})
    })
})

router.put("/update", auth, (req, res) => {

    let filter = {
        "_id": req.body.postId
    }

    let update = {
        "title": req.body.title,
        "content": req.body.content,
        "images": req.body.images
    }

    Post.findOneAndUpdate(
        filter,
        update,
        {
            new: true
        },
        (err, post) => {
            console.log('post/update')
            if (err) return res.status(400).send(err)
            return res.status(200).json({success: true, post})
        }
        
    )
})

module.exports = router;