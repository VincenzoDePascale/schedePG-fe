import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Homepage.scss";
import Menu from "../menu/Menu";
import Statistica from "./Statistica";
import TiriSalvezza from "./TiriSalvezza";
import Abilità from "./Abilità";

const Homepage = () => {
  const myProfile = useSelector((state) => state.main.myProfile);
  const token = useSelector((state) => state.main.myProfile.accessToken);
  const currentPG = useSelector((state) => state.main.PersonaggioCorrente);

  const [viewerBComp, setViewerBComp] = useState(false);
  const changeViewBComp = () => {
    setViewerBComp(!viewerBComp);
  };

  const [viewerTS, setViewerTS] = useState(false);
  const changeViewTS = () => {
    setViewerTS(!viewerTS);
  };

  const [viewerAB, setViewerAB] = useState(false);
  const changeViewAB = () => {
    setViewerAB(!viewerAB);
  };

  const [viewerNOTE, setViewerNOTE] = useState(false);
  const changeViewNOTE = () => {
    setViewerNOTE(!viewerNOTE);
  };

  const [viewerLingue, setViewerLingue] = useState(false);
  const changeViewLingue = () => {
    setViewerLingue(!viewerLingue);
  };

  let modFor = Math.floor((currentPG.forza - 10) / 2.0);
  let modDes = Math.floor((currentPG.destrezza - 10) / 2.0);
  let modCos = Math.floor((currentPG.costituzione - 10) / 2.0);
  let modInt = Math.floor((currentPG.intelligenza - 10) / 2.0);
  let modSag = Math.floor((currentPG.saggezza - 10) / 2.0);
  let modCar = Math.floor((currentPG.carisma - 10) / 2.0);

  //calncella PG

  const [dellOK, setDellOK] = useState(false);
  const [idDel, setIdDel] = useState();

  const handleClickDelete = (p) => {
    setIdDel(p);
    setDellOK(true);
  };
  const cancellaPG = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pg/" + idDel, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setDellOK(false);
        console.log("messaggio di cancellazione se è ok", data.message);
      } else {
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (dellOK === true) {
      cancellaPG();
    }
  }, [idDel, dellOK]);

  return (
    <>
      <Menu />
      <div className="contAll">
        {/* intestazione */}
        <Row className="align-items-center">
          <Col lg={4}>
            <div className="nomeDelPersonaggio">
              <p>
                Nome del personaggio:
                <span>
                  {currentPG.nomePG}, {currentPG.id}
                </span>
              </p>
            </div>
          </Col>

          <Col lg={4}>
            <div>
              <p>
                Classe e livello:{" "}
                <span>
                  {currentPG.classe}, {currentPG.livello}
                </span>
              </p>

              <p>
                Nome del giocatore: <span>{myProfile.username}</span>
              </p>

              <p>
                Razza: <span>{currentPG.razza}</span>
              </p>
            </div>
          </Col>
          <Col lg={4}>
            <div>
              <p>
                Background: <span> {currentPG.background} </span>
              </p>

              <p>
                allineamento: <span>{currentPG.allineamento} </span>
              </p>

              <p>
                Punti espezienza: <span>{currentPG.puntiExp} </span>
              </p>
            </div>
          </Col>
        </Row>
        {/* statistiche */}
        <Row className="m-0 pt-2 pb-2">
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.forza} nome={`forza`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.destrezza} nome={`destrezza`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.costituzione} nome={`costituzione`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.intelligenza} nome={`intelligenza`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.saggezza} nome={`saggezza`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.carisma} nome={`carisma`} />
          </Col>
        </Row>

        <Row className="m-0 d-flex align-items-start">
          <Col
            lg={4}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="containerTS border m-0">
              {/*ispirazione*/}
              <div className="isp border" onClick={changeViewBComp}>
                <span>ispirazione</span>
                {viewerBComp && <span>{currentPG.ispirazione}si</span>}
                {!viewerBComp && <span>{currentPG.ispirazione}no</span>}
              </div>
              {/*bonus competenza*/}
              <div className="BComp border">
                <span>Bonus competenza</span>
                <span>{currentPG.bonusCompetenza}</span>
              </div>
              {/*tiri salvezza*/}
              <div className="border listTS">
                <div className="titolo border" onClick={changeViewTS}>
                  Tiri Salvezza
                </div>
                {!viewerTS && (
                  <div className="viewer">
                    <TiriSalvezza
                      mod={modFor}
                      BComp={currentPG.bonusCompetenza}
                      stat={`forza`}
                    />
                    <TiriSalvezza
                      mod={modDes}
                      BComp={currentPG.bonusCompetenza}
                      stat={`Destrezza`}
                    />
                    <TiriSalvezza
                      mod={modCos}
                      BComp={currentPG.bonusCompetenza}
                      stat={`Costituzione`}
                    />
                    <TiriSalvezza
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      stat={`Intelligenza`}
                    />
                    <TiriSalvezza
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      stat={`Saggezza`}
                    />
                    <TiriSalvezza
                      mod={modCar}
                      BComp={currentPG.bonusCompetenza}
                      stat={`Carisma`}
                    />
                  </div>
                )}
              </div>
              {/*abilità*/}
              <div className="border listAB">
                <div className="titolo border" onClick={changeViewAB}>
                  Abilità
                </div>
                {!viewerAB && (
                  <div className="viewer">
                    <Abilità
                      mod={modDes}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Acrobazia`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Addestrare animali`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Arcano`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modFor}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Atletica`}
                      stat={`for`}
                    />
                    <Abilità
                      mod={modDes}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Furtività`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Indagare`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modCar}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Inganno`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modCar}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Intimidire`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modCar}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Intrattenere`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Intuizione`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Medicina`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Natura`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Percezione`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modCar}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Persuasione`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modDes}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Rapidità di mano`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Religione`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modSag}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Sopravvivenza`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      BComp={currentPG.bonusCompetenza}
                      abilità={`Storia`}
                      stat={`int`}
                    />
                  </div>
                )}
              </div>
            </div>
            {/*linguaggi*/}
            <div className="border containerlinguaggi">
              <div className="titolo border" onClick={changeViewLingue}>
                Linguaggi conosciuti
              </div>
              <ul>
                {!viewerLingue && (
                  <div className="viewer">
                    {currentPG.linguaggi.map((linguaggio, index) => (
                      <li key={index}>{linguaggio}</li>
                    ))}
                  </div>
                )}
              </ul>
            </div>
          </Col>
          <Col
            lg={4}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="containerData border">
              <div className="border">
                Classe armatura: {currentPG.classe_armatura}
              </div>
              <div className="border">iniziativa: {currentPG.iniziativa}</div>
              <div className="border">velocità: {currentPG.velocita}</div>
              <div className="border">
                <div>PF massimi: {currentPG.pf_max}</div>
                <div>PF attuali: {currentPG.pf}</div>
                <div>PF temporanei: {currentPG.pf_temporanei}</div>
              </div>
              <div className="border">
                dado vita: {currentPG.dado_vita.dado}
              </div>
            </div>
          </Col>
          <Col
            lg={4}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="containerNote border">
              <div className="border titolo" onClick={changeViewNOTE}>
                note del personaggio
              </div>
              {!viewerNOTE && (
                <div className="viewer">
                  <div className="border">
                    <div>{currentPG.tratti_caratteriali}</div>
                    <div className="titolo">tratti caratteriali</div>
                  </div>

                  <div className="border">
                    <div>{currentPG.ideali}</div>
                    <div className="titolo">ideali</div>
                  </div>
                  <div className="border">
                    <div>{currentPG.legami}</div>
                    <div className="titolo">legami</div>
                  </div>
                  <div className="border">
                    <div>{currentPG.difetti}</div>
                    <div className="titolo">difetti</div>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Button
            variant="danger"
            onClick={() => handleClickDelete(currentPG.id)}
          >
            elimina pg
          </Button>{" "}
        </Row>
      </div>
    </>
  );
};

export default Homepage;
