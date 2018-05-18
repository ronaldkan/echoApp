var sequelize = require('../config/sequelizeUtil');
var User = sequelize.User();
var moment = require('moment');
var _ = require('lodash');


module.exports = {
    getUsers: function() {
        User.findAll()
        .then(function(data) {
            return data;
        })
        .catch(function(err) {
            console.log(err);
        });
    },
};