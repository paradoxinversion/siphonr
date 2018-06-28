import React from "react";
import PropTypes from "prop-types";
import TweetMedia from "../TweetMedia/TweetMedia";
import TweetText from "../TweetText/TweetText";
import TweetMediaWrapper from "../TweetMediaWrapper/TweetMediaWrapper";
import "./Tweet.css";

class Tweet extends React.Component {

  renderReply(){
    if (this.props.tweet.in_reply_to_user_id_str != null){
      return (
        <div className="reply-info-wrapper">
          <p> In reply to <a target="_blank" href={`https://twitter.com/intent/user?user_id=${this.props.tweet.in_reply_to_user_id_str}`}>{this.props.tweet.in_reply_to_screen_name}.</a> </p>
        </div>
      );
    }
    return null;
  }

  renderMedia(){
    let mediaElement;
    if (this.props.tweet.media){
      const mediaItems = this.props.tweet.media.map((mediaObject, index) =>
        <TweetMedia key={index} mediaObject={mediaObject} />
      );
      mediaElement = (
        <div className="tweet-media-container">
          {mediaItems}
        </div>
      );
    }
    return mediaElement;
  }

  renderTweetText(fullText){
    return <div className="tweet-text" dangerouslySetInnerHTML={{__html:fullText}} />;
  }

  renderMetadata(){
    return (
      <div className="tweet-metadata">
        <a
          className="tweet-thread"
          target="_blank"
          href={`https://twitter.com/statuses/${this.props.tweet.id_str}`}>Thread</a>
        <p className="tweet-post-timestamp"> Posted {this.props.tweet.created_at} </p>
      </div>
    );
  }

  renderTweet(){
    let retweetElement;
    if(this.props.tweet.quote_retweet){
      if (this.props.tweet.quote_retweet.retweet){
        retweetElement = (
          <div className="retweet">
            {this.renderReply()}
            <TweetText tweet={this.props.tweet.quote_retweet.retweet} />
            <TweetMediaWrapper media={this.props.tweet.quote_retweet.media} />
            {/* {this.renderMetadata()} */}
          </div>
        );
      } else if (this.props.tweet.quote_retweet.quote){
        retweetElement = (
          <div className="retweet">
            {this.renderReply()}
            <TweetText tweet={this.props.tweet.quote_retweet.quote} />
            <TweetMediaWrapper media={this.props.tweet.quote_retweet.media} />
            {/* {this.renderMetadata()} */}
          </div>
        );
      }
    }

    return (
      <div className="tweet">
        {this.renderReply()}
        {
          // retweetElement ?
          // <p className="tweet__retweeted-string">{this.props.user.name} Retweeted </p> :
          // <TweetText text={this.props.tweet.full_text} />        
          retweetElement ?
          <div>
            <p className="tweet__retweeted-string">{this.props.user.name} Retweeted </p>
            <TweetText tweet={this.props.tweet} />      
          </div>
           :
          <TweetText tweet={this.props.tweet} />        
        }

        <TweetMediaWrapper media={this.props.tweet.media} />
        {retweetElement}
        {this.renderMetadata()}
      </div>
    );

  }
  render(){
    return (
      <div className="tweet-wrapper">
        {
          this.props.tweet && this.props.user ?
          this.renderTweet() :
          <p>Waiting for props</p>
        }

      </div>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
