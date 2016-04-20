var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');

var dispatcher = require('../dispatcher/dispatcher');

var userErrCollection = require('../Collections/UserErrCollection');
var appErrCollection = require('../Collections/AppErrCollection');

var utils = require('./d3utils');

var GraphView = Backbone.View.extend({
    className: 'graphs',

    template: _.template(require('./GraphView.html')),

    //events
    events: {
        'click button': 'onClick'
    },

    onClick: function () {
      console.log("click event");
      //simulates an error comming in from an external source
      utils.pushError( 0.8 );
    },

    initialize: function () {
        this.listenTo(dispatcher, 'update', this.update);
        this.graphNode = document.createElement('div');
        this.graph = utils.graphInitialize(this.graphNode);
        this.graph.tick();
    },

    update: function () {
        $('.userErrs').html(userErrCollection.length);
        $('.appErrs').html(appErrCollection.length);
        utils.pieChart();
    },

    render: function () {
        this.delegateEvents();

        this.$el.html(this.template());
        
        $('#line-graph').html( this.graphNode );

        $('.userErrs').html(userErrCollection.length);
        $('.appErrs').html(appErrCollection.length);

        utils.pieChart();
        this.graph.resize();
    }
});

module.exports = new GraphView();