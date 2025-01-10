const express = require("express");
const PortfolioController = require("../controllers/portfolio");
const Portfolio = require("../repositories/portfolio");
const {createValidator} = require("../validators/portfolio_validator");
const  {authMiddleWare} = require("../middlewares/auth.middleware")

class PortfolioRoute {
     path = '/portfolio';
     router = express.Router();
     portfolioController = new PortfolioController(new Portfolio());

     constructor(){
          this.initializeRoutes()
     }

    initializeRoutes(){
        this.router.post(`${this.path}/create`,createValidator,authMiddleWare,this.portfolioController.create);
     }
}

module.exports = PortfolioRoute;
