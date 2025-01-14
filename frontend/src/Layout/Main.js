import React from "react";
import Home from "../Pages/Home/Homepage";

const Main = () => {
  return (
    <main style={mainStyle}>
      <h2>Main Content</h2>
      <Home/>
      <p>This is the main content area. It will not overlap with the header or footer.
      In this tutorial, we’ll show how to build an interactive tic-tac-toe game with React.



      </p>
    </main>
  );
};

const mainStyle = {
  marginTop: "60px", // Adjust to match header height
  marginBottom: "40px", // Adjust to match footer height
  padding: "20px",
};

export default Main;
