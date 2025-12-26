import { useState } from "react";

function Counter({ count }) {
  const [localCount, setLocalCount] = useState(0);

  return (
    <div>
      <p>Count from Parent: {count}</p>
      <p>Local Count: {localCount}</p>

      <button onClick={() => setLocalCount(localCount + 1)}>
        Increase Local
      </button>
    </div>
  );
}

export default Counter;
