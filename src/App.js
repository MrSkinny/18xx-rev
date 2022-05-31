import "./App.css";
import { useState, useCallback } from "react";
import Calculator from "./Calculator";
import Numpad from "./Numpad";

export default function App() {
  const [ numpad, setNumpad ] = useState({ show: false, type: "eps" });
  const [eps, setEps] = useState(0);
  const [payouts, setPayouts] = useState({
    full: [],
    half: [],
  });
  const [ company, setCompany ] = useState({
    treasury: 0,
    shares: 0,
  });
  const [ player, setPlayer ] = useState({
    cash: 0,
    shares: 0,
  });

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

  const typePlayerTreasury = (num) => {
    setPlayer(player => {
      let playerCash = player.cash;
      if (Number(playerCash) === 0) playerCash = "";
      return playerCash.toString() + num;
    });
  }

  let numProps = {};
  switch(numpad.type) {
    case "eps": 
      numProps = { x: eps, setX: setEps, typeX: typeEps, zeroOnOpen: true }; break;
    case "player":
      numProps = { 
        x: player.treasury, 
        setX: (n) => setPlayer({...player, cash: n }), 
        typeX: typePlayerTreasury, 
        zeroOnOpen: false 
      }; break;
    default:
      numProps = {};
  }
  

  return (
    <main>
      <Calculator 
        eps={eps} 
        moveEps={moveEps} 
        setEps={setEps} 
        setNumpad={setNumpad}
        numpad={numpad}
        payouts={payouts}
        setPayouts={setPayouts}
      />

      { numpad.show && 
        <Numpad 
          {...numProps}
          onClose={() => setNumpad({ ...numpad, show: false })}
        /> 
      }
    </main>
  );
}
