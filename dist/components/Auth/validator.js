"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidator = void 0;

var _check = require("express-validator/check");

var _middleware = require("../../middleware");

var loginValidator = [(0, _check.body)('username').exists({
  checkFalsy: true
}), (0, _check.body)('password').custom(function (value) {
  return Boolean(value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,20}$/g));
}), _middleware.checkValidateError];
exports.loginValidator = loginValidator;