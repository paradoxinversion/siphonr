import React, { Component } from "react";
import PropTypes from "prop-types";
import TweetList from "../../components/TweetList/TweetList";
import UserProfile from "../../components/UserProfile/UserProfile";
import HashtagList from "../../components/HashtagList/HashtagList";
import Header from "../../components/Header/Header";
import TweetSearch from "../../components/TweetSearch/TweetSearch";
import axios from "axios";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.searchUser = this.searchUser.bind(this);
    this.renderHashTags = this.renderHashTags.bind(this);
  }

  async searchUser(username, tweetsToGet) {
    const config = {
      withCredentials: true,
      params: {
        oauth_token: this.props.user.twitterProvider.token,
        oauth_token_secret: this.props.user.twitterProvider.tokenSecret,
        user_id: this.props.user._id,
        user: username,
        count: tweetsToGet
      }
    };

    try {
      const result = await axios.get(`http://localhost:3001/search`, config);
      this.setState({
        data: result.data
      });
    } catch (e) {
      throw e;
    }
  }

  renderHashTags() {
    if (this.state.data) {
      return (
        <HashtagList
          heading="Most used Hashtags"
          id="most-used-hashtags"
          hashtags={this.state.data.mostCommonHashtags}
        />
      );
    } else {
      return null;
    }
  }

  renderIntro() {
    if (!this.props.isAuthenticated) {
      return (
        <div className="showcase">
          <h1 className="showcase-title">Overview</h1>
          <p className="showcase-body">Welcome to Overview!</p>
          <p>
            Overview helps you get a quick snapshot of a twitter user, by making
            it easier to view their tweets in mass. Sign in with Twitter to get
            started.
          </p>
        </div>
      );
    } else {
      if (!this.state.data) {
        return (
          <div className="showcase">
            <p className="showcase-body">
              Search for a twitter user by their @screenname to get started.
            </p>
          </div>
        );
      }
      return null;
    }
  }

  renderUserProfile() {
    if (this.state.data) {
      return <UserProfile user={this.state.data.user} />;
    } else {
      return null;
    }
  }

  renderTweetList(tweets, heading, id) {
    return <TweetList heading={heading} id={id} tweets={tweets} />;
  }

  renderTweetDisplay() {
    let tweetLists;
    if (this.state.data) {
      tweetLists = [
        this.renderTweetList(
          this.state.data.processedTweets,
          "Latest",
          "latest-tweets"
        ),
        this.renderTweetList(
          this.state.data.topTweetsByRT,
          "Top Tweets",
          "top-tweets"
        )
      ];
    }

    if (this.state.data) {
      return (
        <div className="tweet-display ">
          <div className="tab-group">
            <TweetSearch
              tweets={this.state.data.processedTweets}
              user={this.state.data.user}
            />
            <TweetList
              heading="Latest"
              id="latest-tweets"
              tweets={this.state.data.processedTweets}
              user={this.state.data.user}
            />
            <TweetList
              heading="Top Tweets"
              id="top-tweets"
              tweets={this.state.data.topTweetsByRT}
              user={this.state.data.user}
            />
            {this.renderHashTags()}
          </div>
          {/* <TabGroup tabs={tweetLists} /> */}
        </div>
      );
    } else {
      return null;
    }
  }

  renderTwitterData() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          {this.renderUserProfile()}
          {this.renderTweetDisplay()}
        </div>
      );
    } else {
      return null;
    }
  }

  renderMainPage() {
    return (
      <div className="content-wrapper">
        {this.renderIntro()}
        {/* {this.renderUserProfile()}
        {this.renderTweetDisplay()} */}
        {this.renderTwitterData()}
      </div>
    );
  }

  render() {
    return (
      <div className="main-page">
        <Header {...this.props} search={this.searchUser} />
        {this.renderMainPage()}
      </div>
    );
  }
}

MainPage.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default MainPage;
