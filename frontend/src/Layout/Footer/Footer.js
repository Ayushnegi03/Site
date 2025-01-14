import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>Footer</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px",
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  width: "100%",
  zIndex: 1000,
};

export default Footer;
