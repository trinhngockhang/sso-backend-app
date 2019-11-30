"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValidateError = void 0;

var _check = require("express-validator/check");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var checkValidateError = function checkValidateError(req, res, next) {
  var errors = (0, _check.validationResult)(req);

  if (errors.isEmpty()) {
    next();
  } else {
    next((0, _httpErrors["default"])(422, 'Unprocessable Entity', {
      errors: errors.array()
    }));
  }
};

exports.checkValidateError = checkValidateError;