import React, { Component } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../axiosInstance.js";
import { withRouter } from "react-router-dom";

class TwitterCallback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const tokenAndVerifier = {};
    this.props.location.search
      .substring(1)
      .split("&")
      .forEach(el => {
        const twitterResponseData = el.split("=");
        tokenAndVerifier[twitterResponseData[0]] = twitterResponseData[1];
      });
    this.props.setAuthenticationToken(tokenAndVerifier);
    await axiosInstance.get("/auth/twitter/callback", {
      withCredentials: true
    });
  }
  render() {
    return (
      <div>
        <p>
          {" "}
          Welcome back from Twitter! If this window tab didn&apos;t
          automagically close, feel free to close it.{" "}
        </p>
      </div>
    );
  }
}

TwitterCallback.propTypes = {
  location: PropTypes.object.isRequired,
  setAuthenticationToken: PropTypes.func.isRequired
};

export default withRouter(TwitterCallback);
