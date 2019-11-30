"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requireLogin = exports.authMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var jwtUtil = _interopRequireWildcard(require("../util/jwtUtil"));

var _logUtil = require("../util/logUtil");

var _constant = require("../constant");

var authMiddleware =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var authorization, token, tokenDecoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req.isLogged = false;
            authorization = req.headers.authorization;

            if (!(authorization && authorization.match(/^Bearer /g))) {
              _context.next = 17;
              break;
            }

            token = authorization.split(' ')[1];

            if (!token) {
              _context.next = 17;
              break;
            }

            _context.prev = 5;
            _context.next = 8;
            return jwtUtil.verifyToken(token);

          case 8:
            tokenDecoded = _context.sent;
            req.isLogged = true;
            req.userId = tokenDecoded.id;
            req.token = token;
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);

            _logUtil.logger.error(_context.t0);

          case 17:
            next();

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 14]]);
  }));

  return function authMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.authMiddleware = authMiddleware;

var requireLogin =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (req.isLogged) {
              next();
            } else {
              next(_constant.ERRORS.UNAUTHORIZED_ERROR);
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function requireLogin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.requireLogin = requireLogin;