import React, { useState } from "react";
import Child from "./Child";

const Parent: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("Hello Child");

  return (
    <div style={{ border: "2px solid blue", padding: 16 }}>
      <h2>Parent Component</h2>

      <p>Count (state): {count}</p>
      <p>Message (state): {message}</p>

      <button onClick={() => setCount(count + 1)}>
        Parent +1
      </button>

      <br /><br />

      <Child
        count={count}
        text={message}
        onChangeMessage={setMessage}
      />
    </div>
  );
};

export default Parent;
