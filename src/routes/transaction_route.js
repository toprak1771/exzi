const express = require("express");
const TransactionController = require("../controllers/transaction");
const Transaction = require("../repositories/transaction");


class TransactionRoute {
     path = '/transaction';
     router = express.Router();
     transactionController = new TransactionController(new Transaction());

     constructor(){
          this.initializeRoutes()
     }

    initializeRoutes(){
        this.router.get(`${this.path}`,this.transactionController.getAll);  
     }
}

module.exports = TransactionRoute;
