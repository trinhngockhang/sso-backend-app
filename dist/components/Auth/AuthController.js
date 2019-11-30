"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getme = exports.login = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var common = _interopRequireWildcard(require("./common"));

var dbAccess = _interopRequireWildcard(require("./AuthDAL"));

var _constant = require("../../constant");

var _request = _interopRequireDefault(require("request"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var securityUtil = _interopRequireWildcard(require("../../util/securityUtil"));

/* eslint-disable no-unused-vars */
var SSO_SECRET = 'khanghocgioi';

var login =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, password, user, passwordValid, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, password = _req$body.password;
            _context.next = 3;
            return dbAccess.getUserByUsername(username);

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 14;
              break;
            }

            _context.next = 7;
            return common.checkPassword(password, user.passwordHash);

          case 7:
            passwordValid = _context.sent;

            if (!passwordValid) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return common.generateToken(user.id);

          case 11:
            token = _context.sent;
            return _context.abrupt("return", res.json({
              token: token
            }));

          case 13:
            return _context.abrupt("return", Promise.reject(_constant.ERRORS.INVALID_PASSWORD_ERROR));

          case 14:
            return _context.abrupt("return", Promise.reject(_constant.ERRORS.USER_NOTFOUND_ERROR));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.login = login;

var getme =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, appId, token, _ref3, sessionId, tokenEncrypt, tokenVerified, body, contentLength, options;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, appId = _req$body2.appId, token = _req$body2.token;
            console.log('appId', appId);
            console.log({
              token: token
            });
            _context2.next = 5;
            return jwt.verify(token, SSO_SECRET);

          case 5:
            _ref3 = _context2.sent;
            sessionId = _ref3.sessionId;

            if (!sessionId) {
              _context2.next = 16;
              break;
            }

            tokenEncrypt = securityUtil.createToken(_constant.EXPIRE_IN, 'sso authorize', _constant.PRIVATE_KEY);
            console.log('token bi ma hoa:', tokenEncrypt);
            tokenVerified = jwt.sign({
              tokenEncrypt: tokenEncrypt
            }, _constant.APP_SECRET);
            console.log('token verify:', tokenVerified); // ma hoa token bang private key,appId roi gui trong authorization

            body = JSON.stringify({
              authToken: token
            });
            contentLength = body.length;
            options = {
              baseUrl: 'http://52.187.21.233:3001',
              headers: {
                'Content-Length': contentLength,
                authorization: "SuperId ".concat(tokenVerified),
                'Content-Type': 'application/json'
              },
              body: body
            };
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              _request["default"].post('/authorization/exchange-data', options, function (err, response, body) {
                if (err) {
                  console.log(err);
                  return reject(err);
                }

                var data = JSON.parse(body);
                var verify = securityUtil.verify(data.token, _constant.SSO_PUBLIC_KEY);

                if (verify) {
                  var doc = securityUtil.decrypt(data.dataEncrypted, _constant.APP_SECRET);
                  var user = JSON.parse(doc);
                  console.log(user);

                  var _token = jwt.sign(user.id, SSO_SECRET);

                  console.log({
                    token: _token,
                    name: user['basic.username']
                  });
                  res.send({
                    token: _token,
                    name: user['basic.username']
                  });
                }
              });
            }));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getme(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getme = getme;