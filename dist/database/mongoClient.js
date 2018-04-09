"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startClient = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var startClient = exports.startClient = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var mongooseOptions, config;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongooseOptions = {};

            _mongoose2.default.Promise = global.Promise;
            _context.prev = 2;

            if (!(process.env.NODE_ENV === "development")) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return _mongoose2.default.connect("mongodb://localhost/siphonr-users", mongooseOptions);

          case 6:
            _context.next = 12;
            break;

          case 8:
            config = require("../config/config.js").getConfig();
            // await mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.url}:${config.db.port}/${config.db.database}`, mongooseOptions);

            console.log("URL:::::::", config.url);
            _context.next = 12;
            return _mongoose2.default.connect(config.url, mongooseOptions);

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);
            throw _context.t0;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 14]]);
  }));

  return function startClient() {
    return _ref.apply(this, arguments);
  };
}();