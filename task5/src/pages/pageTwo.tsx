import { useDispatch, useSelector } from "react-redux";
import { increment, setValue } from "../store/couterSlice";
import type { RootState } from "../store/store";

export default function PageTwo() {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h2>Page 2</h2>
      <p>Counter value: {value}</p>

      <button onClick={() => dispatch(increment())}>
        +1
      </button>

      <button onClick={() => dispatch(setValue(100))}>
        Set = 100
      </button>
    </div>
  );
}
