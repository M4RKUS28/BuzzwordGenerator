import React from 'react';
import './Header.css'; // Import the CSS for styling

const Header = ({ onClick }) => {
  return (
    <div className="hero" onClick={onClick}>
      <h1>BuzzwordGenerator</h1>
    </div>
  );
};

export default Header;
