import React from "react";
import PropTypes from "prop-types";
import "./TweetMedia.css";

const TweetMedia = (props) => {
  let mediaElement;
  if (props.mediaObject.type === "photo"){
    mediaElement = <img className="tweet-media-img" src={props.mediaObject.media_url_https} alt="tweeted media"/>;
  } else if (props.mediaObject.type === "video"){
    mediaElement = (
      <video className="tweet-media-vid" controls>
        <source src={props.mediaObject.variants[0].url } type={props.mediaObject.variants[0].content_type}/>
      </video>
    );
  } else if (props.mediaObject.type === "gif"){
    // mediaElement = <img className="tweet-media-img" src={props.mediaObject.url} alt="tweeted media"/>;
    mediaElement = (
      <video className="tweet-media-vid" controls>
        <source src={props.mediaObject.url } type="video/mp4"/>
      </video>
    );
  }
  return (
    <div className="tweet-media">
      {mediaElement}
    </div>


  );
};

TweetMedia.propTypes = {
  mediaObject: PropTypes.object.isRequired
};
export default TweetMedia;
