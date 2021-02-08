const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validations');
const { authController } = require('../controllers');

const router = express.Router();

router.post(
  '/signup',
  validate(authValidation.register),
  authController.register,
);

router.post('/signin', validate(authValidation.login), authController.login);
module.exports = router;
