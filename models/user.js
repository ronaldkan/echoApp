var sequelize = require('../config/sequelizeUtil');
var User = sequelize.User();
var moment = require('moment');
var _ = require('lodash');

module.exports = {
    doRegister: function(username, password, fakeName) {
        return User.create({
            username: username,
            password: password,
            name: fakeName
        });
    },
    doLogin: function(username, password) {
        return User.findAll({
            where: {
                username: username,
                password: password
            }
        });
    }
};