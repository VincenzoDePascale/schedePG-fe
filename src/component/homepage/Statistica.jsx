import "./Statistica.scss";

const Statistica = ({ stat, nome }) => {
  let mod = Math.floor((stat - 10) / 2.0);
  return (
    <>
      <div className="centro">
        <div className="box">
          <div className="statistica">{nome}</div>
          <div className="modificatore">{mod}</div>
          <div className="punteggio">{stat}</div>
        </div>
      </div>
    </>
  );
};

export default Statistica;
