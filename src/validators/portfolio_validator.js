const {body} = require("express-validator");


const createValidator = [
    body("portfolio", "portfolio does not Empty").not().isEmpty().isObject(),
]

module.exports = {createValidator};