"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = require("winston");

var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));

var printf = _winston.format.printf,
    timestamp = _winston.format.timestamp,
    combine = _winston.format.combine;
var myFormat = printf(function (info) {
  return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(JSON.stringify(info.message));
});
var transport = new _winstonDailyRotateFile["default"]({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  // zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});
var logger = (0, _winston.createLogger)({
  format: combine(timestamp(), myFormat),
  transports: [transport, new _winston.transports.Console()]
});
exports.logger = logger;