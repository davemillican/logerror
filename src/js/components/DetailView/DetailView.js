var _ = require('underscore');
var Backbone = require('backbone');
var $ = require('jquery');
var dispatcher = require('../dispatcher/dispatcher');

var DetailView = Backbone.View.extend ({
    tagName: 'div',

    events: {
        'click .exit-button': 'onExit'
    },

    template: _.template(require('./DetailView.html')), 

    initialize: function () {
        this.listenTo (this.model, 'sync', this.render);
    },

    onExit: function () {
        window.location.hash = '';
    },

    render: function ( model ) {
        console.log(this.model);
        this.$el.html(this.template(this.model.attributes));
        $('.outer-detail').append(this.$el);
        $('.outer-detail').css("display","block");
        console.log("in render Detail view",this.el);
    }

})

module.exports = DetailView;