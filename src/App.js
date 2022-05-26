import { useState, useCallback } from "react";
import Calculator from "./Calculator";
import Numpad from "./Numpad";

export default function App() {
  const [ showNumpad, setShowNumpad ] = useState(false);
  const [eps, setEps] = useState(0);

  const moveEps = useCallback((n) => {
    if (eps + n < 0) return;
    setEps(e => Number(e) + n);
  }, [eps]);

  const typeEps = (num) => {
    setEps(eps => {
      let startEps = eps;
      if (Number(startEps) === 0) startEps = "";
      return startEps.toString() + num;
    });
  };

  return (
    <main>
      <Calculator 
        eps={eps} 
        moveEps={moveEps} 
        setEps={setEps} 
        setShowNumpad={setShowNumpad} 
      />

      { showNumpad && 
        <Numpad 
          eps={eps} 
          setEps={setEps} 
          moveEps={moveEps} 
          typeEps={typeEps}
          onClose={() => setShowNumpad(false)}
        /> 
      }
    </main>
  );
}
