const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');
const { auth } = require('../middleware/auth');

router.post("/create", (req, res) => {
    console.log("/category/create")
    //save all the data we got from the client into the DB 
    const newCategory = {
        "category": req.body.category,
        "postsNum": 0
    }

    const category = new Category(newCategory);
    category.save((err, category) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, category })
    })

});

router.get("/", (req, res) => {
    console.log("/category/")
    Category.find()
        .sort({updatedAt: -1})
        .exec((err, categorys) => {
            if(err) return res.status(400).json({success: false})
            return res.status(200).json({success: true, categorys})
        })

});

router.delete("/delete", (req, res) => {
    console.log('/category/delete')
    Category.findOneAndDelete({"_id": req.body._id}, (err, category) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(category)
    })
})

module.exports = router;