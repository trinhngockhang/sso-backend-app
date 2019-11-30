"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPassword = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var jwtUtil = _interopRequireWildcard(require("../../util/jwtUtil"));

var bcryptUtil = _interopRequireWildcard(require("../../util/bcryptUtil"));

var _constant = require("../../constant");

var generateToken = function generateToken(id) {
  return jwtUtil.generateToken({
    id: id
  }, {
    expiresIn: _constant.TOKEN.TOKEN_EXPIRED
  });
};

exports.generateToken = generateToken;

var checkPassword =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(password, passwordHash) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", bcryptUtil.compare(password, passwordHash));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkPassword = checkPassword;