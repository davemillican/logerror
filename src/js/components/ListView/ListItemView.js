var _ = require ('underscore');
var $ = require ('jquery');
var Backbone = require('backbone');
var dispatcher = require('../dispatcher/dispatcher');


var ListItemView = Backbone.View.extend({

    tagName: 'li',

    events: {

        'click': 'onClick'
    },

    onClick: function () {
        console.log("click event in listview")
        window.location.hash = 'detail/' + this.model.get('id');    
    },
    
    template: _.template(`
        <div class='list-item-date'><%= date %></div>
        <div class='list-item-time'><%= time %></div>
        <div class='list-item-msg'><%= msg %></div>
    `),

    render: function () {
        this.$el.html(this.template(this.model.attributes));
    }

});

module.exports = ListItemView;

