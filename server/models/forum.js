var mongoose = require('mongoose');

var forumSchema = new mongoose.Schema({

    title: String,
    description: String,
    isVisible: Boolean,
    urlName: String,
    displayOrder: Number,
    permission: [String]
});

module.exports = mongoose.model('Forum', forumSchema);
