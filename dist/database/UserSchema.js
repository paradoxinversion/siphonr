"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
  displayName: String,
  twitterProvider: {
    type: {
      id: String,
      token: String
    }
  }
});

UserSchema.statics.upsertTwitterUser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, tokenSecret, profile, cb) {
    var twitterProvider, that, existingUser, newUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            twitterProvider = {
              id: profile.id,
              token: token,
              tokenSecret: tokenSecret
            };
            that = this;
            _context.next = 5;
            return this.findOneAndUpdate({ "twitterProvider.id": profile.id }, twitterProvider, {
              upsert: true
            });

          case 5:
            existingUser = _context.sent;

            if (existingUser) {
              _context.next = 13;
              break;
            }

            newUser = new that({
              displayName: profile.displayName,
              twitterProvider: {
                id: profile.id,
                token: token,
                tokenSecret: tokenSecret
              }
            });
            _context.next = 10;
            return newUser.save();

          case 10:
            return _context.abrupt("return", cb(null, newUser));

          case 13:
            _context.next = 15;
            return existingUser.save();

          case 15:
            return _context.abrupt("return", cb(null, existingUser));

          case 16:
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);
            return _context.abrupt("return", cb(_context.t0, false));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = UserSchema;