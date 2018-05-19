var sequelize = require('../config/sequelizeUtil');
var Content = sequelize.Content();
var moment = require('moment');
var _ = require('lodash');

module.exports = {
    saveContent: function(address, author, detail) {
        return Content.create({
            address: address,
            detail: detail,
            author: author
        });
    },
    getContent: function(address) {
        return Content.findAll({
            where: {
                address: address
            }
        });
    }
};