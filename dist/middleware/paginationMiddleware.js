"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginationMiddleware = void 0;

var _ = require('lodash');

var paginationMiddleware = function paginationMiddleware(_ref) {
  var _ref$maxSize = _ref.maxSize,
      maxSize = _ref$maxSize === void 0 ? 20 : _ref$maxSize,
      _ref$defaultSize = _ref.defaultSize,
      defaultSize = _ref$defaultSize === void 0 ? 10 : _ref$defaultSize,
      _ref$filterKeys = _ref.filterKeys,
      filterKeys = _ref$filterKeys === void 0 ? null : _ref$filterKeys,
      _ref$sortKeys = _ref.sortKeys,
      sortKeys = _ref$sortKeys === void 0 ? null : _ref$sortKeys;
  return function (req, res, next) {
    var limit = Math.min(Math.max(1, _.get(req, 'query.size', defaultSize)), maxSize);
    var page = Math.max(1, _.get(req, 'query.page', 1));
    var offset = limit * (page - 1); // condition and sort (sequelize)

    var _filters = req.query.filters || {};

    var _sorts = req.query.sorts || {};

    var filters = filterKeys ? _.pick(_filters, filterKeys) : _filters;
    var sorts = sortKeys ? _.pickBy(_sorts, function (v, k) {
      return sortKeys.includes(k) && !isNaN(v);
    }) : _.pickBy(_sorts, function (v) {
      return !isNaN(v);
    }); // normalize sorts

    req.pagination = {
      page: page,
      offset: offset,
      limit: limit,
      filters: filters,
      sorts: _.mapValues(sorts, function (v) {
        return Number(v);
      }),
      keyword: req.query._keyword
    };
    next();
  };
};

exports.paginationMiddleware = paginationMiddleware;