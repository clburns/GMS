var Shout = require('../models/shout'),
    helper = require('../helpers');

module.exports = function(app){
    app.route("/api/shout", helper.auth)
        .get(function(req, res){

        })
        .post(function(req, res){

        });

    //app.get("/api/user", helper.auth, function(req, res){
    //    User.find(function(err, users){
    //        res.json(users);
    //    });
    //});
};