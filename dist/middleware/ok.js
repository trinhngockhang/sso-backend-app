"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = void 0;

var ok = function ok(req, res, next) {
  res.ok = function () {
    return res.json({
      code: 200
    });
  };

  next();
};

exports.ok = ok;