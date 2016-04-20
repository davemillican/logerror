var _ = require ('underscore');
var Backbone = require ('backbone');

var dispatcher = _.extend({}, Backbone.Events);

module.exports = dispatcher;
