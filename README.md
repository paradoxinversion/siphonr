Siphonr is a tool for interacting with twitter-- Mainly to find, flag, and/or log information (tweets, etc) relevant to your interests.

Setup
=
Install Dependencies with npm install

Add a .env file with the following, substituting (...) with your authentication information.

TWITTER_CONSUMER_KEY="..."
TWITTER_CONSUMER_SECRET="..."
TWITTER_ACCESS_TOKEN_KEY="..."
TWITTER_ACCESS_TOKEN_SECRET="..."

Usage
-
Siphonr has X commands: stream, search, favorites, timeline, post, and thread.

Stream gets a live stream of tweets matching a search string.yb


options
count -c | Number
How many results to retrieve

noreplies -r | Bool
Whtehr or not to include replies in results

inclretweets -t : String
Whether or not to include retweets in results

username -u | String
The username to use for the query

streamfilter -s | String
the term to search for when using a stream

# Commands
## getUserTimeline(username, options, from = undefined)
Returns tweets from the timeline of the supplied username.
### Options
count: How many tweets to retrieve. If undefined, will default to 20. If more than
20,
