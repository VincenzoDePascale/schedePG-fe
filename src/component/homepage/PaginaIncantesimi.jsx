import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./PaginaIncantesimi.scss";

const PaginaIncantesimi = ({ currentPG }) => {
  // calcolo modificatori

  let modFor =
    currentPG !== undefined ? Math.floor((currentPG?.forza - 10) / 2.0) : 0;
  let modDes =
    currentPG !== undefined ? Math.floor((currentPG?.destrezza - 10) / 2.0) : 0;
  let modCos =
    currentPG !== undefined
      ? Math.floor((currentPG?.costituzione - 10) / 2.0)
      : 0;
  let modInt =
    currentPG !== undefined
      ? Math.floor((currentPG?.intelligenza - 10) / 2.0)
      : 0;
  let modSag =
    currentPG !== undefined ? Math.floor((currentPG?.saggezza - 10) / 2.0) : 0;
  let modCar =
    currentPG !== undefined ? Math.floor((currentPG?.carisma - 10) / 2.0) : 0;

  //logica calcolo stat incantesimi

  const [carIncantatore, setCarIncantatore] = useState("nessuna");
  const [TSIncantesimi, setTSIncantesimi] = useState("nessuna");
  const [bonusAttacco, setBonusAttacco] = useState(0);

  const gestionePaginaIncantesimi = (currentPG) => {
    switch (currentPG?.classe?.classe) {
      case "bardo":
        setCarIncantatore("carisma");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modCar);
        setBonusAttacco(currentPG?.bonusCompetenza + modCar);
        break;
      case "chierico":
        setCarIncantatore("saggezza");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modSag);
        setBonusAttacco(currentPG?.bonusCompetenza + modSag);
        break;
      case "druido":
        setCarIncantatore("saggezza");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modSag);
        setBonusAttacco(currentPG?.bonusCompetenza + modSag);
        break;
      case "mago":
        setCarIncantatore("intelligenza");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modInt);
        setBonusAttacco(currentPG?.bonusCompetenza + modInt);
        break;
      case "stregone":
        setCarIncantatore("carisma");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modCar);
        setBonusAttacco(currentPG?.bonusCompetenza + modCar);
        break;
      case "warlock":
        setCarIncantatore("carisma");
        setTSIncantesimi(8 + currentPG?.bonusCompetenza + modCar);
        setBonusAttacco(currentPG?.bonusCompetenza + modCar);
        break;
      default:
        setCarIncantatore("nessuna");
        setTSIncantesimi(0);
        setBonusAttacco(0);
    }
  };

  useEffect(() => {
    gestionePaginaIncantesimi(currentPG);
  }, [currentPG]);

  return (
    <>
      <Row className="intestazione bTop">
        <Col xs={12} md={12} lg={3}>
          <div>
            <p>
              <span className="parametro">Classe da incantatore:</span>{" "}
              <span className="valore">{currentPG?.classe?.classe}</span>
            </p>
          </div>
        </Col>
        <Col xs={12} md={4} lg={3}>
          <div>
            <p>
              <span className="parametro">caratteristica da incantatore:</span>{" "}
              <span className="valore">{carIncantatore}</span>
            </p>
          </div>
        </Col>
        <Col xs={12} md={4} lg={3}>
          <div>
            <p>
              <span className="parametro">CD tiro salvezza incantesimi:</span>{" "}
              <span className="valore">{TSIncantesimi} </span>
            </p>
          </div>
        </Col>
        <Col xs={12} md={4} lg={3}>
          <div>
            <p>
              <span className="parametro">Bonus di attacco incantesimi:</span>{" "}
              <span className="valore">{bonusAttacco} </span>
            </p>
          </div>
        </Col>
      </Row>

      <Row className="page">
        <div className="text-center">qui ci saranno gli incantesimi</div>
        {/* <Col lg={4} className="colonna">
          colonna uno
        </Col>
        <Col lg={4} className="colonna">
          colonna due
        </Col>
        <Col lg={4} className="colonna">
          colonna tre
        </Col> */}
      </Row>
    </>
  );
};

export default PaginaIncantesimi;
