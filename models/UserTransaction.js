const mongoose = require('mongoose');

mongoose.connect('mongodb://abcd:abcd12345@ds161397.mlab.com:61397/matic', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const UserTransactionSchema = new Schema({
    from: Schema.Types.String,
    to: Schema.Types.String,
    transactionHash: Schema.Types.String,
    blockNumber: Schema.Types.Number 
});

const UserTransaction = mongoose.model('UserTransaction', UserTransactionSchema);

module.exports = UserTransaction;