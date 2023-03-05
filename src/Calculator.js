import "./Calculator.css";
import classNames from "classnames";
import { useState, useEffect } from "react";
import Revenue from "./Revenue";

export default function Calculator({
  setNumpad,
  numpad,
  moveEps,
  eps,
  setEps,
  player,
  company,
  setCompany,
  showProjections,
}) {
  const [shareType, setShareType] = useState(10);

  useEffect(() => {
    function handleKeyDown(e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 39:
          return e.shiftKey ? moveEps(10) : moveEps(1);

        case 37:
          return e.shiftKey ? moveEps(-10) : moveEps(-1);

        case 8:
          return setEps(0);

        case 32:
        case 190:
        case 110:
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
  }, [moveEps, setEps]);

  // const treasuryShares = company.shares;
  // const setTreasuryShares = (n) => setCompany(c => ({ ...c, shares: n }));
  const toggleShareType = () => setShareType(s => s === 5 ? 10 : 5);

  const halfPayout = (eps * 10) / 2;
  let treasuryHalf = halfPayout,
    shareholderHalf = halfPayout,
    playerPayoutFull, playerPayoutHalf,
    companyPayoutFull, companyPayoutHalf;

  if (shareType === 10 && halfPayout % 2 !== 0) {
    treasuryHalf = halfPayout - 5;
    shareholderHalf = halfPayout + 5;
  }

  if (shareType === 10) {
    playerPayoutFull = eps * player.shares;
    playerPayoutHalf = (shareholderHalf / 10) * player.shares;
    companyPayoutFull = eps * company.shares;
    companyPayoutHalf = (shareholderHalf / 10) * company.shares;
  } else {
    playerPayoutFull = ((eps * 10) / 5) * player.shares;
    playerPayoutHalf = (shareholderHalf / 5) * player.shares;
    companyPayoutFull = ((eps * 10) / 5) * company.shares;
    companyPayoutHalf = (shareholderHalf / 5) * company.shares;
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

    // while (i < 10) {
    //   outputs.push(
    //     <div key={i} style={{ width: "19%", backgroundColor: "lightgray" }}>
    //       N/A
    //     </div>
    //   );
    //   i++;
    // }

    return outputs;
  }

  const btnShareTypeClass = classNames({
    btn: true, "btn-sm": true, "my-2": true,
    "btn-share-type-5": shareType === 5,
    "btn-share-type-10": shareType === 10,
  });

  return (
    <div className="Calculator container">
      <div className="d-flex justify-content-center">
        <button className={btnShareTypeClass} onClick={toggleShareType}>{shareType}-share</button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <small>Earnings:</small>

        <button onClick={() => moveEps(-10)} className="btn btn-sm btn-secondary mx-1">&lt;&lt;</button>
        <button onClick={() => moveEps(-1)} className="btn btn-sm btn-secondary mx-1">&lt;</button>
        <input
          type="text"
          min="0"
          value={eps}
          onChange={(e) => setEps(e.target.value)}
          className="earnings-input"
          onFocus={e => e.target.blur()}
        />
        <button onClick={() => moveEps(1)} className="btn btn-sm btn-secondary mx-1">&gt;</button>
        <button onClick={() => moveEps(10)} className="btn btn-sm btn-secondary mx-1">&gt;&gt;</button>
        <button onClick={() => setEps(0)} className="btn btn-sm btn-danger mx-1">C</button>
        <button onClick={() => setNumpad({ ...numpad, type: "eps", show: true })} className="btn btn-sm btn-warning mx-1">N</button>
      </div>

      {showProjections &&
        <section className="my-3 projected-holdings">
          <header>
            <h3>Projected Holdings</h3>
          </header>

          <table className="table">
            <thead>
              <tr>
                <th colSpan={2}>Player</th>
                <th colSpan={2}>Company</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Full</td>
                <td>Half</td>
                <td>Full</td>
                <td>Half</td>
              </tr>
              <tr>
                <td>${player.treasury + playerPayoutFull}</td>
                <td>${player.treasury + playerPayoutHalf}</td>
                <td>${company.treasury + companyPayoutFull}</td>
                <td>${company.treasury + treasuryHalf + companyPayoutHalf}</td>
              </tr>
            </tbody>
          </table>
        </section>
      }


      <section className="my-3">
        <header>
          <h3>Full Payout</h3>
        </header>
        <div className="d-flex justify-content-between flex-wrap">
          {generateOutputs({ n: shareType, shareType, eps })}
        </div>
      </section>

      <section className="my-3">
        <header>
          <h3>Half Payout</h3>
        </header>

        <div className="d-flex justify-content-between flex-wrap">
          {generateOutputs({
            n: shareType,
            shareType,
            eps: shareholderHalf / 10
          })}
        </div>
        <h5 className="my-3">
          Treasury half: ${treasuryHalf}
        </h5>

      </section>
    </div>
  );
}
