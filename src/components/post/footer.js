/* eslint-disable linebreak-style */
import PropTypes from 'prop-types';
import React from 'react';

export default function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="mr-1 font-bold">{username}</span>
      <span className="italic">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
