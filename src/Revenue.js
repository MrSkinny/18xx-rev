import "./Revenue.css";

export default function Revenue({ eps, shareCount }) {
  return (
    <div className="Revenue" style={{ width: "19%" }}>
      <p className="rev-head">{shareCount}</p>
      <p className="rev-total">{eps * shareCount}</p>
    </div>
  );
}
