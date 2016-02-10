module.exports.auth = function(req, res, next){
    if(!req.isAuthenticated())
        res.sendStatus(401);
    else
        next();
};

module.exports.reqAdmin = function(req, res, next) {
    if (req.user.local && req.user.local.roles == 'admin')
        next();
    else
        res.sendStatus(401);
};


