function Card({ title, value, subtitle, color }) {
  return (
    <div className={`card ${color}`}>
      <h2>{value}</h2>
      <p>{title}</p>
      <span>{subtitle}</span>
    </div>
  );
}

export default Card;