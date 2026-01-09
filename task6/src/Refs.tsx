import { useEffect, useRef, useState } from "react";

const Refs = () => {
  // Ref DOM
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Ref lưu giá trị
  const clickCountRef = useRef(0);

  // State so sánh
  const [renderCount, setRenderCount] = useState(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const scrollToBox = () => {
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const increaseRefCount = () => {
    clickCountRef.current += 1;
    alert(`Ref count (không re-render): ${clickCountRef.current}`);
  };

  useEffect(() => {
    console.log("Component render");
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Refs Demo</h2>

      {/* Input focus */}
      <section>
        <h3>1️ Focus input (DOM ref)</h3>
        <input
          ref={inputRef}
          placeholder="Click button để focus"
          style={{ marginRight: 8 }}
        />
        <button onClick={focusInput}>Focus</button>
      </section>

      <hr />

      {/* Ref vs State */}
      <section>
        <h3>2️ useRef vs useState</h3>
        <button onClick={increaseRefCount}>
          Tăng Ref count
        </button>

        <button
          style={{ marginLeft: 8 }}
          onClick={() => setRenderCount((c) => c + 1)}
        >
          Tăng State count
        </button>

        <p>State count (gây re-render): {renderCount}</p>
      </section>

      <hr />

      {/* Scroll */}
      <section style={{ height: 300 }}>
        <h3>3️ Scroll bằng ref</h3>
        <button onClick={scrollToBox}>Scroll xuống box</button>

        <div style={{ height: 200 }} />

        <div
          ref={boxRef}
          style={{
            height: 100,
            background: "#4ade80",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          TARGET BOX
        </div>
      </section>
    </div>
  );
};

export default Refs;
