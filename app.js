var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var Web3 = require('web3');

const HOST = '0.0.0.0';
const PORT = 4000;

const providerUrl = 'https://kovan.infura.io/v3/6c6f87a10e12438f8fbb7fc7c762b37c';

var web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

var UserTransaction = require('./models/UserTransaction');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API to insert user transactions
app.get('/user/transaction', function(req, res) {
  var userData = [];
  for (let index = 12681040; index > 12580040; index--) {
    if(userData.length < 10000) {
      web3.eth.getBlock(index, true).then(function(response) {
        if(response.transactions.length > 0) {
          response.transactions.forEach(element => {
            var data = {
              from: element.from,
              to: element.to,
              transactionHash: element.hash,
              blockNumber: element.blockNumber
            };
            userData.push(data);
          });
        }
      }).catch(function(err){
        throw err;
      });  
    }
  }
  UserTransaction.insertMany(userData).then(function(transactions){
    res.json({success: true, transactions: transactions});
  }).catch(function(err){
    throw err;
  });
  res.json({success: true});
});

//API to retrieve user transactions based on user address which the user has sent to
app.get('/user/transactions', function(req, res) {
  if('from' in req.query) {
    UserTransaction.find({from: req.query.from}, function(err, userTransactions) {
      if (err) res.json(err);
      res.json(userTransactions);
    });
  } else if ('to' in req.query) {
    UserTransaction.find({to: req.query.to}, function(err, userTransactions) {
      if (err) res.json(err);
      res.json(userTransactions);
    });
  } else {
    res.json({message: 'No query params were provided from transaction'});
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

app.listen(PORT, HOST, function(){
  console.log(`Server started on ${HOST}:${PORT}`);
});

module.exports = app;
