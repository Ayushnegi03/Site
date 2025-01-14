import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Header</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px",
  textAlign: "center",
  position: "fixed",
  top: 0,
  height:50,
  width: "100%",
  zIndex: 600,
};

export default Header;
