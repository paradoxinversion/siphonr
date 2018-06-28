import React from "react";
import PropTypes from "prop-types";
import "./UserProfile.css";

const UserProfile = (props) => {
  if (props.user){
    return (
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-img-container">
            <img className="profile-img" src={props.user.profile_image} alt="user profile"/>
          </div>
          <div className="profile-info">
            <p className="profile-data-field profile-name">{props.user.name}</p>
            <p className="profile-data-field profile-at"><a target="_blank" href={`https://twitter.com/intent/user?user_id=${props.user.id_str}`}>@{props.user.screen_name}</a></p>
            <p className="profile-data-field">{props.user.location}</p>
            <p className="profile-data-field">{props.user.description}</p>
            <p className="profile-data-field"> {props.user.followers_count} Followers</p>
            <p className="profile-data-field">Following {props.user.friends_count} People</p>
            <p className="profile-data-field">{props.user.statuses_count} Tweets</p>
          </div>
        </div>
        <hr className="horizontal-rule"/>

      </div>

    );
  } else {
    return null;

  }

};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
};
export default UserProfile;
