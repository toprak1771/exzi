const ControllerMain = require("./controller_main");
const { validationResult } = require("express-validator");
const { ErrorHandler, validationErrors } = require("../utils/errorhandler");


class AuthController extends ControllerMain {
  _authRepository;
  constructor(authRepository){
    super();
    this._authRepository = authRepository
  }
  
  create = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.errors && errors.errors.length > 0) {
        await validationErrors(errors);
        return;
      }

      const user = await this._authRepository.register(req.body);
      res.status(201).json({
        message:'User created.',
        user
      })
    } catch (error) {
      next(new ErrorHandler(error?.status, error.message));
      return;
    }
  };

  login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (errors.errors && errors.errors.length > 0) {
        await validationErrors(errors);
        return;
      }

      const {token,findUser} = await this._authRepository.login(req.body);
      res.status(200).json({
        message:'User login succesfully.',
        user:findUser,
        token
      })
    } catch (error) {
      next(new ErrorHandler(error?.status, error.message));
      return;
    }
  };

  getAll = async (req,res,next) => {
    try {
      const getAllUsers = await this._authRepository.getAll();
      res.status(200).json({
        message:'User get all succesfully for analythics.',
        getAllUsers,
      })
    } catch (error) {
      next(new ErrorHandler(error?.status, error.message));
      return;
    }
  } 

  
}

module.exports = AuthController;
