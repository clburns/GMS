var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

module.exports = function(passport){

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function(user, done){
        //done(null, user);
        User.findById(user._id, function(err, user){
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy(
      function(username, password, done){
          User.findOne({'local.username': username})
              .select('+local.password')
              .exec(function(err, user){
                  if(err) {
                      return done(err);
                  }
                  if(!user) {
                      return done(null, false);
                  }
                  if(!user.validPassword(password)){
                  }
                  return done(null, user);
                  //if(user){
                  //    return done(null, user);
                  //}
                  //return done(null, false, {message: 'Unable to login'});
              });
      }
    ));

};