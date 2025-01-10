const ControllerMain = require("./controller_main");
const { validationResult } = require("express-validator");
const { ErrorHandler, validationErrors } = require("../utils/errorhandler");

class PortfolioController extends ControllerMain {
  _portfolioRepository;
  constructor(portfolioRepository) {
    super();
    this._portfolioRepository = portfolioRepository;
  }

  create = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.errors && errors.errors.length > 0) {
        await validationErrors(errors);
        return;
      }
      
      req.body.total_account = Number(req.user.total_account);
      const createdPortfolio = await this._portfolioRepository.create(req.body,req.user.id);
      res.status(200).json({
        message:'Created portfolio.',
        createdPortfolio
      })
    } catch (error) {
      next(new ErrorHandler(error?.status, error.message));
      return;
    }
  };

}

module.exports = PortfolioController;
