import { useEffect } from "react";
import "./Numpad.css";

export default function Numpad({ eps, onClose, typeEps, setEps }) {
  useEffect(() => {
    setEps(0);
  }, [setEps]);

  return (
    <>
      <button className="btn btn-lg btn-dark btn-close-numpad" onClick={onClose}>X</button>
      <div className="Numpad" onMouseDown={onClose}>
      </div>
      <div className="inner-numpad">
        <div className="numpad-display d-flex justify-content-center">
          <p>
            {eps}
          </p> 
        </div>
        <div className="d-flex justify-content-between mx-5">
          <div className="numpad-button-container">
            <button onClick={() => typeEps(7)} className="numpad-btn btn btn-secondary">7</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(8)} className="numpad-btn btn btn-secondary">8</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(9)} className="numpad-btn btn btn-secondary">9</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-5">
        <div className="numpad-button-container">
            <button onClick={() => typeEps(4)} className="numpad-btn btn btn-secondary">4</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(5)} className="numpad-btn btn btn-secondary">5</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(6)} className="numpad-btn btn btn-secondary">6</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-5">
          <div className="numpad-button-container">
            <button onClick={() => typeEps(1)} className="numpad-btn btn btn-secondary">1</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(2)} className="numpad-btn btn btn-secondary">2</button>
          </div>
          <div className="numpad-button-container">
            <button onClick={() => typeEps(3)} className="numpad-btn btn btn-secondary">3</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-5">
          <div className="numpad-button-container-2">
          <button onClick={() => typeEps(0)} className="numpad-btn btn btn-secondary">0</button>
          </div>
          <div className="numpad-button-container">
          <button onClick={() => setEps(0)} className="numpad-btn btn btn-secondary">C</button>
          </div>
        </div>
        <div className="d-flex justify-content-center my-3">
          <button onClick={onClose} className="btn btn-success btn-ok-numpad">OK</button>
        </div>
      </div>
    </>
  )
}