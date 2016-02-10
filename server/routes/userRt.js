var User = require('../models/user'),
    helper = require('../helpers');

module.exports = function(app){
    app.get("/api/user", helper.auth, function(req, res){
        User.find(function(err, users){
            res.json(users);
        });
    });

    app.get("/api/user/:id", helper.auth, function(req, res){
        User.find({
            id : req.param.id
        }, function(err, user){
            if (err) return next(err);
            res.json(user);
        });
    });

    app.delete("/api/user/:user_id", helper.reqAdmin, function (req, res){
        User.remove({
            _id : req.params.user_id
        }, function(err, user){
            if(err)
                res.send(err);
            User.find(function(err, User){
                if(err)
                    res.send(err);
                res.json(User);
            })
        })
    })
};