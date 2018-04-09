"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserTimeline = require("../commands/userSearching/getUserTimeline");

var _getUserTimeline2 = _interopRequireDefault(_getUserTimeline);

var _processTweetArray = require("../commands/tweetProcessing/processTweetArray");

var _processTweetArray2 = _interopRequireDefault(_processTweetArray);

var _getTweetAuthor = require("../commands/tweetProcessing/getTweetAuthor");

var _getTweetAuthor2 = _interopRequireDefault(_getTweetAuthor);

var _packageResponse = require("../commands/tweetProcessing/packageResponse");

var _packageResponse2 = _interopRequireDefault(_packageResponse);

var _getMostCommonHashTags = require("../commands/tweetProcessing/getMostCommonHashTags");

var _getMostCommonHashTags2 = _interopRequireDefault(_getMostCommonHashTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var search = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var rawTimeLine, processedTimeline, user, mostCommonHashtags, packagedResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!req.query.user) {
              _context.next = 14;
              break;
            }

            _context.next = 4;
            return (0, _getUserTimeline2.default)(req.query.oauth_token, req.query.oauth_token_secret, req.query.user, req.query.count);

          case 4:
            rawTimeLine = _context.sent;
            processedTimeline = (0, _processTweetArray2.default)(rawTimeLine);
            user = (0, _getTweetAuthor2.default)(rawTimeLine[0]);
            mostCommonHashtags = (0, _getMostCommonHashTags2.default)(rawTimeLine);
            packagedResponse = (0, _packageResponse2.default)(user, processedTimeline, mostCommonHashtags);

            console.log(packagedResponse.processedTweets[10]);
            _context.next = 12;
            return res.json(packagedResponse);

          case 12:
            _context.next = 15;
            break;

          case 14:
            res.send("No username was received.");

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);

            console.log("Error in Search::", _context.t0);
            throw _context.t0;

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 17]]);
  }));

  return function search(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = search;