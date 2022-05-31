import "./App.css";
import { useState, useCallback } from "react";
import Calculator from "./Calculator";
import Entity from "./Entity"
import Numpad from "./Numpad";

export default function App() {
  const [numpad, setNumpad] = useState({ show: false, type: "eps" });
  const [eps, setEps] = useState(0);
  const [payouts, setPayouts] = useState({
    full: [],
    half: [],
  });
  const [company, setCompany] = useState({
    show: false,
    treasury: 0,
    shares: 0,
  });
  const [player, setPlayer] = useState({
    show: false,
    treasury: 0,
    shares: 0,
  });


  const moveEps = useCallback((n) => {
    if (eps + n < 0) return;
    setEps(e => Number(e) + n);
  }, [eps]);

  const typeInput = (inputName) => {
    switch (inputName) {
      case "eps": {
        return (num) => {
          setEps(eps => {
            let startEps = eps;
            if (Number(startEps) === 0) startEps = "";
            return startEps.toString() + num;
          });
        };
      }

      case "player": {
        return (num) => {
          setPlayer(player => {
            let playerCash = player.treasury;
            if (Number(playerCash) === 0) playerCash = "";
            return { ...player, treasury: Number(playerCash.toString() + num) };
          });
        };
      }

      case "company": {
        return (num) => {
          setCompany(company => {
            let coCash = company.treasury;
            if (Number(coCash) === 0) coCash = "";
            return { ...company, treasury: Number(coCash.toString() + num) };
          });
        };
      }
      default: return () => { };
    }
  };

  let numProps = {};
  switch (numpad.type) {
    case "eps":
      numProps = { x: eps, setX: setEps, typeX: typeInput("eps"), zeroOnOpen: true }; break;
    case "player":
      numProps = {
        x: player.treasury,
        setX: (n) => setPlayer({ ...player, treasury: n }),
        typeX: typeInput("player"),
        zeroOnOpen: false
      }; break;
    case "company":
      numProps = {
        x: company.treasury,
        setX: (n) => setCompany({ ...company, treasury: n }),
        typeX: typeInput("company"),
        zeroOnOpen: false
      }; break;
    default:
      numProps = {};
  }


  return (
    <main>

      <button onClick={() => setPlayer(p => ({ ...p, show: !p.show }))}>Player</button>
      <button onClick={() => setCompany(c => ({ ...c, show: !c.show }))}>Company</button>

      <section className="d-flex justify-space-between">
        {player.show &&
          <Entity
            name="player"
            entity={player}
            setShares={(dir) => setPlayer(p => ({ ...p, shares: p.shares + dir }))}
            numpad={numpad}
            setNumpad={setNumpad}
          />
        }

        {company.show && <Entity name="company" entity={company} setShares={(dir) => setCompany(c => ({ ...c, shares: c.shares + dir }))} numpad={numpad} setNumpad={setNumpad} />}
      </section>

      <Calculator
        eps={eps}
        moveEps={moveEps}
        setEps={setEps}
        setNumpad={setNumpad}
        numpad={numpad}
        payouts={payouts}
        setPayouts={setPayouts}
      />

      {numpad.show &&
        <Numpad
          {...numProps}
          onClose={() => setNumpad({ ...numpad, show: false })}
        />
      }
    </main>
  );
}
