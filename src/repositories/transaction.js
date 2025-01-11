const { ErrorHandler } = require("../utils/errorhandler");
const RepositoryMain = require("./repository_main");
const data = require("../mock/transaction_mock.json")

class Transaction extends RepositoryMain {

    async getAll(){
        const transactionData = data;
        return transactionData;
    }
}

module.exports = Transaction;