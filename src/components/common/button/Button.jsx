import React from "react";
import './Button.scss';

// const STYLES = ["btn--red", "btn--white", "btn--pale-red"];
// const SIZES = ["btn--large", "btn--medium", "btn--small"];
// const COLORS = ["btn--text-red, btn--text-white"]

function Button({ children, color, size, onClick, classes }) {
  return (
    <button
      className={`btn ${color} ${size} ${classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
