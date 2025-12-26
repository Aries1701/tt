import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);

  console.log("🔁 render App");

 
  useEffect(() => {
    console.log("🟢 componentDidMount");

    return () => {
      console.log("🧹 componentWillUnmount");
    };
  }, []);

  
  useEffect(() => {
    console.log("🟡 componentDidUpdate - count =", count);
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <h1>React Lifecycle Demo</h1>

      <button onClick={() => setCount(count + 1)}>
        ➕ Tăng count
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => setShow(!show)}
      >
        {show ? "Ẩn component" : "Hiện component"}
      </button>

      <hr />

      {show && <Child count={count} />}
    </div>
  );
}

function Child({ count }) {
  useEffect(() => {
    console.log("👶 Child mount");

    return () => {
      console.log("🧹 Child unmount");
    };
  }, []);

  useEffect(() => {
    console.log("👶 Child update - count =", count);
  }, [count]);

  return <h2>Child count: {count}</h2>;
}

export default App;
