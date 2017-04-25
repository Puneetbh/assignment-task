import User from './models/users.js';
import passport from 'passport';
import mongoose from 'mongoose';

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  let user = new User();

  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.accessCode = req.body.accessCode;
  User.findOne({ email: user.email }, function (err, rec) {
    if(rec){
      res.status(401);
      return rec;
    }
  });

  user.setPassword(req.body.password);
  user.save(function(err){
      //token = user.generateJwt();
        res.status(200);
        res.json({
          type: true,
          data: user
        });
  });

};

module.exports.login = function(req, res) {
  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log("inside authentication file ");
  passport.authenticate('local', function(err, user, info){
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if(user){
      //token = user.generateJwt();
      res.status(200);
      res.json({
        user:user
      });
    } else if (info.status == -1) {
      // If user is not found
      res.status(404).json(info);
    } else if (info.status == -2) {
      // if crediantials are wrong
      res.status(401).json(info);
    }
  })(req, res);


};
module.exports.logout = function (req,res) {
    req.logout();
    res.status(200);
    res.redirect('/');

}
