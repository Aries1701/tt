import React from "react";

type Props = {
  count: number;
  text: string;
  onChangeMessage: (newText: string) => void;
};

const Child: React.FC<Props> = ({ count, text, onChangeMessage }) => {
  return (
    <div style={{ border: "2px solid green", padding: 16 }}>
      <h3>Child Component</h3>

      <p>Count from parent (props): {count}</p>
      <p>Text from parent (props): {text}</p>

      <button onClick={() => onChangeMessage("Hello from Child")}>
        Change Message in Parent
      </button>
    </div>
  );
};

export default Child;
