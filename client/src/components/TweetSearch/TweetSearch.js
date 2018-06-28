import React from "react";
import Tweet from "../Tweet/Tweet";
import filterTweetsByWord from "../../utilityFunctions/filterTweetsByWord";
class TweetSearch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "searchQuery": ""
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearchInputChange(event){
    const target = event.target;
    this.setState({
      [target.name]:target.value
    });
  }

  renderFilteredTweets(){

    if (this.props.tweets.length === 0){
      return <p> There are no tweets to return </p>;
    } else{
      const processedIds = [];
      const tweets = filterTweetsByWord(this.props.tweets, this.state.searchQuery).map((tweet) => {
        if (!processedIds.includes(tweet.id_str)){
          processedIds.push(tweet.id_str);
          return <Tweet key={tweet.id_str} tweet={tweet} user={this.props.user}/>;
        }

      });
      console.log(tweets);
      return (
        <div className="">
          {tweets}
        </div>
      );
    }
  }

  render(){
    return (
      <div className="tab">
        <input className="tab__hidden-radio" id="tweet-search" type="radio" name="tabs"/>
        <label className="tab__header-label" htmlFor="tweet-search">Search Gathered Tweets</label>
        <div className="tab-content">
          <label htmlFor="tweet-search-bar">Limit results to word or phrase</label>
          <input className="tweet-search-input" id="tweet-search-bar" type="text" name="searchQuery" onChange={this.handleSearchInputChange}/>
          {this.renderFilteredTweets()}
        </div>
      </div>
    );
  }
}

export default TweetSearch;
