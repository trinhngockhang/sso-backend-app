"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAndCount = exports.group = exports.nested = exports.execute = exports.queryOne = exports.query = exports.commitTransaction = exports.rollbackTransaction = exports.beginTransaction = exports.getConnection = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mysql = _interopRequireDefault(require("mysql"));

var _lodash = _interopRequireDefault(require("lodash"));

var _config = _interopRequireDefault(require("../config"));

var pool = _mysql["default"].createPool(_config["default"].databaseUrl);
/**
 * Get Connecttion
 */


var getConnection =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              pool.getConnection(function (err, connection) {
                if (err) {
                  return reject(err);
                }

                return resolve(connection);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getConnection() {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Begin Transaction
 */


exports.getConnection = getConnection;

var beginTransaction =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var connection;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getConnection();

          case 2:
            connection = _context2.sent;
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              connection.beginTransaction(function (err) {
                if (err) {
                  connection.release();
                  return reject(err);
                }

                return resolve(connection);
              });
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function beginTransaction() {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Rollback Transaction
 */


exports.beginTransaction = beginTransaction;

var rollbackTransaction =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(transaction) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              transaction.rollback(function (err) {
                transaction.release();

                if (err) {
                  return reject(err);
                }

                return resolve();
              });
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function rollbackTransaction(_x) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Commit Transaction
 */


exports.rollbackTransaction = rollbackTransaction;

var commitTransaction =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5(transaction) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              transaction.commit(
              /*#__PURE__*/
              function () {
                var _ref5 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee4(errCommit) {
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!errCommit) {
                            _context4.next = 10;
                            break;
                          }

                          _context4.prev = 1;
                          _context4.next = 4;
                          return rollbackTransaction(transaction);

                        case 4:
                          _context4.next = 9;
                          break;

                        case 6:
                          _context4.prev = 6;
                          _context4.t0 = _context4["catch"](1);
                          return _context4.abrupt("return", reject(Object.assign(errCommit, {
                            errorRollback: _context4.t0
                          })));

                        case 9:
                          return _context4.abrupt("return", reject(errCommit));

                        case 10:
                          transaction.release();
                          return _context4.abrupt("return", resolve());

                        case 12:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4, null, [[1, 6]]);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }());
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function commitTransaction(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} sql
 * @param {array} params
 */


exports.commitTransaction = commitTransaction;

var query =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(sql, params) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log('----------------------------');
            console.log('sql', _mysql["default"].format(sql, params));
            console.log('----------------------------');
            return _context6.abrupt("return", new Promise(function (resolve, reject) {
              pool.query(sql, params, function (error, results) {
                if (error) {
                  return reject(error);
                }

                return resolve(results);
              });
            }));

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function query(_x4, _x5) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} sql
 * @param {array} params
 */


exports.query = query;

var queryOne =
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7(sql, params) {
    var results;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return query(sql, params);

          case 2:
            results = _context7.sent;
            return _context7.abrupt("return", results[0]);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function queryOne(_x6, _x7) {
    return _ref7.apply(this, arguments);
  };
}();
/**
 *
 * @param {string} sql
 * @param {array} params
 */


exports.queryOne = queryOne;

var execute =
/*#__PURE__*/
function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8(sql, params, transaction) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('----------------------------');
            console.log('sql', _mysql["default"].format(sql, params));
            console.log('----------------------------');
            return _context8.abrupt("return", new Promise(function (resolve, reject) {
              if (!transaction) {
                pool.query(sql, params, function (error, results) {
                  if (error) {
                    return reject(error);
                  }

                  return resolve(results);
                });
              } else {
                transaction.query(sql, params, function (error, results) {
                  if (error) {
                    return reject(error);
                  }

                  return resolve(results);
                });
              }
            }));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function execute(_x8, _x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

exports.execute = execute;

var nested = function nested(obj) {
  if (!obj) {
    return null;
  }

  var keys = Object.keys(obj);
  return keys.reduce(function (result, path) {
    return _lodash["default"].set(result, path, obj[path]);
  }, {});
};

exports.nested = nested;

var group = function group(array, primaryKey, key) {
  var result = [];
  var primaryKeys = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var item1 = item[key];
      var indexOf = primaryKeys.indexOf(item[primaryKey]);

      if (indexOf !== -1) {
        result[indexOf][key].push(item1);
      } else {
        var newItem = {};
        newItem[key] = [item1];
        primaryKeys.push(item[primaryKey]);
        result.push(Object.assign(item, newItem));
      }
    }
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

  return result;
};

exports.group = group;

var queryAndCount =
/*#__PURE__*/
function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9(sql, params) {
    var keyCount,
        results,
        count,
        items,
        _args9 = arguments;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            keyCount = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : 'count';
            _context9.next = 3;
            return query(sql, params);

          case 3:
            results = _context9.sent;

            if (!(results.length === 0)) {
              _context9.next = 6;
              break;
            }

            return _context9.abrupt("return", [[], 0]);

          case 6:
            count = results[0][keyCount];
            items = results.map(function (element) {
              Reflect.deleteProperty(element, keyCount);
              return element;
            });
            return _context9.abrupt("return", [items, count]);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function queryAndCount(_x11, _x12) {
    return _ref9.apply(this, arguments);
  };
}();

exports.queryAndCount = queryAndCount;