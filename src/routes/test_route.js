const express = require("express");
const testController = require("../controllers/test_controller");
const testService = require("../services/test_services");
const  {authMiddleWare} = require("../middlewares/auth.middleware")

class TestRoute {
     path = '/test';
     router = express.Router();
     _testController = new testController(new testService());

     constructor(){
          this.initializeRoutes()
     }

    initializeRoutes(){
        this.router.get(`${this.path}`,authMiddleWare,this._testController.getDataController);
     }
}

module.exports = TestRoute;
