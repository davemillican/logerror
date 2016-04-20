var _ = require('underscore');
var Backbone = require('backbone');

var NavView = Backbone.View.extend({

    className: 'nav',

    template: _.template(`
        <h1>DEV Reporter</h1>
        <button class="dash">Dashboard</button>
        <button class="user-errs">User Errors</button>
        <button class="app-errs">App Errors</button>
    `),

    render: function () {
        this.$el.html(this.template());
    },

    events: {
        'click .dash': 'onDashboard',
        'click .user-errs': 'onUserErrors',
        'click .app-errs': 'onAppErrors'
    },

    onUserErrors: function () {
        window.location.hash = '/userErrors';
    },

    onAppErrors: function () {
        window.location.hash = '/appErrors';
    },

    onDashboard: function () {
        window.location.hash = '';
    }

});

module.exports = NavView;