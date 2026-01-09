import { useState } from 'react'
import LifeCircle from './LifeCircle'

const App = () => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState(0);


  return (
    <div>
      <h2>Life Circle</h2>

      <button onClick={() => setShow(!show)}>
        Togle component
      </button>

      <button onClick={() => setValue(value + 1)}>
        Change props
      </button>

      <hr />
      {show && <LifeCircle value={value} />}
    </div>
  );
};

export default App
