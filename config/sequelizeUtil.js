'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://echouser:Pass1234@127.0.0.1/echodb');
sequelize.authenticate()
.then(() => {
	console.log('Connection has been established successfully.');
})
.catch(err => {
	console.error('Unable to connect to the database:', err);
});
module.exports = {
	User: function() {
		var User = sequelize.define('User', {
			username: {
				type: Sequelize.STRING
			}, 
			password: {
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			}
		});

		return User;
	},
	Content: function() {
		var Content = sequelize.define('Content', {
			address: {
				type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            detail: {
                type: Sequelize.STRING
            }
		});
		return Content;
    },
    Chat: function() {
        var Chat = sequelize.define('Chat', {
            text: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            }, 
            address: {
                type: Sequelize.STRING
            }
        });
        return Chat
    }
};