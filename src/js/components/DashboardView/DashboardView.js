var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var ListView = require('../ListView/ListView');
var graphView = require('../d3/GraphView');
var DetailView = require('../DetailView/DetailView');

var DashboardView = Backbone.View.extend({

    template: _.template (`
                            <div class="region" id="graph-dock"></div>
                            <div class="region region--dark user-err-dock"></div>
                            <div class="outer-detail"></div>
                            <div class="region region--darkest app-err-dock"></div>
                          `),

    initialize: function (options) {
        this.$el.html(this.template());

        this.userErrCollection = options.userErrCollection;
        this.appErrCollection = options.appErrCollection;

        this.userErrView = new ListView({
            title: 'User Errors',
            collection: this.userErrCollection,
            condensed: true,
            showMorePath: '/#/userErrors'
        });

        this.appErrView = new ListView({
            title: 'App Errors',
            collection: this.appErrCollection,
            condensed: true,
            showMorePath: '/#/appErrors'
        });
    },

    render: function () {
        this.$el.find('.user-err-dock').html(this.userErrView.$el);
        this.userErrView.render();

        this.$el.find('.app-err-dock').html(this.appErrView.$el);
        this.appErrView.render();

        this.$el.find('#graph-dock').html(graphView.$el);
        graphView.render();

    }

});

module.exports  = DashboardView;