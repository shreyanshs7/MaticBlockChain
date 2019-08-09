var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var Web3 = require('web3');

const providerUrl = 'kovan.infura.io/v3/6c6f87a10e12438f8fbb7fc7c762b37c';

var web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

var UserTransaction = require('./models/UserTransaction');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//API to insert user transactions
app.post('/user/transaction', function(req, res) {
  var userTransaction = new UserTransaction(req.body).save(function(err) {
    if (err) res.json(err);
    res.json(userTransaction);
  });
});

//API to retrieve user transactions based on user address which the user has sent to
app.get('/user/transactions', function(req, res) {
  console.log("AAAAAA ", req.query);
  if(req.query.from) {
    UserTransaction.find({from: req.query.from}, function(err, userTransactions) {
      if (err) res.json(err);
      res.json(userTransactions);
    });
  } else if (req.query.to) {
    UserTransaction.find({to: req.query.to}, function(err, userTransactions) {
      if (err) res.json(err);
      res.json(userTransactions);
    });
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
