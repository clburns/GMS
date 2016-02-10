var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    threadId: {type: mongoose.Schema.Types.ObjectId, ref: 'Thread'},
    content: {
        isQuote: Boolean,
        quoteMessage: String,
        message: String
    },
    isVisible: Boolean
});

module.exports = mongoose.model('Post', postSchema);
