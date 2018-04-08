import getTweetText from "../../src/commands/tweetProcessing/getTweetText";
import getTweetHashtags from "../../src/commands/tweetProcessing/getTweetHashtags";
import getReplyData from "../../src/commands/tweetProcessing/getReplyData";
import getRetweetAndQuoteData from "../../src/commands/tweetProcessing/getRetweetAndQuoteData";
import getRetweetCount from "../../src/commands/tweetProcessing/getRetweetCount";
import getTopTweets from "../../src/commands/tweetProcessing/getTopTweets"
import getTweetHashtagsFromArray from "../../src/commands/tweetProcessing/getTweetHashtagsFromArray";
import getTweetMedia from "../../src/commands/tweetProcessing/getTweetMedia";
import getUserMentions from "../../src/commands/tweetProcessing/getUserMentions";
import processTweetArray from "../../src/commands/tweetProcessing/processTweetArray";
import loadLocalTweetData from "../testHelpers/loadLocalTweetData";
import chai from "chai";
const expect = chai.expect;
const tweetData = loadLocalTweetData();
describe("getTweetText", function(){
  it("returns the full text of a tweet", function(){
    expect(getTweetText(tweetData[0])).to.eql("I wrote a (very) little article on getting the ES6 import/export keywords working in @nodejs with @babeljs in about 5 minutes.\n\n#javascript #programming #webdevelopment\n\nhttps://t.co/D4rpxjBk3l");
  });
});

describe("getTweetHashtags", function(){
  it("returns all hashtags in a tweet", function(){
    expect(getTweetHashtags(tweetData[0])).to.eql(["javascript", "programming", "webdevelopment"]);
  });
  it("returns an empty array if no hashtags are present", function(){
    expect(getTweetHashtags(tweetData[2])).to.eql([]);
  });
});

describe("getReplyData", function(){
  it("returns null if there is no reply data", function(){
    expect(getReplyData(tweetData[0])).to.eql({ statusIdStr: null, userIdStr: null });
  });
  it("returns the status id and usr id replied to", function(){
    expect(getReplyData(tweetData[3])).to.eql({ statusIdStr: "975814234058698752", userIdStr: "740927705357651968" });
  });
});

describe("getRetweetAndQuoteData", function(){
  it("Returns an object with null retweet and quote if there is no retweet or quote data", function(){
    expect(getRetweetAndQuoteData(tweetData[0])).to.eql({ retweet: null, quote: null });
  });
  it("Returns '977255790489800704' when the second tweet is checked", function(){
    expect(getRetweetAndQuoteData(tweetData[1]).retweet.id_str).to.eql("977255790489800704");
  });
});

describe("getRetweetCount", function(){
  it ("returns the amount of retweets of a tweet", function(){
    expect(getRetweetCount(tweetData[1])).to.eql(5);
  });
});

describe("getTopTweets", function(){
  const topTweets = getTopTweets(tweetData);
  const topTweetsRT = getTopTweets(tweetData, true);
  it ("returns the tweets sorted by favorite", function(){
    expect(topTweets[0].favorite_count).to.be.above(topTweets[3].favorite_count);
  })
  it ("returns the tweets sorted by retweet", function(){
    expect(topTweetsRT[0].retweet_count).to.be.above(topTweetsRT[1].retweet_count);
  })
})

describe("getTweetHashtagsFromArray", function(){
  it ("returns an array of hashtags when hashtags exist", function(){
    const hashtagArray = getTweetHashtagsFromArray(tweetData);
    expect(hashtagArray.length).to.eql(11);
  })
})

describe("getTweetMedia", function(){
  it ("returns an empty array when no media is present", function(){
    const emptyMedia = getTweetMedia(tweetData[0]);
    expect(emptyMedia).to.eql([]);
  })
  it ("Returns an array with gif media", function(){
    const gif = getTweetMedia(tweetData[4]);
    expect(gif[0]).to.have.property("url");
    
  })
  it ("returns an array with phot media", function(){
    const photo = getTweetMedia(tweetData[8]);
    expect(photo[0]).to.have.property("media_url_https");
    
  })
})