var mongoose = require('mongoose');

var shoutSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    content: String,
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Shout', shoutSchema);