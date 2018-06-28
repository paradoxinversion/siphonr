import React from "react";

const TweetText = (props) => {
  let text = props.tweet.full_text.replace(/\n/g, "<br>");
  if (props.tweet.urlData && props.tweet.urlData.length > 0){
    props.tweet.urlData.forEach((url) => {
      const Regex = new RegExp(`${url.miniUrl}`);
      text.replace(Regex, url.expandedUrl);
      console.log(text);
    });
  }

  
  return( 
    <div className="tweet-text" dangerouslySetInnerHTML={{__html:text}} />
  );
};

export default TweetText;