/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
module.exports = {
	// Sign User up
  signup: (req, res) =>{
    console.log('BackEnd Signup');

    var Passwords = require('machinepack-passwords');

    // Encrypt Password
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10
    }).exec({
      error: (err) => {
        return res.negotiate(err);
      },
      success: (encryptPassword) => {
        require('machinepack-gravatar').getImageUrl({
          emailAddress: req.param('email')
        }).exec({
          error: (err) => {
            return res.negotiate(err);
          },
          success: (gravatarUrl) => {
            // Create User
            User.create({
              name: req.param('name'),
              email: req.param('email'),
              password: encryptPassword,
              lastLoggedIn: new Date(),
              gravatarUrl: gravatarUrl
            }, function userCreated(err, newUser) {
              if(err){
                console.log('Error: '+err);
                return res.negotiate(err);
              }

              //SESSION VAR

              console.log('User Added');

              return res.json({
                id: newUser.id
              });
            });
          }
        });
      }
    });
  },
  login: (req, res) => {
    // Validate User
    User.findOne({
      email: req.param('email')
    }, function foundUser (err, user) {
      if (err) {
        return res.negotiate(err);
      } 
      if (!user){
        return res.notFound();
      }

      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.password
      }).exec({
        error: (err) => {
          //code
          console.log('Password Error');
          return res.negotiate(err);
        },
        incorrect: () => {
          console.log('Password Incorrect');
          return res.notFound();
        },
        success: () => {
          // req.session.me = user.id;
          console.log("SUCCESS");
          return res.ok();
        }
      });
    });
  }
};

