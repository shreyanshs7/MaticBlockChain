const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const UserTransactionSchema = new Schema({
    from: Schema.Types.String,
    to: Schema.Types.String,
    transactionHash: Schema.Types.String,
    blockNumber: Schema.Types.Number 
});

const UserTransaction = mongoose.model('UserTransaction', UserTransactionSchema);

module.exports = UserTransaction;