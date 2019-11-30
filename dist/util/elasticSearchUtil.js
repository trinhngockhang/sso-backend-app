"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bulk = exports.update = exports.create = exports.search = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../config"));

var _elasticsearch = require("@elastic/elasticsearch");

var _logUtil = require("./logUtil");

// class MyConnectionPool extends ConnectionPool {
//   markAlive(connection) {
//     super.markAlive(connection);
//   }
// }
// class MyConnection extends Connection {
//   request(params, callback) {
//     super.request(params, callback);
//   }
// }
var client = new _elasticsearch.Client({
  node: _config["default"].elasticSearchUrl,
  maxRetries: 3,
  requestTimeout: 30000
});

var search =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(params) {
    var _ref2, _ref2$body, took, body;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.search(params);

          case 2:
            _ref2 = _context.sent;
            _ref2$body = _ref2.body;
            took = _ref2$body.took;
            body = (0, _objectWithoutProperties2["default"])(_ref2$body, ["took"]);

            _logUtil.logger.warn({
              took: took
            });

            return _context.abrupt("return", body);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function search(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.search = search;
var create = client.create,
    update = client.update,
    bulk = client.bulk;
exports.bulk = bulk;
exports.update = update;
exports.create = create;