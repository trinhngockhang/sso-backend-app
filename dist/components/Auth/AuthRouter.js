"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var controller = _interopRequireWildcard(require("./AuthController"));

var _middleware = require("../../middleware");

var path = '/auth';
var router = (0, _express.Router)(); // route
// --- Login ---

router.post('/getme', (0, _middleware.throwAsNext)(controller.getme)); // registerSubrouter
// export

var _default = {
  path: path,
  router: router
};
exports["default"] = _default;