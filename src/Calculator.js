import { useState, useEffect } from "react";
import Revenue from "./Revenue";

export default function Calculator({ setShowNumpad, moveEps, eps, setEps }) {
  const [treasuryShares, setTreasuryShares] = useState(0);
  const [shareType, setShareType] = useState(10);

  useEffect(() => {
    function handleKeyDown(e) {
      console.log(e.keyCode);
      switch(e.keyCode) {
        case 39:
          return e.shiftKey ? moveEps(10) : moveEps(1);
        
        case 37:
          return e.shiftKey ? moveEps(-10) : moveEps(-1);

        case 8:
          return setEps(0);

        case 32:
          return toggleShareType();

        default:
      }

      if (e.keyCode >= 48 && e.keyCode <= 57) {
        return setEps(eps => {
          let startEps = eps;
          if (Number(startEps) === 0) startEps = "";
          return startEps.toString() + String.fromCharCode(e.keyCode);
        });
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveEps]);
  
  const halfPayout = (eps * 10) / 2;
  let treasuryHalf = halfPayout,
    shareholderHalf = halfPayout;

  if (shareType === 10 && halfPayout % 2 !== 0) {
    treasuryHalf = halfPayout - 5;
    shareholderHalf = halfPayout + 5;
  }
  
  function toggleShareType() {
    setShareType(s => s === 5 ? 10 : 5);
  }

  function generateOutputs({ shareType = 10, n = 10, eps = 0 }) {
    const outputs = [];
    let i = 0;
    let actualEps = eps;
    if (shareType === 5) {
      actualEps = eps * 2;
    }

    while (i < n) {
      outputs.push(<Revenue key={i} shareCount={i + 1} eps={actualEps} />);
      i++;
    }

    while (i < 10) {
      outputs.push(
        <div key={i} style={{ width: "19%", backgroundColor: "lightgray" }}>
          N/A
        </div>
      );
      i++;
    }

    return outputs;
  }

  function handleKeyDown(e) {
    console.log(e.keyCode);
  }

  function moveTreasuryShares(n) {
    if (treasuryShares + n < 0) return;
    setTreasuryShares(ts => Number(ts) + n);
  }

  return (
    <div onKeyDown={handleKeyDown} className="App container">
      <div className="d-flex justify-content-center">
        <button className="btn btn-sm btn-info my-2" onClick={toggleShareType}>{shareType}-share</button>
      </div>
      <div className="d-flex justify-content-center">
        <button onClick={() => moveEps(-10)} className="btn btn-sm btn-secondary mx-1">&lt;&lt;</button>
        <button onClick={() => moveEps(-1)} className="btn btn-sm btn-secondary mx-1">&lt;</button>
        <input
          type="number"
          min="0"
          value={eps}
          onChange={(e) => setEps(e.target.value)}
          style={{ width: "15%" }}
          onFocus={e => e.target.blur()}
        />
        <button onClick={() => moveEps(1)} className="btn btn-sm btn-secondary mx-1">&gt;</button>
        <button onClick={() => moveEps(10)} className="btn btn-sm btn-secondary mx-1">&gt;&gt;</button>
        <button onClick={() => setEps(0)} className="btn btn-sm btn-danger mx-1">C</button>
        <button onClick={() => setShowNumpad(true)} className="btn btn-sm btn-warning mx-1">N</button>
      </div>

      <section className="my-3">
        <header>
          <h3>Full Payout</h3>
        </header>
        Dividends:
        <div className="d-flex justify-content-between flex-wrap">
          {generateOutputs({ n: shareType, shareType, eps })}
        </div>
      </section>

      <section className="my-3">
        <header>
          <h3>Half Payout</h3>
          <div>
          Treasury Shares: 
          <button onClick={() => moveTreasuryShares(-1)} className="btn btn-sm btn-secondary mx-1">&lt;</button>
          <input
            type="number"
            min="0"
            max="18"
            style={{ width: "15%" }}
            onChange={(e) => setTreasuryShares(e.target.value)}
            value={treasuryShares}
            onFocus={e => e.target.blur()}
          />
          <button onClick={() => moveTreasuryShares(1)} className="btn btn-sm btn-secondary mx-1">&gt;</button>
        </div>
        </header>

        <p>
          Treasury gets: ${treasuryHalf + (shareholderHalf / shareType) * treasuryShares}
        </p>

        Dividends:
        <div className="d-flex justify-content-between flex-wrap">
          {generateOutputs({
            n: shareType,
            shareType,
            eps: shareholderHalf / 10
          })}
        </div>
      </section>
    </div>
  );
}
