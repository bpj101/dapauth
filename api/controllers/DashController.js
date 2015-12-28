/**
 * DashController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
module.exports = {
  // Sign User up
  checkUser: (req, res) =>{
    if (req.session.me) {
      return res.view('dashboard');
    } else {
      return res.view('login');
    }
  },
  getUser: (req, res) => {
    console.log('Running getUser');
    User.findOne({
      id:req.session.me
    },
      function(err, user) {
        if (err) {
          res.negotiate(err);
        }
        return res.send(user);
      }
    );
  }
};