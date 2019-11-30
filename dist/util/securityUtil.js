"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifySuperIdExt = exports.generateKeyPair = exports.decrypt = exports.encrypt = exports.verify = exports.createToken = void 0;

var _constant = require("../constant");

var _jsrsasign = _interopRequireDefault(require("jsrsasign"));

var timestamp = _interopRequireWildcard(require("unix-timestamp"));

var CryptoJS = _interopRequireWildcard(require("crypto-js"));

var createToken = function createToken(expiresIn, payload, prvKeyHex) {
  var now = timestamp.now();
  var content = expiresIn ? {
    iat: now,
    exp: timestamp.add(now, expiresIn),
    data: payload
  } : {
    data: payload
  };
  var header = {
    alg: _constant.SECURITY.ALGO,
    typ: 'JWT'
  };
  var sHeader = JSON.stringify(header);
  var sContent = JSON.stringify(content); // create ECDSA key object with Hex input

  var prvKey = new _jsrsasign["default"].KJUR.crypto.ECDSA({
    curve: _constant.SECURITY.CURVE
  });
  prvKey.setPrivateKeyHex(prvKeyHex);
  prvKey.isPrivate = true;
  prvKey.isPublic = false; // sometimes for some reason the errors below occur randomly, so try a few times before giving up
  // unknown ECDSA sig r length error
  // unknown ECDSA sig s length error

  var token;

  for (var i = 0; i < 5; i += 1) {
    try {
      token = _jsrsasign["default"].jws.JWS.sign(null, sHeader, sContent, prvKey);
      break;
    } catch (error) {
      if (i === 4) {
        var customError = new Error(error);
        customError.attempts = i;
        throw customError;
      }
    }
  }

  return token;
};

exports.createToken = createToken;

var verify = function verify(token, pubhex) {
  // verify JWT
  var options = {
    alg: [_constant.SECURITY.ALGO]
  };
  var pubKey = new _jsrsasign["default"].KJUR.crypto.ECDSA({
    curve: _constant.SECURITY.CURVE
  });
  pubKey.setPublicKeyHex(pubhex);
  pubKey.isPrivate = false;
  pubKey.isPublic = true;
  return _jsrsasign["default"].jws.JWS.verify(token, pubKey, options);
};

exports.verify = verify;

var encrypt = function encrypt(msg, key) {
  // convert to word array so AES treats this as a key and not a passphrase
  var bytesKey = CryptoJS.enc.Hex.parse(key);
  var iv = CryptoJS.lib.WordArray.random(128 / 8); // The default output format is CryptoJS.format.OpenSSL,
  // but this only transports the salt.

  var encrypted = CryptoJS.AES.encrypt(msg, bytesKey, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  }); // append iv - 32 bytes in hex

  var cipherText = '';
  cipherText += iv.toString() + encrypted.toString();
  return cipherText;
};

exports.encrypt = encrypt;

var decrypt = function decrypt(txMessage, key) {
  var ivStart = 0;
  var msgStart = 32; // convert to word array so aes treats this as a key and not a passphrase

  var bytesKey = CryptoJS.enc.Hex.parse(key);
  var iv = CryptoJS.enc.Hex.parse(txMessage.substr(ivStart, msgStart));
  var encrypted = txMessage.substring(msgStart);
  var decrypted = CryptoJS.AES.decrypt(encrypted, bytesKey, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

exports.decrypt = decrypt;

var generateKeyPair = function generateKeyPair() {
  var prvKey = new _jsrsasign["default"].KJUR.crypto.ECDSA({
    curve: _constant.SECURITY.CURVE
  });
  prvKey.isPrivate = true;
  prvKey.isPublic = false;

  var _prvKey$generateKeyPa = prvKey.generateKeyPairHex(),
      privateKey = _prvKey$generateKeyPa.ecprvhex,
      publicKey = _prvKey$generateKeyPa.ecpubhex;

  return {
    privateKey: privateKey,
    publicKey: publicKey
  };
};

exports.generateKeyPair = generateKeyPair;

var verifySuperIdExt = function verifySuperIdExt(body, ext, clientAccessSecret) {
  var bodyStr = JSON.stringify(body);
  var hmacBuffer = CryptoJS.HmacSHA256(bodyStr, clientAccessSecret);
  return ext === CryptoJS.enc.Base64.stringify(hmacBuffer);
};

exports.verifySuperIdExt = verifySuperIdExt;