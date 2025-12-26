import { useState } from "react";
import Counter from "./Counter";

function App() {
  // STATE
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Aries");

  return (
    <div style={{ padding: 20 }}>
      <h1>Parent Component</h1>

      <p>Count in Parent: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        + Increase Count
      </button>

      <br /><br />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      {/* TRUYỀN PROPS */}
      <Counter count={count} name={name} />
    </div>
  );
}

export default App;
