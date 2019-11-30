"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeInvalid = exports.sortsSql = exports.filtersSql = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

/* eslint-disable no-prototype-builtins */
var filtersSql = function filtersSql(filters) {
  var sql = '';
  if (_lodash["default"].isEmpty(filters)) return sql;

  for (var key in filters) {
    // eslint-disable-next-line no-prototype-builtins
    if (filters.hasOwnProperty(key)) {
      var element = filters[key];
      sql += " AND ".concat(key, " = ").concat(element, " ");
    }
  }

  return sql;
};

exports.filtersSql = filtersSql;

var sortsSql = function sortsSql(sorts) {
  var sql = '';
  if (_lodash["default"].isEmpty(sorts)) return sql;
  sql += ' ORDER BY ';
  var first = true;

  for (var key in sorts) {
    // eslint-disable-next-line no-prototype-builtins
    if (sorts.hasOwnProperty(key)) {
      var element = sorts[key];
      sql += first ? '' : ' , ';
      var val = element === '1' ? 'DESC' : 'ASC';
      sql += " ".concat(key, " ").concat(val, " ");
      first = false;
    }
  }

  return sql;
};

exports.sortsSql = sortsSql;

var removeInvalid = function removeInvalid(object) {
  var validElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newObj = Object.assign({}, object);

  for (var key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (!validElement.includes(key)) {
        delete newObj[key];
      }
    }
  }

  return newObj;
};

exports.removeInvalid = removeInvalid;