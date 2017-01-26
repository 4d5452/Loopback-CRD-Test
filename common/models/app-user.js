'use strict';

const app = require('../../server/server');
const remoteTest = require('./app-user/remote-test.js');
const validPassword = require('./app-user/valid-password');

module.exports = function(AppUser) {
  remoteTest(AppUser);  
  validPassword(AppUser);
};
