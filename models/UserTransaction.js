const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017');

const Schema = mongoose.Schema;

const UserTransaction = new Schema({
    from: Schema.Types.String,
    to: Schema.Types.String,
    transactionHash: Schema.Types.String,
    blockNumber: Schema.Types.Number 
});

module.exports = UserTransaction;