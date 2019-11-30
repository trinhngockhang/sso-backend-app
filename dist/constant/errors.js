"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERRORS = void 0;

var _httpErrors = _interopRequireDefault(require("http-errors"));

var ERRORS = {
  BAD_STRUCTURE: _httpErrors["default"].BadRequest('Bad Structure'),
  USER_NOTFOUND_ERROR: _httpErrors["default"].BadRequest('Không tìm thấy người dùng!'),
  UNAUTHORIZED_ERROR: _httpErrors["default"].Unauthorized('Không được cấp quyền!'),
  INVALID_PASSWORD_ERROR: _httpErrors["default"].BadRequest('Mật khẩu sai!'),
  NOTHING_CHANGED: _httpErrors["default"].BadGateway('Không có gì thay đổi')
};
exports.ERRORS = ERRORS;