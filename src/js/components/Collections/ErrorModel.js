var Backbone = require('backbone');

var ErrorModel = Backbone.Model.extend({
    urlRoot: 'api/error',

    defaults: {
        time: 'unknown',
        date: 'unkown',
        msg: 'unknown',
        stack: 'clear'
    }
});

module.exports = ErrorModel;