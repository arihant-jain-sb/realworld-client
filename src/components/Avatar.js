import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

const getInitial = (username) => {
  if (!username || typeof username !== 'string' || username.length === 0) return '?';
  return username[0].toUpperCase();
};

const Avatar = ({ image, username, size = 40, alt = '' }) => {
  const [imgError, setImgError] = useState(false);
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const showFallback = imgError || !image || image.trim() === '';

  return (
    <span
      className="avatar-wrapper"
      style={{ width: dimension, height: dimension }}
      aria-label={username ? `Avatar for ${username}` : 'Avatar'}
      role="img"
    >
      {!showFallback ? (
        <img
          src={image}
          alt={alt || username || 'avatar'}
          className="avatar-img"
          style={{ width: dimension, height: dimension }}
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className="avatar-fallback"
          style={{ width: dimension, height: dimension }}
        >
          {getInitial(username)}
        </span>
      )}
    </span>
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  username: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
};

export default Avatar;
