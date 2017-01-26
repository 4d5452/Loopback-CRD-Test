'use strict';

module.exports = (User) => {
  
  User.prototype.validPassword = (password, cb) => {
    console.log(this);
    cb(null, false);
  }// end: User.prototype.validPassword

  User.remoteMethod('validPassword', {
    isStatic: false,
    accepts: [
      { arg: "password", type: "string", required: true }
    ],
    returns: { arg: "valid", type: "boolean" }
  });// end: User.remoteMethod 
}// end: module.exports