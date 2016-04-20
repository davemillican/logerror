var Backbone = require('backbone');

var DashboardView = require('../DashboardView/DashboardView');
var userErrCollection = require('../Collections/UserErrCollection');
var appErrCollection = require('../Collections/AppErrCollection');
var ErrorModel = require('../Collections/ErrorModel');
var ListView = require('../ListView/ListView.js');
var dispatcher = require('../dispatcher/dispatcher');
var AppErrorView = require('../AppError/AppErrorView');
var UserErrorView = require('../UserError/UserErrorView');

var DetailView = require('../DetailView/DetailView')

var AppRouter = Backbone.Router.extend({
    initialize: function() {
        this.on('route', this.change);
    },

    change: function () {
        document.body.scrollTop = 0;
    },

    routes: {
        '': 'dashboard',
        'detail/:id': 'detail',
        'userErrors': 'userErrors',
        'appErrors': 'appErrors'
    },

    dashboard: function () {
        dispatcher.trigger('show', new DashboardView({
            'userErrCollection':userErrCollection,
            'appErrCollection':appErrCollection
        }));
    },

    detail: function (id) {
        var curModel = new ErrorModel({id:id});

        curModel.fetch();

        dispatcher.trigger( 'show', new DetailView ({model: curModel}) );

    },

    userErrors: function () {
        dispatcher.trigger( 'show', new UserErrorView({
            collection: userErrCollection
        }));

    },

    appErrors: function () {
        dispatcher.trigger( 'show', new AppErrorView({
            collection: appErrCollection
        }));
    }

});

module.exports = AppRouter;
