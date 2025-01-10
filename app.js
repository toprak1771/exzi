const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const TestRoute = require("./src/routes/test_route");
const {handleError} = require("./src/utils/errorhandler");
const AuthRoute = require("./src/routes/auth_route");
const PortfolioRoute = require("./src/routes/portfolio_route");
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files",express.static("public"))

app.get('/',(req,res) => {
    res.send("Hello world");
})

initializeRoutes([new TestRoute(),new AuthRoute(),new PortfolioRoute()]);

function initializeRoutes(routes) {
    routes.forEach((route) => {
        app.use('/',route.router)
    });
}

app.use((err, req, res, next) => {
    handleError(req, res, err);
  });

app.listen(port,() => {
    console.log(`Exzi app listening on port ${port}`)
})






