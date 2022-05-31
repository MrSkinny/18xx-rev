export default function Entity({ name, entity = {}, setShares, numpad, setNumpad }) {
  return (
    <div className="Entity mx-3">
      <h2>{name}</h2>
      <button onClick={() => setNumpad({ ...numpad, type: name, show: true })} className="btn btn-sm btn-warning mx-1">N</button>
      <div>Treasury: {entity.treasury}</div>
      <div>
        <button onClick={() => setShares(-1)} className="btn btn-sm btn-secondary mx-1">&lt;</button>
        <span>Shares: {entity.shares}</span>
        <button onClick={() => setShares(1)} className="btn btn-sm btn-secondary mx-1">&gt;</button>
      </div>
    </div>
  )
}