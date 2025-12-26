import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function PageOne() {
  const value = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h2>Page 1</h2>
      <p>Counter value: {value}</p>
    </div>
  );
}
