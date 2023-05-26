import { Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillShieldFill } from "react-icons/bs";

import "./Homepage.scss";
import Menu from "../menu/Menu";
import Statistica from "./Statistica";
import TiriSalvezza from "./TiriSalvezza";
import Abilità from "./Abilità";
import Equipaggiamento from "./Equipaggiamento";
import Armour from "./Armour";
import Armi from "./Armi";
import Privilegio from "./Privilegio";

import shield from "../../Assets/img/shield.png";
import swords from "../../Assets/img/swords.png";
import bag from "../../Assets/img/bag.png";
import tools from "../../Assets/img/tools.png";
import escape from "../../Assets/img/escape.png";
import pen from "../../Assets/img/pen.png";
import medals from "../../Assets/img/medals.png";
import lips from "../../Assets/img/lips.png";
import idea from "../../Assets/img/idea.png";

const Homepage = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.main.myProfile);
  const token = useSelector((state) => state.main.myProfile.accessToken);
  const currentPG = useSelector((state) => state.main.PersonaggioCorrente);
  console.log("myProfile", myProfile);

  const [viewerBComp, setViewerBComp] = useState(true);
  const changeViewBComp = () => {
    setViewerBComp(!viewerBComp);
  };

  const [viewerTS, setViewerTS] = useState(true);
  const changeViewTS = () => {
    setViewerTS(!viewerTS);
  };

  const [viewerAB, setViewerAB] = useState(true);
  const changeViewAB = () => {
    setViewerAB(!viewerAB);
  };

  const [viewerNOTE, setViewerNOTE] = useState(true);
  const changeViewNOTE = () => {
    setViewerNOTE(!viewerNOTE);
  };

  const [viewerLingue, setViewerLingue] = useState(true);
  const changeViewLingue = () => {
    setViewerLingue(!viewerLingue);
  };

  const [viewerArmor, setViewerArmor] = useState(true);
  const changeViewArmor = () => {
    setViewerArmor(!viewerArmor);
  };

  const [viewerArmi, setViewerArmi] = useState(true);
  const changeViewArmi = () => {
    setViewerArmi(!viewerArmi);
  };

  const [viewerEquip, setViewerEquip] = useState(true);
  const changeViewEquip = () => {
    setViewerEquip(!viewerEquip);
  };

  const [viewerGold, setViewerGold] = useState(true);
  const changeViewGold = () => {
    setViewerGold(!viewerGold);
  };

  const [viewerComp, setViewerComp] = useState(true);
  const changeViewComp = () => {
    setViewerComp(!viewerComp);
  };

  const [viewerPET, setViewerPET] = useState(true);
  const changeViewPET = () => {
    setViewerPET(!viewerPET);
  };

  let modFor =
    currentPG !== undefined ? Math.floor((currentPG.forza - 10) / 2.0) : 0;
  let modDes =
    currentPG !== undefined ? Math.floor((currentPG.destrezza - 10) / 2.0) : 0;
  let modCos =
    currentPG !== undefined
      ? Math.floor((currentPG.costituzione - 10) / 2.0)
      : 0;
  let modInt =
    currentPG !== undefined
      ? Math.floor((currentPG.intelligenza - 10) / 2.0)
      : 0;
  let modSag =
    currentPG !== undefined ? Math.floor((currentPG.saggezza - 10) / 2.0) : 0;
  let modCar =
    currentPG !== undefined ? Math.floor((currentPG.carisma - 10) / 2.0) : 0;

  let CA;
  if (currentPG.armatura != null) {
    switch (currentPG.armatura.tipo.nome) {
      case "armatura leggera":
        CA =
          currentPG.armatura.classeArmatura +
          (currentPG.scudo != null ? currentPG.scudo.classeArmatura : 0) +
          modDes;
        break;
      case "armatura media":
        if (modDes > 2) {
          CA =
            currentPG.armatura.classeArmatura +
            (currentPG.scudo != null ? currentPG.scudo.classeArmatura : 0) +
            2;
        } else {
          CA =
            currentPG.armatura.classeArmatura +
            (currentPG.scudo != null ? currentPG.scudo.classeArmatura : 0) +
            modDes;
        }
        break;
      case "armatura pesante":
        CA =
          currentPG.armatura.classeArmatura +
          (currentPG.scudo != null ? currentPG.scudo.classeArmatura : 0);
        break;
      default:
        break;
    }
  } else {
    CA = 10 + modDes;
  }

  //calncella PG

  const [dellOK, setDellOK] = useState(false);
  const [idDel, setIdDel] = useState();

  const handleClickDelete = (p) => {
    setIdDel(p);
    setDellOK(true);
    dispatch({ type: "AGGIORNAMENTO", payload: true });
  };

  const cancellaPG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/delete/" + idDel,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setDellOK(false);
        dispatch({ type: "AGGIORNAMENTO", payload: false });
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
          <Col xs={12} lg={4}>
            <div className="nomeDelPersonaggio">
              <p>
                Nome del personaggio:
                <span>{currentPG.nomePG}</span>
              </p>
            </div>
          </Col>
          <Col xs={6} lg={4}>
            <div>
              <p>
                Classe e livello:{" "}
                <span>
                  {currentPG.classe.classe}, {currentPG.livello}
                </span>
              </p>

              <p>
                Nome del giocatore: <span>{myProfile.username}</span>
              </p>

              <p>
                Razza: <span>{currentPG.razza.razza}</span>
              </p>
            </div>
          </Col>
          <Col xs={6} lg={4}>
            <div>
              <p>
                Background: <span> {currentPG.background} </span>
              </p>

              <p>
                allineamento: <span>{currentPG.allineamento.tipo} </span>
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
            <Statistica stat={currentPG.forza} nome={`for`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.destrezza} nome={`des`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.costituzione} nome={`cos`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.intelligenza} nome={`int`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.saggezza} nome={`sag`} />
          </Col>
          <Col xs={4} md={2}>
            <Statistica stat={currentPG.carisma} nome={`car`} />
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
                  <p className="titoloIcona">
                    <img src={escape} />
                    <p>Tiri Salvezza</p>
                  </p>
                </div>
                {viewerTS && (
                  <div className="viewer">
                    <TiriSalvezza mod={modFor} pg={currentPG} stat={`forza`} />
                    <TiriSalvezza
                      mod={modDes}
                      pg={currentPG}
                      stat={`Destrezza`}
                    />
                    <TiriSalvezza
                      mod={modCos}
                      pg={currentPG}
                      stat={`Costituzione`}
                    />
                    <TiriSalvezza
                      mod={modInt}
                      pg={currentPG}
                      stat={`Intelligenza`}
                    />
                    <TiriSalvezza
                      mod={modSag}
                      pg={currentPG}
                      stat={`Saggezza`}
                    />
                    <TiriSalvezza
                      mod={modCar}
                      pg={currentPG}
                      stat={`Carisma`}
                    />
                  </div>
                )}
              </div>
              {/*abilità*/}
              <div className="border listAB">
                <div className="titolo border" onClick={changeViewAB}>
                  <p className="titoloIcona">
                    <img src={tools} />
                    <p>Abilità</p>
                  </p>
                </div>
                {viewerAB && (
                  <div className="viewer">
                    <Abilità
                      mod={modDes}
                      pg={currentPG}
                      abilità={`Acrobazia`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modSag}
                      pg={currentPG}
                      abilità={`Addestrare animali`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      pg={currentPG}
                      abilità={`Arcano`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modFor}
                      pg={currentPG}
                      abilità={`Atletica`}
                      stat={`for`}
                    />
                    <Abilità
                      mod={modDes}
                      pg={currentPG}
                      abilità={`Furtività`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modInt}
                      pg={currentPG}
                      abilità={`Indagare`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modCar}
                      pg={currentPG}
                      abilità={`Inganno`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modCar}
                      pg={currentPG}
                      abilità={`Intimidire`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modCar}
                      pg={currentPG}
                      abilità={`Intrattenere`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modSag}
                      pg={currentPG}
                      abilità={`Intuizione`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modSag}
                      pg={currentPG}
                      abilità={`Medicina`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      pg={currentPG}
                      abilità={`Natura`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modSag}
                      pg={currentPG}
                      abilità={`Percezione`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modCar}
                      pg={currentPG}
                      abilità={`Persuasione`}
                      stat={`car`}
                    />
                    <Abilità
                      mod={modDes}
                      pg={currentPG}
                      abilità={`Rapidità di mano`}
                      stat={`des`}
                    />
                    <Abilità
                      mod={modInt}
                      pg={currentPG}
                      abilità={`Religione`}
                      stat={`int`}
                    />
                    <Abilità
                      mod={modSag}
                      pg={currentPG}
                      abilità={`Sopravvivenza`}
                      stat={`sag`}
                    />
                    <Abilità
                      mod={modInt}
                      pg={currentPG}
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
                <p className="titoloIcona">
                  <img src={lips} />
                  <p>Linguaggi conosciuti</p>
                </p>
              </div>
              <ul>
                {viewerLingue && (
                  <div className="viewer">
                    {currentPG.linguaggi?.map((linguaggio, index) => (
                      <li key={index}>{linguaggio}</li>
                    ))}
                  </div>
                )}
              </ul>
            </div>
            {/*competenze*/}
            <div className="border conteinerComp">
              <div className="titolo border" onClick={changeViewComp}>
                <p className="titoloIcona">
                  <img src={idea} />
                  <p>Competenze</p>
                </p>
              </div>
              <ul>
                {viewerComp && (
                  <div className="viewer">
                    {currentPG.competenze?.map((comp, index) => (
                      <li key={index}>{comp.nome}</li>
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
                <div
                  className="border titolo d-flex wrap-nowrap"
                  onClick={changeViewArmor}
                >
                  <p className="titoloIcona">
                    <img src={shield} />
                    <p>Classe armatura: {CA}</p>
                  </p>
                </div>
                {viewerArmor && (
                  <div className="viewer">
                    {currentPG.armatura && (
                      <Armour armour={currentPG.armatura} />
                    )}
                    {currentPG.scudo && <Armour armour={currentPG.scudo} />}
                  </div>
                )}
              </div>
              <div className="border">iniziativa: {currentPG.iniziativa}</div>
              <div className="border">velocità: {currentPG.velocita}</div>
              <div className="border">
                <div>PF massimi: {currentPG.pf_max}</div>
                <div>PF attuali: {currentPG.pf}</div>
                <div>PF temporanei: {currentPG.pf_temporanei}</div>
              </div>
              <div className="border">
                dado vita: {currentPG.dado_vita?.dado}
              </div>
            </div>
            <div className="containerArmor border">
              <div className="border titolo" onClick={changeViewArmi}>
                <p className="titoloIcona">
                  <img src={swords} />
                  <p>Armi</p>
                </p>
              </div>
              {viewerArmi && (
                <div className="viewer">
                  {currentPG.armi?.map((arma, index) => (
                    <div className="border">
                      <Armi
                        key={index}
                        arma={arma}
                        modFor={modFor}
                        modDes={modDes}
                        BComp={currentPG.bonusCompetenza}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="containerQuip border">
              <div className="border titolo" onClick={changeViewEquip}>
                <p className="titoloIcona">
                  <img src={bag} />
                  <p>Equipaggiamento</p>
                </p>
              </div>
              {viewerEquip && (
                <div className="viewer">
                  {/* mappare l'equip */}
                  {currentPG.equipaggiamentoBase?.map(
                    (equipaggiamento, index) => (
                      <div className="border">
                        <Equipaggiamento key={index} equip={equipaggiamento} />
                      </div>
                    )
                  )}
                </div>
              )}
              <div className="border titolo" onClick={changeViewGold}>
                <p className="titoloIcona">
                  <img src={shield} />
                  <p>Ricchezza</p>
                </p>
              </div>
              {viewerGold && (
                <div className="viewer">
                  <div>MR: {currentPG.monete_rame}</div>
                  <div>MA: {currentPG.monete_argento}</div>
                  <div>MO: {currentPG.monete_oro}</div>
                  <div>MP: {currentPG.monete_platino}</div>
                </div>
              )}
            </div>
          </Col>
          <Col
            lg={4}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="containerNote border">
              <div className="border titolo" onClick={changeViewNOTE}>
                <p className="titoloIcona">
                  <img src={pen} />
                  <p>Note del personaggio</p>
                </p>
              </div>
              {viewerNOTE && (
                <div className="viewer">
                  <div className="border">
                    <div>{currentPG.background}</div>
                    <div className="titolo">background</div>
                  </div>
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
            <div className="border conteinerComp">
              <div className="titolo border" onClick={changeViewPET}>
                <p className="titoloIcona">
                  <img src={medals} />
                  <p>Privilegi e tratti</p>
                </p>
              </div>
              <ul>
                {viewerPET && (
                  <div className="viewer">
                    {currentPG.privilegi?.map((privilegio, index) => (
                      <li key={index}>
                        {" "}
                        <Privilegio index={index} privilegio={privilegio} />
                      </li>
                    ))}
                  </div>
                )}
              </ul>
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
