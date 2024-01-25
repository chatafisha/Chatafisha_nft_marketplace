import React from "react";
import "./polyfills";

// importing MyRouts where we located all of our theme
import MyRouts from "./routers/routes";

function App() {
  return (
    <div>
      <MyRouts />
    </div>
  );
}

export default App;
