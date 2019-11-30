"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = exports.throwAsNext = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logUtil = require("../util/logUtil");

var throwAsNext = function throwAsNext(f) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res, next) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return f(req, res, next);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                next(_context.t0);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}; // eslint-disable-next-line no-unused-vars


exports.throwAsNext = throwAsNext;

var errorHandler = function errorHandler(error, req, res, next) {
  if (typeof error === 'string') {
    res.status(500).json({
      message: error
    });

    _logUtil.logger.error(error);
  } else {
    res.status(error.status || 500).json(error);

    _logUtil.logger.error((0, _objectSpread2["default"])({}, error));
  }
};

exports.errorHandler = errorHandler;