var Backbone = require('backbone');
var _ = require('underscore');

var ListView = require('../ListView/ListView');

var AppErrorView = Backbone.View.extend({
    className: 'region region--darkest',

    template: _.template(``),

    events: { 
        'click button': 'onClick'
    },

    onClick: function () {
        window.location.hash = '';
    },

    render: function () {
        this.childView = new ListView({
            title: 'App Errors',
            collection: this.collection
        });

        this.$el.html(this.template());
        this.childView.render();
        this.$el.append(this.childView.$el);
    }
});

module.exports = AppErrorView;