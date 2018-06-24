import React from "react";
import PropTypes from "prop-types";
import "./Hashtag.css";

const Hashtag = (props) => {
  return (
    <div className="hashtag-wrapper">
      <p className="hashtag-item">
        <a
          className="hashtag"
          target="_blank"
          href={`https://twitter.com/hashtag/${props.hashtag[0]}`}>
          #{props.hashtag[0]} </a> {props.hashtag[1]} Tweet(s) with this hashtag
      </p>
    </div>
  );
};

Hashtag.propTypes = {
  hashtag: PropTypes.array.isRequired
};

export default Hashtag;
