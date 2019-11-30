"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var path = '';
var router = (0, _express.Router)(); // route

router.get('/healthcheck', function (req, res) {
  res.send('ok');
});
router.use(function (req, res, next) {
  next(_httpErrors["default"].BadRequest('Request invalid!'));
}); // registerSubrouter
// export

var _default = {
  path: path,
  router: router
};
exports["default"] = _default;