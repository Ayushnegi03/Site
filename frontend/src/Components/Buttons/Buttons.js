import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Styles specific to the button component

const Button = ({ 
  type = 'button', 
  label, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'medium', 
  isLoading = false, 
  icon 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${disabled || isLoading ? 'btn-disabled' : ''}`}
      onClick={!disabled && !isLoading ? onClick : undefined}
      disabled={disabled}
    >
      {isLoading ? (
        <span className="spinner"></span> // Optional loading spinner
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>} {/* Optional icon */}
          {label && <span className="btn-label">{label}</span>}
        </>
      )}
    </button>
  );
};

// Prop Types for better validation
Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'link']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isLoading: PropTypes.bool,
  icon: PropTypes.node, // Allows passing an icon component
};

export default Button;
