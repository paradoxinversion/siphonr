Setup
Install Dependencies

secrets.json
secrets.json hold you access tokens and secrets for the twitter API. Use the following json structure to set your authentication information.

{
  "consumer_key": "",
  "consumer_secret": "",
  "access_token_key": 	"",
  "access_token_secret": ""
}

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

commands
stream

search

favorites

timeline

post

thread
