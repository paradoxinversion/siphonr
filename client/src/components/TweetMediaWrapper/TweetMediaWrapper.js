import React from "react";
import TweetMedia from "../TweetMedia/TweetMedia";
const TweetMediaWrapper = (props) => {

  let mediaElement;
  if (props.media){
    const mediaItems = props.media.map((mediaObject, index) =>
      <TweetMedia key={index} mediaObject={mediaObject} />
    );
    mediaElement = (
      <div className="tweet-media-container">
        {mediaItems}
      </div>
    );
    return mediaElement;
  }
  return null;
};

export default TweetMediaWrapper;