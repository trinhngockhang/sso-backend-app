"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = exports.hash = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var hash = function hash(text) {
  return _bcrypt["default"].hashSync(text, _bcrypt["default"].genSaltSync(12));
};

exports.hash = hash;

var compare = function compare(text, encrypted) {
  return new Promise(function (resolve, reject) {
    _bcrypt["default"].compare(text, encrypted, function (err, result) {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

exports.compare = compare;