import React from "react";

const LogoDisplay = ({ imageSrc }) => {
  return (
    <div className="logo-display">
      {imageSrc ? <img src={imageSrc} alt="Generated Logo" /> : null}
    </div>
  );
};

export default LogoDisplay;
