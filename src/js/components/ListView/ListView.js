var $ = require ('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var ListItemView = require('./ListItemView');

var ListView = Backbone.View.extend({

    tagName: 'ul',

    className: 'list-view',

    events: {
        'click button': 'onShowMoreClick'
    },

    template: _.template(require('./list.html')),

    initialize: function (options) {
        this.title = options.title;
        this.condensed = options.condensed;
        this.showMorePath = options.showMorePath;
        this.listenTo(this.collection, 'add remove sync reset', this.render);
        this.children = [];
    },

    render: function () {
        var _this = this;
        var current;

        /*  First we need to clear the list of children */

        // console.log(this.children.length);
        while (this.children.length) {
            current = this.children.pop();
            current.remove();
        };

        this.$el.html(this.template({
            condensed: this.condensed,
            title: this.title
        }));

        var count = 0;

        var collection = this.collection;

        if (this.condensed) {
            collection = collection.slice(collection.length - 10, collection.length);
        }

        collection.forEach( function ( curModel ) {
            _this.children[count] = new ListItemView( {model: curModel} );
            _this.$('.list-items').append(_this.children[count].$el);
            _this.children[count].render();
            count++;
        });
    },

    onShowMoreClick: function () {
        window.location.href = this.showMorePath;
    }
});

module.exports = ListView;