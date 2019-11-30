"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsMiddleware = void 0;

var _cors = _interopRequireDefault(require("cors"));

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

};
var corsMiddleware = (0, _cors["default"])(corsOptions);
exports.corsMiddleware = corsMiddleware;