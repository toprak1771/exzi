const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {handleError} = require("./src/utils/errorhandler");
const AuthRoute = require("./src/routes/auth_route");
const TransactionRoute = require("./src/routes/transaction_route");
const PortfolioRoute = require("./src/routes/portfolio_route");
require("./src/controllers/simulator");
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/files",express.static("public"))

app.get('/',(req,res) => {
    res.send("Hello world");
})

initializeRoutes([new AuthRoute(),new PortfolioRoute(),new TransactionRoute()]);

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






