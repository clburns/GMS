var Forum = require('../models/forum'),
    Thread = require('../models/thread'),
    Post = require('../models/post'),
    helper = require('../helpers');

module.exports = function(app){
    app.get("/api/forums", helper.auth, function(req, res){
        Forum.find(function(err, forums){
            res.json(forums);
        });
    });

    app.route("/api/threads", helper.auth)
        .post(function(req, res){
            var newThread = new Thread();
            var newPost = new Post();
            var title = req.body.thread.title;
            newThread.title = title;
            newThread.forumId = req.body.forumId;
            newThread.createdBy = req.body.currentUser._id;
            newThread.isVisible = true;
            newThread.locked = false;
            // TODO: check if should be sticky
            newThread.isSticky = false;

            // TODO: only check if in the same forum
            var counter = 0;
            var checkUrlName = function(url) {
                    var newUrl = counter > 0 ? url + "-" + counter: url;
                    Thread.findOne({urlName: newUrl})
                    .exec(function (noThread, existingThread) {
                        if (existingThread) {
                            //url = existingThread.urlName + "-" + counter;
                            counter++;
                            checkUrlName(url);
                        } else if (noThread == null) {
                            newThread.urlName = newUrl;
                            newThread.save(function(err, thread){
                                if(err){
                                    return next(err);
                                }
                                newPost.createdBy = req.body.currentUser._id;
                                newPost.threadId = thread._id;
                                // TODO: check if quote
                                newPost.content.message = req.body.thread.message;
                                newPost.isVisible = true;
                                newPost.save(function(err){
                                    if(err){
                                        return next(err);
                                    }
                                    res.send(thread.urlName);
                                })
                            });
                        }
                    });
            };
            checkUrlName(title.replace(/\s+/g, '-').toLowerCase());
        });

    app.route("/api/threads/:forumUrl", helper.auth)
        .get(function(req, res){
            Forum.findOne({
                urlName : req.params.forumUrl
            }, function (err, forum){
                if (err) return next(err);
                if (forum){
                    var forumId = forum._id;
                    Thread.find({forumId : forumId})
                        .populate('createdBy')
                        .exec(function (err, threadData){
                            if (err) return next(err);
                            var data = {
                                threads: threadData,
                                forum: {
                                    forumTitle : forum.title,
                                    forumId : forum._id
                                }
                            };
                            res.json(data);
                        });
                }
            });
        });

    app.route("/api/posts", helper.auth)
        .post(function(req, res){
            var newPost = new Post();
            newPost.createdBy = req.body.currentUser._id;
            newPost.threadId = req.body.threadId;
            newPost.content.message = req.body.post.message;
            newPost.isVisible = true;
            newPost.save(function(err, postData){
                if(err){
                    return next(err);
                }
                Post.findOne({_id: postData._id})
                    .populate('createdBy')
                    .exec(function(err, post){
                        if(err) return next(err);
                        res.json(post);
                    })
            })
        });

    app.route("/api/posts/:forumUrl/:threadUrl", helper.auth)
        .get(function(req, res){
            Thread.findOne({urlName : req.params.threadUrl})
                .populate('forumId')
                .exec(function (err, thread){
                if (err) return next(err);
                if (thread){
                    var threadId = thread._id;
                    Post.find({threadId : threadId})
                        .populate('createdBy')
                        .exec(function (err, postdata){
                            if (err) return next(err);
                            var data = {
                                posts: postdata,
                                thread: {
                                    threadTitle: thread.title,
                                    threadId: thread._id
                                },
                                forumTitle: thread.forumId.title
                            };
                            res.json(data);
                        });
                }
            });
        });
};