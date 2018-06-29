import React from "react";
import TwitterLogin from "react-twitter-auth";
import PropTypes from "prop-types";
import "./TwitterAuth.scss";
class TwitterAuth extends React.Component {
  renderLogoutButton() {
    return (
      <button
        className="twitter-logout"
        onClick={() => {
          this.props.logOut();
        }}>
        Log Out
      </button>
    );
  }

  renderLogin() {
    const baseURL = window.location.host.includes("localhost")
      ? "http://localhost:3001"
      : "http://siphonr.herokuapp.com";
    return (
      <TwitterLogin
        className="twitter-login"
        loginUrl={`${baseURL}/auth/twitter`}
        onFailure={this.props.onFailure}
        onSuccess={this.props.onSuccess}
        requestTokenUrl={`${baseURL}/auth/twitter/reverse`}>
        Log in with Twitter
      </TwitterLogin>
    );
  }

  renderUserName() {
    if (this.props.isAuthenticated) {
      return (
        <div className="logged-user-name">
          <p className="user-greeting"> Ahoy, {this.props.user.displayName}!</p>
          {this.renderLogoutButton()}
        </div>
      );
    }
  }

  render() {
    let render;
    if (this.props.isAuthenticated) {
      render = this.renderUserName();
    } else {
      render = this.renderLogin();
    }
    return <div className="login-wrapper">{render}</div>;
  }
}

TwitterAuth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  user: PropTypes.object
};
export default TwitterAuth;
