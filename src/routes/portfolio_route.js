const express = require("express");
const PortfolioController = require("../controllers/portfolio");
const Portfolio = require("../repositories/portfolio");
const {createValidator,updateValidator} = require("../validators/portfolio_validator");
const  {authMiddleWare} = require("../middlewares/auth.middleware")

class PortfolioRoute {
     path = '/portfolio';
     router = express.Router();
     portfolioController = new PortfolioController(new Portfolio());

     constructor(){
          this.initializeRoutes()
     }

    initializeRoutes(){
        this.router.get(`${this.path}/getAll`,this.portfolioController.getAll);
        this.router.post(`${this.path}/create`,createValidator,authMiddleWare,this.portfolioController.create);
        this.router.put(`${this.path}/update`,updateValidator,authMiddleWare,this.portfolioController.update);
     }
}

module.exports = PortfolioRoute;
