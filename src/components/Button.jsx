// src/components/Button.js
import React from 'react';
import PropTypes from 'prop-types';

function Button({ text, onClick, type = 'button', disabled = false, style = {}, className = '', ariaLabel = '', isLoading = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={style}
      className={`button ${className}`} // Use className for styling consistency
      aria-label={ariaLabel || text} // Use ariaLabel if provided, otherwise fallback to text
    >
      {isLoading ? 'Loading...' : text}
    </button>
  );
}

// PropTypes for type-checking
Button.propTypes = {
  text: PropTypes.string.isRequired,       // The button text
  onClick: PropTypes.func,                 // Function to handle click events
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // HTML button types
  disabled: PropTypes.bool,                // Disabled state
  style: PropTypes.object,                 // Custom inline styles
  className: PropTypes.string,             // Additional class names for styling
  ariaLabel: PropTypes.string,             // Aria-label for accessibility
  isLoading: PropTypes.bool,               // Loading state
};

// Default props if none are passed
Button.defaultProps = {
  type: 'button',
  disabled: false,
  style: {},
  className: '',
  ariaLabel: '',
  isLoading: false,
};

export default Button;