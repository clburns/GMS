var mongoose = require('mongoose');

var threadSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    forumId: {type: mongoose.Schema.Types.ObjectId, ref: 'Forum'},
    title: String,
    isVisible: Boolean,
    urlName: String,
    locked: Boolean,
    isSticky: Boolean
});

module.exports = mongoose.model('Thread', threadSchema);
