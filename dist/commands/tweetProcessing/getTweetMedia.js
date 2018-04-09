"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Gets extended media information from a tweet.
* @param {object} tweet
* @returns An object with information about and links to the media in the tweet
**/
var getTweetMedia = function getTweetMedia(tweet) {
  var tweetMediaResult = [];
  if (tweet.extended_entities) {
    if (tweet.extended_entities.media) {
      tweet.extended_entities.media.forEach(function (media) {
        if (media.type === "video") {
          var tweetVideo = {
            type: "video",
            duration_millis: media.duration_millis,
            variants: [],
            monetizable: false
          };

          media.video_info.variants.forEach(function (videoVariant) {
            if (videoVariant.content_type === "video/mp4") {
              tweetVideo.variants.push(videoVariant);
            }
          });
          if (media.additonal_media_info) {
            tweetMediaResult.monetizable = media.additional_media_info.monetizable;
          }
          tweetMediaResult.push(tweetVideo);
        } else if (media.type === "photo") {
          var tweetPhoto = {
            type: "photo",
            media_url_https: media.media_url_https
          };
          tweetMediaResult.push(tweetPhoto);
        } else if (media.type == "animated_gif") {

          media.video_info.variants.forEach(function (videoVariant) {
            var tweetGif = {
              type: "gif"
            };
            if (videoVariant.content_type === "video/mp4") {
              tweetGif.url = videoVariant.url;
            }
            tweetMediaResult.push(tweetGif);
          });
        }
      });
    }
  }
  return tweetMediaResult;
};

exports.default = getTweetMedia;