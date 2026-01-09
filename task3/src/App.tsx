import React from "react";
import Parent from "./Parent";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>State & Props Demo</h1>
      <Parent />
    </div>
  );
};

export default App;
