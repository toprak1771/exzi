const { body } = require("express-validator");

const createValidator = [
  body("name", "name does not Empty").not().isEmpty(),
  body("surname", "surname does not Empty").not().isEmpty(),
  body("email", "Invalid email").isEmail(),
  body("identity_no", "identity_no does not Empty").not().isEmpty(),
  body("total_account", "total_account must be Alphanumeric").not().isEmpty().isAlphanumeric(),
  body("percentage").optional().isNumeric().withMessage("percentage must be a numeric value"),
  body("amount").optional().isNumeric().withMessage("amount must be a numeric value"), 
  body("password", "password does not Empty").not().isEmpty(),
  body("password", "The minimum password length is 6 characters").isLength(
    { min: 6 }
  ),
];

const loginValidator = [
  body("email", "Invalid email").isEmail(), 
  body("password", "password does not Empty").not().isEmpty(),
];

module.exports = {createValidator,loginValidator};