var express = require('express');
var faker = require('faker');
var moment = require('moment');
var router = express.Router();
var sequelize = require('../config/sequelizeUtil');
var User = require('../models/user');
var Content = require('../models/content');
var io = require('../bin/www');
var { RoomUsers } = require('../models/roomUsers');

const generateMessage = (from, text) => {
  return {
    from, 
    text, 
    createdAt: moment().valueOf(new Date().getTime())
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', function(req, res, next) {
  var socket = req.app.get('socketio');
  console.log('hello socket');
  console.log(socket.id);
  var name = req.body.name;
  var text = req.body.text;
  console.log(roomUsers);
  console.log('hello1111111');
  var user = roomUsers.getUser(socket.id);
  console.log(user);
  if (user) {
    console.log('hello user');
    io
      .to(user.room)
      .emit('newMessage', generateMessage(name, text));
  }
});

router.get('/test', function(req, res, next) {
 res.json({'success': 'true'});
});

router.post('/register', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.doRegister(username, password, faker.name.findName())
  .then(function (response) {
    return res.json({
      'content': response
    });
  });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.doLogin(username, password)
  .then(function (response) {
    return res.json({
      'content': response[0]
    });
  });
});

router.post('/content/fetch', function(req, res ,next) {
  var address = req.body.address;
  Content.getContent(address)
  .then(function (response) {
    return res.json({
      'content': response
    })
  });
});

router.post('/content', function(req, res, next) {
  var author = req.body.author;
  var address = req.body.address;
  var detail = req.body.detail;
  Content.saveContent(address, author, detail)
  .then(function() {
    Content.getContent(address)
    .then(function (response) {
      return res.json({
        'content': response
      });
    });
  });
});

router.get('/content', function(req, res, next) {
  var author = req.query.author;
  if (author) {
    Content.getUserContent(author)
    .then(function (response) {
      return res.json({
        'content': response
      });
    });
  }
  Content.getAllContent()
    .then(function(response) {
      return res.json({
        'content': response
      });
    });
});

module.exports = router;
