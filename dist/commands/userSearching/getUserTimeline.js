"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Twitter = require("twitter");
var twitterConfig = require("../../config/config.js").getConfig().twitter;

//
/**
* Takes a screen name and returns 20 (or more) tweets in the timeline
* @param {string} token the user's authentication token from twitter
* @param {string} secet the user's authentication secret from twitter
* @param {string} screenName the screen name of the user to search
* @param {number} count the amount of tweets to retrives
* @param {string} from the tweet to begin retrieving from, if not the beginning of the timeline
* @param {number} maxRuns the max amount of times to attempt to get more data
* @returns An object with information about and links to the media in the tweet
**/
var getUserTimeline = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, secret, screenName, count) {
    var from = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    var maxRuns = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 15;
    var twitterResult, config, client, collectedTweets, tweetProgress, newTweets;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            count = count === undefined ? 20 : count;
            twitterResult = void 0;
            _context.prev = 2;
            config = {
              consumer_key: twitterConfig.consumer_key,
              consumer_secret: twitterConfig.consumer_secret,
              access_token_key: token,
              access_token_secret: secret,
              callbackURL: twitterConfig.callbackURL
            };
            _context.next = 6;
            return new Twitter(config);

          case 6:
            client = _context.sent;

            if (!(count === undefined || count <= 200)) {
              _context.next = 20;
              break;
            }

            _context.prev = 8;
            _context.next = 11;
            return client.get("statuses/user_timeline", {
              screen_name: screenName,
              count: count,
              include_rts: true,
              tweet_mode: 'extended'
            });

          case 11:
            twitterResult = _context.sent;
            return _context.abrupt("return", twitterResult);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            throw _context.t0;

          case 18:
            _context.next = 46;
            break;

          case 20:
            _context.prev = 20;
            collectedTweets = [];
            tweetProgress = {
              tweetsProcessed: 0,
              processTimes: 0,
              last_id: from,
              done: false
            };

          case 23:
            if (!(tweetProgress.tweetsProcessed < count)) {
              _context.next = 39;
              break;
            }

            _context.next = 26;
            return client.get("statuses/user_timeline", {
              screen_name: screenName,
              count: 200,
              include_rts: true,
              tweet_mode: 'extended',
              max_id: tweetProgress.last_id
            });

          case 26:
            newTweets = _context.sent;

            collectedTweets = collectedTweets.concat(newTweets);
            tweetProgress.tweetsProcessed = collectedTweets.length;
            tweetProgress.processTimes++;

            if (!(newTweets[newTweets.length - 1].id_str === tweetProgress.last_id)) {
              _context.next = 33;
              break;
            }

            twitterResult = collectedTweets;
            return _context.abrupt("break", 39);

          case 33:
            tweetProgress.last_id = newTweets[newTweets.length - 1].id_str;
            twitterResult = collectedTweets;

            if (!(tweetProgress.processTimes === maxRuns)) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("break", 39);

          case 37:
            _context.next = 23;
            break;

          case 39:
            return _context.abrupt("return", twitterResult);

          case 42:
            _context.prev = 42;
            _context.t1 = _context["catch"](20);

            console.error("Error getting timeline::", _context.t1);
            throw _context.t1;

          case 46:
            _context.next = 52;
            break;

          case 48:
            _context.prev = 48;
            _context.t2 = _context["catch"](2);

            console.error("Error getting timeline::", _context.t2);
            throw _context.t2;

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 48], [8, 15], [20, 42]]);
  }));

  return function getUserTimeline(_x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getUserTimeline;