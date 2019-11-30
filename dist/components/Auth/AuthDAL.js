"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserByUsername = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var dbUtil = _interopRequireWildcard(require("../../util/databaseUtil"));

var getUserByUsername =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username) {
    var sql;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sql = 'SELECT id,username,passwordHash FROM admin WHERE username = ? LIMIT 1';
            return _context.abrupt("return", dbUtil.queryOne(sql, [username]));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUserByUsername(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserByUsername = getUserByUsername;