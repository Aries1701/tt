import React from "react";
import FunctionCounter from "./FunctionCounter";
import ClassCounter from "./ClassCounter";

const App: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Demo Function vs Class Component</h2>

      <FunctionCounter title="Counter A" />
      <br />
      <ClassCounter title="Counter B" />
    </div>
  );
};

export default App;
