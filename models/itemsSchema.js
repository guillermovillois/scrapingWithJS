const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemTitle: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: String,
        required: true,
    },
    itemURL: {
        type: String,
        required: true,
    },
    itemImg: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Item', itemSchema);