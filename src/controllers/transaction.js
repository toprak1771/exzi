const ControllerMain = require("./controller_main");
const { validationResult } = require("express-validator");
const { ErrorHandler, validationErrors } = require("../utils/errorhandler");


class TransactionController extends ControllerMain {
    _transactionRepository;
    constructor(transactionRepository){
        super();
        this._transactionRepository = transactionRepository
    }

     getAll = async (req, res, next) => {
        try {
            const transactionData = await this._transactionRepository.getAll();
            res.status(200).json({
                message:'Get All transaction data successfully.',
                transactionData
              })
        } catch (error) {
            next(new ErrorHandler(error?.status, error.message));
            return;
        }
     }
}

module.exports = TransactionController;