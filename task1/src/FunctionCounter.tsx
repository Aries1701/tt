import React, { useState } from "react";

type Props = {
  title: string;
};

const FunctionCounter: React.FC<Props> = ({ title }) => {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={{ border: "1px solid #ccc", padding: 16 }}>
      <h3>{title} (Function Component)</h3>
      <p>Count: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        + Increment
      </button>
    </div>
  );
};

export default FunctionCounter;
