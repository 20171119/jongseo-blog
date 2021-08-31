const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    category: {
        type: String
    },
    postNum: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category }