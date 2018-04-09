"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getTweetUrlData = function getTweetUrlData(tweet) {
    try {
        if (tweet.entities.urls.length > 0) {
            var urls = tweet.entities.urls.map(function (urlEntry) {
                var entry = {
                    expandedUrl: urlEntry.expanded_url,
                    miniUrl: urlEntry.url,
                    urlTextIndices: urlEntry.indices
                };
                return entry;
            });
            return urls;
        } else {
            return [];
        }
    } catch (e) {
        var error = new Error(e.message);
        console.log();
        return error;
    }
};

exports.default = getTweetUrlData;