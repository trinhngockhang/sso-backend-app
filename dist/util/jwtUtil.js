"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var JWT_TOKEN_SECRET = 'khangdeptraithucsu';

var generateToken = function generateToken(payload, options) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].sign(payload, JWT_TOKEN_SECRET, options || {
      noTimestamp: true
    }, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.generateToken = generateToken;

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, JWT_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

exports.verifyToken = verifyToken;