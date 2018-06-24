import React, { Component } from "react";
import MainPage from "./Pages/MainPage/MainPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import TwitterCallback from "./Pages/TwitterCallback/TwitterCallback";

import {
  BrowserRouter,
  Route
} from "react-router-dom";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ""
    };
    this.setAuthenticationToken = this.setAuthenticationToken.bind(this);
    this.onAuthenticationSuccess = this.onAuthenticationSuccess.bind(this);
    this.onAuthenticationFailure = this.onAuthenticationFailure.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  onAuthenticationSuccess = (response) => {
    const token = response.headers.get("x-auth-token");
    response.json().then(user=>{
      if (token) {
        this.setState({isAuthenticated: true, user, token});
      }
    });
  }

  onAuthenticationFailure = (error) =>{
    alert(error);
  }

  setAuthenticationToken(tokenAndVerifierObject){
    this.setState({
      authenticationToken: tokenAndVerifierObject.oauth_token
    });
  }

  logOut = () => {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ""
    });
  }
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/"
            render={ ()=>
              <ErrorBoundary>
                <MainPage
                  isAuthenticated={this.state.isAuthenticated}
                  user={this.state.user}
                  onSuccess={this.onAuthenticationSuccess}
                  onFailure={this.onAuthenticationFailure}
                  logOut={this.logOut}
                  token={this.state.token}
                />
              </ErrorBoundary>
            }/>
          <Route exact path="/twitter/callback"
            render={() =>
              <TwitterCallback
                setAuthenticationToken={this.setAuthenticationToken} />}/>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
