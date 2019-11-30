"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _AuthRouter = _interopRequireDefault(require("./Auth/AuthRouter"));

var _DefaultRouter = _interopRequireDefault(require("./Default/DefaultRouter"));

var _default = [_AuthRouter["default"], _DefaultRouter["default"]];
exports["default"] = _default;