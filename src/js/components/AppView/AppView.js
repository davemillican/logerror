var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var ListView = require('../ListView/ListView');
var GraphView = require('../d3/GraphView');
var DetailView = require('../DetailView/DetailView');
var NavView = require('../Nav/NavView');

var dispatcher = require('../dispatcher/dispatcher');

var AppView = Backbone.View.extend({

    template: _.template(`
        <div class="nav-dock"></div>
        <div class="page-dock"></div>
    `),
    
    initialize: function (options) {
        this.listenTo(dispatcher, 'show', this.show);
        this.navView = new NavView();
    },

    render: function () {
        this.$el.html(this.template());
        this.renderNav();
    },

    renderNav: function () {
        this.$('.nav-dock').html(this.navView.$el);
        this.navView.render();
    },

    show: function (view) {
        if (this.child) {
            this.child.remove();
        }

        this.child = view;
        this.$('.page-dock').append(view.$el);
        view.render();
    }

});

module.exports = AppView;