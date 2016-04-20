var $ = require ('jquery');
var Backbone = require('backbone');
var io = require('socket.io-client');

var utils = require('./components/d3/d3utils');

var userErrCollection = require('./components/Collections/UserErrCollection');
var appErrCollection = require('./components/Collections/AppErrCollection');
var AppView = require('./components/AppView/AppView');

var AppRouter = require('./components/AppRouter/AppRouter');
var dispatcher = require('./components/dispatcher/dispatcher');

var appView = new AppView();

$('body').append(appView.$el);

appView.render();

var appRouter = new AppRouter();

Backbone.history.start();

window.onerror = function (errorMsg, url, lineNum, char, e) {
    alert("this is an error" + "error: " + errorMsg);
};



//  ****************************************
//  ****************************************
  var socket = io();

  socket.on('app:init', function (errors) {
    var appErrors = errors.filter(function (error) {
      return error.type === "app";
    });

    var userErrors = errors.filter(function (error) {
      return error.type === 'user';
    });

    appErrCollection.reset(appErrors);
    userErrCollection.reset(userErrors);

    utils.updateCount(userErrCollection.length, appErrCollection.length);
    dispatcher.trigger('update');

  })
 

  socket.on('app:error', function (msg) {

    // console.log(msg);

    //  There are two types of errors.  Each error will come in 
    //  as an object.  The "type" field (user, app) will determine
    //  which collection it is added to .

    // console.log(msg);

    // var entry = JSON.parse(msg);

    // console.log(typeof entry);

    utils.pushError();

    if (msg.type === "user") {
      userErrCollection.add(msg);
    } else {
      appErrCollection.add(msg);
    };

    utils.updateCount(userErrCollection.length, appErrCollection.length);
    dispatcher.trigger('update');

  });