import React from "react";
import PropTypes from "prop-types";
import Hashtag from "../Hashtag/Hashtag";
import "./HashtagList.css";
class HashtagList extends React.Component{
  renderHashtags(){
    if (this.props.hashtags === 0){
      return <p> There are no hashtags to return </p>;
    } else{
      const hashtags = this.props.hashtags.map((hashtag) => {
        return <Hashtag key={hashtag[0]} hashtag={hashtag}/>;
      });
      return (
        <div className="hashtag-list tab-content">
          {hashtags}
        </div>
      );
    }
  }
  render(){
    if (this.props.hashtags){
      return (
        <div className="hashtag-list-wrapper tab">
          <input className="tab__hidden-radio" id={this.props.id} type="radio" name="tabs"/>
          <label className="tab__header-label" htmlFor={this.props.id}>{this.props.heading}</label>
          {/* <h1 className="hashtag-list-header">{this.props.heading}</h1> */}
          {this.renderHashtags()}
        </div>
      );
    } else {
      return null;
    }
  }
}

HashtagList.propTypes = {
  hashtags: PropTypes.array.isRequired
};
export default HashtagList;
