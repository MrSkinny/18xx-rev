export default function Entity({ name, entity = {}, setShares, numpad, setNumpad }) {
  return (
    <div className="Entity mx-3 my-3">
      <h2>{name[0].toUpperCase() + name.slice(1)}</h2>
      <div className="d-flex align-items-center my-2">
        <span>Treasury: {entity.treasury}</span>
        <button onClick={() => setNumpad({ ...numpad, type: name, show: true })} className="btn btn-sm btn-warning mx-1">N</button>
      </div>
      <div>
        <button onClick={() => setShares(-1)} className="btn btn-sm btn-secondary mx-1">&lt;</button>
        <span>Shares: {entity.shares}</span>
        <button onClick={() => setShares(1)} className="btn btn-sm btn-secondary mx-1">&gt;</button>
      </div>
    </div>
  )
}