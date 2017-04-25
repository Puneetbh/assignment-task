import Users from './models/users.js';
import mongoose from 'mongoose';

module.exports = class User {
    constructor(req, res, next) {
       this.res = res;
       this.req = req;
       this.next = next;
    }

/*To add new questionnaire category*/
    insertUser() {
      console.log("inside controller");
      let _this = this;
      let data = this.req.body;

      //_this.res.status(200).send({res: 'done'});

      Users.insertUser(data, function(err, data){
          if(err) _this.res.status(500).send(err);

          return _this.res.status(200).send({message: "User added successfully","status":"1"});
      });
    }

    checkEmailExists() {
      console.log("inside controller");
      let _this = this;
      let email = this.req.body.email;

      //_this.res.status(200).send({res: 'done'});

      Users.findUser(email, function(err, data){
          if(err) _this.res.status(500).send();

          if(data) {
            console.log(email+ " already exists");
            _this.res.status(200).json({message: email+" already exists", status:"0"});
          } else {
            _this.next();
          }

      });
    }

    fetchUsers() {
      console.log("Insde controller: fetchUsers()");
      let email = this.req.body.email;
      let _this = this;
      Users.findAllUsers(email, function(err, data){
          if(err) _this.res.status(500).send();

          console.log("user data in controller: ", data);

          if(data) {
            _this.res.status(200).json({data:data, status:"1"});
          }

      });

    }

    loginUser() {
      console.log("Insde controller: loginUser()");
      let _this = this;
      let email = this.req.body.email;
      let password = this.req.body.password;

      let userObj = {email, password};

      Users.authenticateUser(userObj, function(err, data){
          if(err) _this.res.status(500).send();

          console.log("user data in controller: ", data);

          if(data) {
            _this.res.status(200).json({data:data, status:"1"});
          }

      });

    }

}
