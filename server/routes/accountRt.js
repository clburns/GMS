var passport = require('passport'),
    User = require('../models/user'),
    helper = require('../helpers');

module.exports = function(app){
    app.post('/login', passport.authenticate('local-login'), function(req, res){
        res.json(req.user)
    });

    app.post('/register', function(req, res){
        User.findOne({'local.username': req.body.username})
            .select('+local.password')
            .exec(function(err, user){
                if(user){
                    res.json(null);
                    return;
                }
                else {
                    var newUser = new User();
                    newUser.local.username = req.body.username;
                    newUser.local.password = newUser.generateHash(req.body.password);
                    newUser.local.roles = ['initiate'];
                    newUser.save(function(err, user){
                        req.login(user, function(err){
                            if(err){
                                return next(err);
                            }
                            res.json(user);
                        });
                    });
                }
            });
    });

    app.post('/logout', function(req, res){
        req.logout();
        res.sendStatus(200);
    });

    app.put('/update', helper.auth, function(req, res){
        var user = req.body;
        User.findById(user._id, function(err, foundUser){
            foundUser.update(req.body, function(err, count){
                res.send(count);
            });
        });
    });

    app.get('/loggedin', function(req, res){
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.get('/api/getCurrentUser', function(req, res){
        res.send(req.user);
    });
};
