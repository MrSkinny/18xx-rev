export default function Revenue({ eps, shareCount }) {
  return (
    <div className="" style={{ width: "19%" }}>
      {eps * shareCount}
    </div>
  );
}
