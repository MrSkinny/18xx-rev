import "./App.css";
import { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Calculator from "./Calculator";
import Numpad from "./Numpad";
import Game from "./Game";

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

  const CalculatorElement = (
    <Calculator 
      eps={eps} 
      moveEps={moveEps} 
      setEps={setEps} 
      setShowNumpad={setShowNumpad} 
    />
  );

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/calculator">Calculator</NavLink>
          </li>
          <li>
            <NavLink to="/game">Game</NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={CalculatorElement} />
          <Route path="/calculator" element={CalculatorElement} />
          <Route path="/game" element={<Game />} />
        </Routes>

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
    </>
  );
}
