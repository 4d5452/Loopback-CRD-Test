'use strict';

// async method call
module.exports = function(app, cb) {
  // get the user model
  let User = app.models.AppUser;
  // Create user
  User.create({username:"admin", password:"admin"})
    .then((obj) => {
      console.log("obj: ", obj);
      // find newly created user
      User.findOne({ where: {username: obj.username }})
        .then((user) => {
          // prevents fail on second attempt
          if(!user){ return cb(); }
          console.log("user: ", user);
          // validate the user password
          user.validPassword(user.password, (err, valid) => {
            console.log(valid);
            // remove the newly created user
            User.destroyById(user.id)
            .then(() => {
              console.log("Finished");
              cb();
            });// end: User.destroyById
          });// end: user.validPassword
        })
    }).catch((err) => {
      console.log(err);
      cb();
    });
}// end: exports