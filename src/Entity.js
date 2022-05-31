export default function Entity({ name, treasury, shares, setTreasury, setShares }) {
  return (
    <div className="Entity">
      <h2>{name}</h2>
      <div>Treasury: {treasury}</div>
      <div>Shares: {shares}</div>
    </div>
  )
}