const express = require("express");
const AuthController = require("../controllers/auth");
const Auth = require("../repositories/auth");
const {createValidator,loginValidator} = require("../validators/auth_validator");

class AuthRoute {
     path = '/auth';
     router = express.Router();
     authController = new AuthController(new Auth());

     constructor(){
          this.initializeRoutes()
     }

    initializeRoutes(){
        this.router.get(`${this.path}/analytics`,this.authController.getAll);
        this.router.post(`${this.path}/register`,createValidator,this.authController.create);
        this.router.post(`${this.path}/login`,loginValidator,this.authController.login);
     }
}

module.exports = AuthRoute;
