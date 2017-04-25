import mongoose from 'mongoose';
let ObjectId = require('mongoose').Types.ObjectId;

// let healthAreaSchema = mongoose.Schema({
// 	_id: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		required: false
// 	}
// });

const Users = mongoose.Schema({
		first_name : {
		 type: Object,
     required: true
		},
    last_name : {
		 type: Object,
     required: true
		},
		password:{
			type: Object,
      required: true
		},
    email : {
		 type: Object,
     required: true
		},
		created: {
		    type: Date,
		    default : new Date()
		},
		createdBy: {
		    type: mongoose.Schema.Types.ObjectId,
		    required: false
		},
		modified: {
		    type: Date,
		    required: false
		},
		modifiedBy: {
		    type: mongoose.Schema.Types.ObjectId,
		    required: false
		}
});

var passportLocalMongoose = require('passport-local-mongoose');

Users.plugin(passportLocalMongoose);

Users.statics.insertUser = function(data, callBack){
  console.log("inside register function");

  let user = new this(data);
	console.log(data);

  user.save(function(err, res) {
    if(!res) callBack(err, null);
    callBack( null, res);
  });

}

Users.statics.findUser = function(email, callBack) {
	console.log("Inside find user method, email: ", email);

	this.findOne({email:email},function(err, user){
		if(err) return callBack(null, null);
		console.log("user data: ", user);
		if(user) return callBack(null, user);
		return callBack(null, null);
	});


}

Users.statics.findAllUsers = function(email, callBack) {
	this.find({},{"email":1,"first_name": 1	},function(err, user){
		if(err) return callBack(null, null);

		if(user) return callBack(null, user);
		return callBack(null, null);
	});
}

Users.statics.authenticateUser = function({email, password}) {
	console.log("inside model data:" + email + ", password: " + password);

	this.findOne({email:email},function(err, user){
		if(err) return callBack(null, null);
		console.log("user data: ", user);
		if(user) return callBack(null, user);
		return callBack(null, null);
	});
}

export default mongoose.model('users', Users);
