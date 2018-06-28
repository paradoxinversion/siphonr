import React from "react";
import PropTypes from "prop-types";
import Tweet from "../Tweet/Tweet";
import filterTweetsByWord from "../../utilityFunctions/filterTweetsByWord";
import "./TweetList.css";

class TweetList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweets: props.tweets,
      showList: false
    };
    this.toggleList = this.toggleList.bind(this);
  }

  renderTweets(){
    if (this.props.tweets.length === 0){
      return <p> There are no tweets to return </p>;
    } else{
      const processedIds = [];
      const tweets = this.props.tweets.map((tweet) => {
        if (!processedIds.includes(tweet.id_str)){
          processedIds.push(tweet.id_str);
          return <Tweet key={tweet.id_str} tweet={tweet} user={this.props.user}/>;
        }

      });
      return (
        <div className="tweetlist tab-content">
          {tweets}
        </div>
      );
    }
  }

  toggleList(){
    this.setState({
      showList: !this.state.showList
    });
  }
  render(){
    if (this.props.tweets){
      return (
        <div className="tweetlist-container tab">
          <input className="tab__hidden-radio" id={this.props.id} type="radio" name="tabs"/>
          <label className="tab__header-label" htmlFor={this.props.id}>{this.props.heading}</label>
          {this.renderTweets()}
        </div>
      );
    } else {
      return null;
    }

  }

}

TweetList.propTypes = {
  heading: PropTypes.string.isRequired,
  tweets: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};

export default TweetList;
