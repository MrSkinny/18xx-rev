import classNames from "classnames";
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
  const [showProjections, setShowProjections] = useState(false);

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

  const setPlayerTreasury = useCallback((n) => setPlayer(p => ({ ...p, treasury: n })), []);
  const setCompanyTreasury = useCallback((n) => setCompany(c => ({ ...c, treasury: n })), []);

  let numProps = {};
  switch (numpad.type) {
    case "eps":
      numProps = { x: eps, setX: setEps, typeX: typeInput("eps") }; break;
    case "player":
      numProps = {
        x: player.treasury,
        setX: setPlayerTreasury,
        typeX: typeInput("player"),
      }; break;
    case "company":
      numProps = {
        x: company.treasury,
        setX: setCompanyTreasury,
        typeX: typeInput("company"),
      }; break;
    default:
      numProps = {};
  }

  const toggleBaseClasses = { btn: true, "btn-sm": true, "mx-1": true };
  const playerBtnClass = classNames({ ...toggleBaseClasses, "btn-danger": !player.show, "btn-success": player.show });
  const companyBtnClass = classNames({ ...toggleBaseClasses, "btn-danger": !company.show, "btn-success": company.show });
  const projectionBtnClass = classNames({ ...toggleBaseClasses, "btn-danger": !showProjections, "btn-success": showProjections });

  return (
    <main className="App">

      <div className="d-flex justify-content-center align-items-center my-2">
        <span><small>Toggle:</small></span>
        <button className={playerBtnClass} onClick={() => setPlayer(p => ({ ...p, show: !p.show }))}>Player</button>
        <button className={companyBtnClass} onClick={() => setCompany(c => ({ ...c, show: !c.show }))}>Company</button>
        <button className={projectionBtnClass} onClick={() => setShowProjections(p => !p)}>Projections</button>
      </div>

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

        {company.show && 
          <Entity 
            name="company" 
            entity={company} 
            setShares={(dir) => setCompany(c => ({ ...c, shares: c.shares + dir }))} 
            numpad={numpad} 
            setNumpad={setNumpad} 
          />
        }
      </section>

      <Calculator
        eps={eps}
        moveEps={moveEps}
        setEps={setEps}
        setNumpad={setNumpad}
        numpad={numpad}
        payouts={payouts}
        setPayouts={setPayouts}
        company={company}
        setCompany={setCompany}
        player={player}
        showProjections={showProjections}
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
