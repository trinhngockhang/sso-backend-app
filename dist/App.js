"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _router = _interopRequireDefault(require("./components/router"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _middleware = require("./middleware");

var _logUtil = require("./util/logUtil");

// Middleware
// Log
var expressApp = (0, _express["default"])(); // middleware

expressApp.use((0, _morgan["default"])('combined', {
  stream: {
    write: function write(message) {
      _logUtil.logger.info(message);
    }
  }
}));
expressApp.use(_middleware.corsMiddleware);
expressApp.use(_bodyParser["default"].json({
  limit: '50mb'
}));
expressApp.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '50mb'
}));
expressApp.use(_middleware.authMiddleware);
expressApp.use(_middleware.ok); // routers

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _router["default"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var router = _step.value;
    expressApp.use(router.path, router.router);
  } // error handle

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

expressApp.use(_middleware.errorHandler); // run Express Server

expressApp.listen(_config["default"].port, function () {
  _logUtil.logger.info("App is running at http://localhost:".concat(_config["default"].port));
});