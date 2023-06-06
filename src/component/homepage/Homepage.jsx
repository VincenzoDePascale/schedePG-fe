import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Homepage.scss";
import Menu from "../menu/Menu";
import Statistica from "./Statistica";
import TiriSalvezza from "./TiriSalvezza";
import Abilità from "./Abilità";
import Equipaggiamento from "./Equipaggiamento";
import Armour from "./Armour";
import Armi from "./Armi";
import Privilegio from "./Privilegio";
import PaginaIncantesimi from "./PaginaIncantesimi";

import shield from "../../Assets/img/shield.png";
import swords from "../../Assets/img/swords.png";
import bag from "../../Assets/img/bag.png";
import tools from "../../Assets/img/tools.png";
import escape from "../../Assets/img/escape.png";
import pen from "../../Assets/img/pen.png";
import medals from "../../Assets/img/medals.png";
import lips from "../../Assets/img/lips.png";
import idea from "../../Assets/img/idea.png";
import money from "../../Assets/img/money.png";
import close from "../../Assets/img/close.png";
import lightbulb from "../../Assets/img/lightbulb.png";
import pencil from "../../Assets/img/pencil.png";
import heart from "../../Assets/img/heart.png";
import editing from "../../Assets/img/editing.png";
import { Navigate, useNavigate } from "react-router-dom";

const Homepage = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.main.myProfile);
  const token = useSelector((state) => state.main.myProfile.accessToken);
  const currentPG = useSelector((state) => state.main.PersonaggioCorrente);

  const navigate = useNavigate();

  console.log("myProfile", myProfile);

  const [viewerTS, setViewerTS] = useState(true);
  const changeViewTS = () => {
    setViewerTS(!viewerTS);
  };

  const [viewerVita, setViewerVita] = useState(true);
  const changeViewVita = () => {
    setViewerVita(!viewerVita);
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

  // calcolo percezione passiva

  let percezionePassiva = 0;
  let BonusComp = currentPG?.bonusCompetenza;

  if (currentPG?.abilitaAttive?.includes(`Percezione`)) {
    percezionePassiva = 10 + modSag + BonusComp;
  } else {
    percezionePassiva = 10 + modSag;
  }

  // punti esperienza per salire al prossimo livello

  const pxLivello = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
    120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000,
  ];

  // calcolo classe armatura

  let CA;
  if (currentPG?.armatura != null) {
    switch (currentPG?.armatura?.tipo?.nome) {
      case "armatura leggera":
        CA =
          currentPG?.armatura?.classeArmatura +
          (currentPG?.scudo != null ? currentPG?.scudo?.classeArmatura : 0) +
          modDes;
        break;
      case "armatura media":
        if (modDes > 2) {
          CA =
            currentPG?.armatura?.classeArmatura +
            (currentPG?.scudo != null ? currentPG?.scudo?.classeArmatura : 0) +
            2;
        } else {
          CA =
            currentPG?.armatura?.classeArmatura +
            (currentPG?.scudo != null ? currentPG?.scudo?.classeArmatura : 0) +
            modDes;
        }
        break;
      case "armatura pesante":
        CA =
          currentPG?.armatura?.classeArmatura +
          (currentPG?.scudo != null ? currentPG?.scudo?.classeArmatura : 0);
        break;
      default:
        break;
    }
  } else {
    CA =
      10 +
      modDes +
      (currentPG?.scudo != null ? currentPG.scudo?.classeArmatura : 0);
  }

  // logica modale modifica statistiche

  const [showModalStatistiche, setShowModalStatistiche] = useState(false);
  const handleCloseModalStatistiche = () => setShowModalStatistiche(false);
  const handleShowModalStatistiche = () => setShowModalStatistiche(true);

  const clickModStatistiche = () => {
    setModStatistiche(true);
  };

  const [modStatistiche, setModStatistiche] = useState(false);
  const [newForza, setNewForza] = useState(currentPG?.forza);
  const [newDestrezza, setNewDestrezza] = useState(currentPG?.destrezza);
  const [newCostituzione, setNewCostituzione] = useState(
    currentPG?.costituzione
  );
  const [newIntelligenza, setNewIntelligenza] = useState(
    currentPG?.intelligenza
  );
  const [newSaggezza, setNewSaggezza] = useState(currentPG?.saggezza);
  const [newCarisma, setNewCarisma] = useState(currentPG?.carisma);

  const modificaStatistiche = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeStatistiche",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            forza: newForza,
            destrezza: newDestrezza,
            costituzione: newCostituzione,
            intelligenza: newIntelligenza,
            saggezza: newSaggezza,
            carisma: newCarisma,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalStatistiche(false);
        setModStatistiche(false);
      } else {
        setShowModalStatistiche(false);
        setModStatistiche(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    setNewForza(currentPG?.forza);
    setNewDestrezza(currentPG?.destrezza);
    setNewCostituzione(currentPG?.costituzione);
    setNewIntelligenza(currentPG?.intelligenza);
    setNewSaggezza(currentPG?.saggezza);
    setNewCarisma(currentPG?.carisma);
  }, [currentPG]);

  useEffect(() => {
    if (modStatistiche === true) {
      modificaStatistiche();
    }
  }, [modStatistiche]);

  // modifica ispirazione

  const [viewerIspirazione, setViewerIspirazione] = useState(false);
  const changeViewIspirazione = () => {
    setViewerIspirazione(!viewerIspirazione);
  };

  const [newIspirazione, setNewIspirazione] = useState(currentPG?.ispirazione);

  const attivaIspirazione = () => {
    setNewIspirazione(!currentPG?.ispirazione);
    modificaIspirazione();
  };

  const modificaIspirazione = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeIspirazione",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            ispirazione: newIspirazione,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalLinguaggi(false);
        setModLinguaggi(false);
      } else {
        setShowModalLinguaggi(false);
        setModLinguaggi(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (viewerIspirazione === true) {
      attivaIspirazione();
    }
  }, [viewerIspirazione]);

  // modifica tiri salvezza

  const [showModalTS, setShowModalTS] = useState(false);
  const handleCloseModalTS = () => setShowModalTS(false);
  const handleShowModalTS = () => setShowModalTS(true);

  const clickModTS = () => {
    setModTS(true);
  };

  const [modTS, setModTS] = useState(false);
  const [newTS, setNewTS] = useState([]);

  const modificaTS = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pg/upgradeTS", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPg: currentPG?.id,
          tiriSalvezza: newTS,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalTS(false);
        setModTS(false);
      } else {
        setShowModalTS(false);
        setModTS(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (modTS === true) {
      modificaTS();
    }
  }, [modTS]);

  // modifica abilità

  const [showModalAbilita, setShowModalAbilita] = useState(false);
  const handleCloseModalAbilita = () => setShowModalAbilita(false);
  const handleShowModalAbilita = () => setShowModalAbilita(true);

  const clickModAbilita = () => {
    setModAbilita(true);
  };

  const [modAbilita, setModAbilita] = useState(false);
  const [newAbilita, setNewAbilita] = useState([]);

  const modificaAbilita = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeAbilita",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            abilita: newAbilita,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalAbilita(false);
        setModAbilita(false);
      } else {
        setShowModalAbilita(false);
        setModAbilita(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (modAbilita === true) {
      modificaAbilita();
    }
  }, [modAbilita]);

  // modifica linguaggi

  const [showModalLinguaggi, setShowModalLinguaggi] = useState(false);
  const handleCloseModalLinguaggi = () => setShowModalLinguaggi(false);
  const handleShowModalLinguaggi = () => setShowModalLinguaggi(true);

  const clickModLinguaggi = () => {
    setModLinguaggi(true);
  };

  const [modLinguaggi, setModLinguaggi] = useState(false);
  const [newLinguaggi, setNewLinguaggi] = useState([]);

  const modificaLinguaggi = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeLingue",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            linguaggi: newLinguaggi,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalLinguaggi(false);
        setModLinguaggi(false);
      } else {
        setShowModalLinguaggi(false);
        setModLinguaggi(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (modLinguaggi === true) {
      modificaLinguaggi();
    }
  }, [modLinguaggi]);

  // logica modale competenze

  const [showModalCompetenze, setShowModalCompetenze] = useState(false);
  const handleCloseModalCompetenze = () => setShowModalCompetenze(false);
  const handleShowModalCompetenze = () => setShowModalCompetenze(true);

  const clickModCompetenze = () => {
    setModCompetenze(true);
  };

  const [modCompetenze, setModCompetenze] = useState(false);
  const [newCompetenze, setNewCompetenze] = useState([]);

  const modificaCompetenze = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeCompetenze",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            competenze: newCompetenze,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalCompetenze(false);
        setModCompetenze(false);
      } else {
        setShowModalCompetenze(false);
        setModCompetenze(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (modCompetenze === true) {
      modificaCompetenze();
    }
  }, [modCompetenze]);

  // logica modale selezione armatura e scudi

  const [showModalArmor, setShowModalArmor] = useState(false);
  const handleCloseModalArmor = () => setShowModalArmor(false);
  const handleShowModalArmor = () => setShowModalArmor(true);

  const clickModArmor = () => {
    setModArmatura(true);
  };

  const [modArmatura, setModArmatura] = useState(false);
  const [newArmatura, setNewArmatura] = useState(currentPG?.armatura?.nome);
  const [newScudo, setNewScudo] = useState(currentPG?.scudo?.nome);

  const modificaArmor = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeArmor",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            armatura: newArmatura,
            scudo: newScudo,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalArmor(false);
        setModArmatura(false);
      } else {
        setShowModalArmor(false);
        setModArmatura(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    setNewArmatura(currentPG?.armatura?.nome);
    if (currentPG?.scudo?.nome == null) {
      setNewScudo("");
    } else {
      setNewScudo(currentPG?.scudo?.nome);
    }
  }, [currentPG]);

  useEffect(() => {
    if (modArmatura === true) {
      modificaArmor();
    }
  }, [modArmatura]);

  // logica modale modifica vita

  const [showModalVita, setShowModalVita] = useState(false);
  const handleCloseModalVita = () => setShowModalVita(false);
  const handleShowModalVita = () => setShowModalVita(true);

  const clickModVita = () => {
    setModVita(true);
  };

  const [modVita, setModVita] = useState(false);
  const [newPfMassimi, setNewPfMassimi] = useState(currentPG?.pf_max);
  const [newPfAttuali, setNewPfAttuali] = useState(currentPG?.pf);
  const [newPfTemporanei, setNewPfTemporanei] = useState(
    currentPG?.pf_temporanei
  );

  const modificaVita = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pg/upgradeVita", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPg: currentPG.id,
          pfMassimi: newPfMassimi,
          pfAttuali: newPfAttuali,
          pfTemporanei: newPfTemporanei,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalVita(false);
        setModVita(false);
      } else {
        setShowModalVita(false);
        setModVita(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    setNewPfMassimi(currentPG?.pf_max);
    setNewPfAttuali(currentPG?.pf);
    setNewPfTemporanei(currentPG?.pf_temporanei);
  }, [currentPG]);

  useEffect(() => {
    if (modVita === true) {
      modificaVita();
    }
  }, [modVita]);

  // logica modale modifica ricchezza

  const [showModalMonete, setShowModalMonete] = useState(false);
  const handleCloseModalMonete = () => setShowModalMonete(false);
  const handleShowModalMonete = () => setShowModalMonete(true);

  const clickModMonete = () => {
    setModMonete(true);
  };

  const [modMonete, setModMonete] = useState(false);
  const [newMR, setNewMR] = useState(currentPG?.monete_rame);
  const [newMA, setNewMA] = useState(currentPG?.monete_argento);
  const [newMO, setNewMO] = useState(currentPG?.monete_oro);
  const [newMP, setNewMP] = useState(currentPG?.monete_platino);

  const modificaMonete = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/upgradeMonete",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idPg: currentPG?.id,
            moneteRame: newMR,
            moneteArgento: newMA,
            moneteOro: newMO,
            monetePlatino: newMP,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalMonete(false);
        setModMonete(false);
      } else {
        setShowModalMonete(false);
        setModMonete(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    setNewMR(currentPG?.monete_rame);
    setNewMA(currentPG?.monete_argento);
    setNewMO(currentPG?.monete_oro);
    setNewMP(currentPG?.monete_platino);
  }, [currentPG]);

  useEffect(() => {
    if (modMonete === true) {
      modificaMonete();
    }
  }, [modMonete]);

  // logica modifica note del personaggio

  const [showModalNote, setShowModalNote] = useState(false);
  const handleCloseModalNote = () => setShowModalNote(false);
  const handleShowModalNote = () => setShowModalNote(true);

  const clickModNote = () => {
    setModNote(true);
  };

  const [modNote, setModNote] = useState(false);
  const [newBackground, setNewBackground] = useState(currentPG?.background);
  const [newTrattiCaratteriali, setNewTrattiCaratteriali] = useState(
    currentPG?.tratti_caratteriali
  );
  const [newIdeali, setNewIdeali] = useState(currentPG?.ideali);
  const [newLegami, setNewLegami] = useState(currentPG?.legami);
  const [newDifetti, setNewDifetti] = useState(currentPG?.difetti);

  const modificaNote = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pg/upgradeNote", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idPg: currentPG?.id,
          background: newBackground,
          tratti_caratteriali: newTrattiCaratteriali,
          ideali: newIdeali,
          legami: newLegami,
          difetti: newDifetti,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        await dispatch({ type: "SET_PG", payload: data });
        setShowModalNote(false);
        setModNote(false);
      } else {
        setShowModalNote(false);
        setModNote(false);
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    setNewBackground(currentPG?.background);
    setNewTrattiCaratteriali(currentPG?.tratti_caratteriali);
    setNewIdeali(currentPG?.ideali);
    setNewLegami(currentPG?.legami);
    setNewDifetti(currentPG?.difetti);
  }, [currentPG]);

  useEffect(() => {
    if (modNote === true) {
      modificaNote();
    }
  }, [modNote]);

  //visibilità pagina incantesimi

  const [siInsantesimi, setSiIncantesimi] = useState(false);

  useEffect(() => {
    switch (currentPG?.classe?.classe) {
      case "bardo":
        setSiIncantesimi(true);
        break;
      case "chierico":
        setSiIncantesimi(true);
        break;
      case "druido":
        setSiIncantesimi(true);
        break;
      case "mago":
        setSiIncantesimi(true);
        break;
      case "stregone":
        setSiIncantesimi(true);
        break;
      case "warlock":
        setSiIncantesimi(true);
        break;
      default:
        setSiIncantesimi(false);
    }
  }, [currentPG]);

  // calncella PG

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
        alert("il pg è stato cancellato");
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
      {currentPG && (
        <div className="contAll">
          {/* intestazione */}
          <Row className="intestazione">
            <Col xs={12} lg={4}>
              <div className="nomeDelPersonaggio">
                <p>
                  <span className="parametro">Nome del personaggio:</span>{" "}
                  <span className="nomePG">{currentPG?.nomePG}</span>
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <p>
                  <span className="parametro">Classe e livello:</span>{" "}
                  <span className="valore">
                    {currentPG?.classe?.classe}, {currentPG?.livello}
                  </span>
                </p>

                <p>
                  <span className="parametro">Razza:</span>{" "}
                  <span className="valore">{currentPG?.razza?.razza}</span>
                </p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <p>
                  <span className="parametro">allineamento:</span>{" "}
                  <span className="valore">
                    {currentPG?.allineamento?.tipo}{" "}
                  </span>
                </p>
                <p>
                  <span className="parametro">Punti espezienza:</span>{" "}
                  <span className="valore">
                    {currentPG?.puntiExp} / {pxLivello[currentPG?.livello]}{" "}
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          {/* statistiche */}
          <Row className="statistiche">
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.forza} nome={`for`} />
            </Col>
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.destrezza} nome={`des`} />
            </Col>
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.costituzione} nome={`cos`} />
            </Col>
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.intelligenza} nome={`int`} />
            </Col>
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.saggezza} nome={`sag`} />
            </Col>
            <Col xs={4} md={2}>
              <Statistica stat={currentPG?.carisma} nome={`car`} />
            </Col>
            <img
              className="modifica"
              src={editing}
              onClick={handleShowModalStatistiche}
            />
          </Row>

          <Row className="page">
            <Col lg={4} className="colonna">
              <div className="containerTS border m-0">
                {/*ispirazione*/}
                <div className="isp border" onClick={changeViewIspirazione}>
                  <span>Ispirazione</span>
                  {viewerIspirazione && (
                    <span>
                      {currentPG?.ispirazione}
                      <img src={lightbulb} alt="hai ispirazione" />
                    </span>
                  )}
                  {!viewerIspirazione && (
                    <span>
                      {currentPG?.ispirazione}
                      <img src={close} alt="non hai ispirazione" />
                    </span>
                  )}
                </div>
                {/*bonus competenza*/}
                <div className="BComp border">
                  <span>Bonus competenza</span>
                  <span>{currentPG?.bonusCompetenza}</span>
                </div>
                {/*tiri salvezza*/}
                <div className="border listTS">
                  <div className="titolo border">
                    <p className="titoloIcona">
                      <img src={escape} alt="Tiri Salvezza" />
                      <span onClick={changeViewTS}>Tiri Salvezza</span>
                      <img
                        src={pencil}
                        alt="cambio classe armatura"
                        onClick={handleShowModalTS}
                      />
                    </p>
                  </div>
                  {viewerTS && (
                    <div className="viewer">
                      <TiriSalvezza
                        mod={modFor}
                        pg={currentPG}
                        stat={`forza`}
                      />
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
                  <div className="titolo border">
                    <p className="titoloIcona">
                      <img src={tools} alt="Abilità" />
                      <span onClick={changeViewAB}>Abilità</span>
                      <img
                        src={pencil}
                        alt="cambio classe armatura"
                        onClick={handleShowModalAbilita}
                      />
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
                {/*percezione passiva*/}
                <div className="BComp border">
                  <span>Percezione passiva</span>
                  <span>{percezionePassiva}</span>
                </div>
              </div>
              {/*linguaggi*/}
              <div className="border containerlinguaggi">
                <div className="titolo border" onClick={changeViewLingue}>
                  <p className="titoloIcona">
                    <img src={lips} alt="Linguaggi conosciuti" />
                    <span onClick={changeViewLingue}>Linguaggi conosciuti</span>
                    <img
                      src={pencil}
                      alt="cambio classe armatura"
                      onClick={handleShowModalLinguaggi}
                    />
                  </p>
                </div>
                <ul>
                  {viewerLingue && (
                    <div className="viewer">
                      {currentPG?.linguaggi?.map((linguaggio, index) => (
                        <li key={index}>{linguaggio.lingua}</li>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
              {/*competenze*/}
              <div className="border conteinerComp">
                <div className="titolo border">
                  <p className="titoloIcona">
                    <img src={idea} alt="Competenze" />
                    <span onClick={changeViewComp}>Competenze</span>
                    <img
                      src={pencil}
                      alt="cambio classe armatura"
                      onClick={handleShowModalCompetenze}
                    />
                  </p>
                </div>
                <ul>
                  {viewerComp && (
                    <div className="viewer">
                      {currentPG?.competenze?.map((comp, index) => (
                        <li key={index}>{comp.nome}</li>
                      ))}
                    </div>
                  )}
                </ul>
              </div>
            </Col>
            <Col lg={4} className="colonna">
              {/*armatura, iniziativa, velocità, pf, dado vita*/}
              <div className="containerData border">
                <div className="border">
                  <div className="border titolo">
                    <p className="titoloIcona">
                      <img src={shield} alt="Classe armatura" />
                      <span onClick={changeViewArmor}>
                        Classe armatura: {CA}
                      </span>
                      <img
                        src={pencil}
                        alt="cambio classe armatura"
                        onClick={handleShowModalArmor}
                      />
                    </p>
                  </div>
                  {viewerArmor && (
                    <div className="viewer">
                      {currentPG?.armatura && (
                        <Armour armour={currentPG?.armatura} />
                      )}
                      {currentPG?.scudo && <Armour armour={currentPG?.scudo} />}
                    </div>
                  )}
                </div>
                <div className="border">
                  iniziativa: {currentPG?.iniziativa}
                </div>
                <div className="border">velocità: {currentPG?.velocita}</div>
                <div className="border">
                  <div className="border titolo">
                    <p className="titoloIcona">
                      <img src={heart} alt="cuore" />
                      <span onClick={changeViewVita}>Vita</span>
                      <img
                        src={pencil}
                        alt="modifica la tua vita"
                        onClick={handleShowModalVita}
                      />
                    </p>
                  </div>
                  {viewerVita && (
                    <div className="viewer">
                      <div>PF massimi: {currentPG?.pf_max}</div>
                      <div>PF attuali: {currentPG?.pf}</div>
                      <div>PF temporanei: {currentPG?.pf_temporanei}</div>
                    </div>
                  )}
                </div>
                <div className="border">
                  dado vita: {currentPG?.dado_vita?.dado}
                </div>
              </div>
              {/*armi*/}
              <div className="containerArmor border">
                <div className="border titolo" onClick={changeViewArmi}>
                  <p className="titoloIcona">
                    <img src={swords} alt="Armi" />
                    <span>Armi</span>
                  </p>
                </div>
                {viewerArmi && (
                  <div className="viewer">
                    {currentPG?.armi?.map((arma, index) => (
                      <div className="border">
                        <Armi
                          key={index}
                          arma={arma}
                          modFor={modFor}
                          modDes={modDes}
                          BComp={currentPG?.bonusCompetenza}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/*equipaggiamento, ricchezza*/}
              <div className="containerQuip border">
                <div className="border titolo" onClick={changeViewEquip}>
                  <p className="titoloIcona">
                    <img src={bag} alt="Equipaggiamento" />
                    <span>Equipaggiamento</span>
                  </p>
                </div>
                {viewerEquip && (
                  <div className="viewer">
                    {currentPG?.equipaggiamentoBase?.map(
                      (equipaggiamento, index) => (
                        <div className="border">
                          <Equipaggiamento
                            key={index}
                            equip={equipaggiamento}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="border titolo">
                  <p className="titoloIcona">
                    <img src={money} alt="Ricchezza" />
                    <span onClick={changeViewGold}>Ricchezza</span>
                    <img
                      src={pencil}
                      alt="cambio classe armatura"
                      onClick={handleShowModalMonete}
                    />
                  </p>
                </div>
                {viewerGold && (
                  <div className="viewer">
                    <div>MR: {currentPG?.monete_rame}</div>
                    <div>MA: {currentPG?.monete_argento}</div>
                    <div>MO: {currentPG?.monete_oro}</div>
                    <div>MP: {currentPG?.monete_platino}</div>
                  </div>
                )}
              </div>
            </Col>
            <Col lg={4} className="colonna">
              {/*note del personaggio*/}
              <div className="containerNote border">
                <div className="border titolo">
                  <p className="titoloIcona">
                    <img src={pen} alt="Note del personaggio" />
                    <span onClick={changeViewNOTE}>Note del personaggio</span>
                    <img
                      src={pencil}
                      alt="cambio classe armatura"
                      onClick={handleShowModalNote}
                    />
                  </p>
                </div>
                {viewerNOTE && (
                  <div className="viewer">
                    <div className="border">
                      <div className="testo">{currentPG?.background}</div>
                      <div className="titolo">background</div>
                    </div>
                    <div className="border">
                      <div className="testo">
                        {currentPG?.tratti_caratteriali}
                      </div>
                      <div className="titolo">tratti caratteriali</div>
                    </div>

                    <div className="border">
                      <div className="testo">{currentPG?.ideali}</div>
                      <div className="titolo">ideali</div>
                    </div>
                    <div className="border">
                      <div className="testo">{currentPG?.legami}</div>
                      <div className="titolo">legami</div>
                    </div>
                    <div className="border">
                      <div className="testo">{currentPG?.difetti}</div>
                      <div className="titolo">difetti</div>
                    </div>
                  </div>
                )}
              </div>
              {/*privilegi e tratti*/}
              <div className="border conteinerComp">
                <div className="titolo border" onClick={changeViewPET}>
                  <p className="titoloIcona">
                    <img src={medals} alt="Privilegi e tratti" />
                    <span>Privilegi e tratti</span>
                  </p>
                </div>
                <ul>
                  {viewerPET && (
                    <div className="viewer">
                      {currentPG?.privilegi?.map((privilegio, index) => (
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

          {siInsantesimi && (
            <div>
              <PaginaIncantesimi currentPG={currentPG} />
            </div>
          )}

          <Row className="options">
            <Col lg={4}>
              <Button
                variant="danger"
                onClick={() => handleClickDelete(currentPG?.id)}
              >
                elimina pg
              </Button>
            </Col>
          </Row>
        </div>
      )}

      {/* modale modifica statistiche */}
      <Modal show={showModalStatistiche} onHide={handleCloseModalStatistiche}>
        <Modal.Header closeButton>
          <Modal.Title>Spendi o guadagna monete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="forza">
            <Form.Label>Forza</Form.Label>
            <div className="d-flex">
              <Form.Control
                className="flex-grow-1"
                type="number"
                placeholder="Inserisci il valore della forza"
                value={newForza}
                onChange={(e) => setNewForza(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="destrezza">
            <Form.Label>Destrezza</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della destrezza"
                value={newDestrezza}
                onChange={(e) => setNewDestrezza(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="costituzione">
            <Form.Label>Costituzione</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della costituzione"
                value={newCostituzione}
                onChange={(e) => setNewCostituzione(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="intelligenza">
            <Form.Label>Intelligenza</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="Inserisci il valore dell'intelligenza"
                value={newIntelligenza}
                onChange={(e) => setNewIntelligenza(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="saggezza">
            <Form.Label>Saggezza</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della saggezza"
                value={newSaggezza}
                onChange={(e) => setNewSaggezza(e.target.value)}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="carisma">
            <Form.Label>Carisma</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="number"
                placeholder="Inserisci il valore del carisma"
                value={newCarisma}
                onChange={(e) => setNewCarisma(e.target.value)}
              />
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalStatistiche}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModStatistiche()}>
            conferma nuove statistiche
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica armatura e scudi */}
      <Modal show={showModalArmor} onHide={handleCloseModalArmor}>
        <Modal.Header closeButton>
          <Modal.Title>Crea il tuo nuovo Pg</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="armatura">
            <Form.Label>Seleziona la nuova armatura</Form.Label>
            <Form.Select
              value={newArmatura}
              onChange={(e) => setNewArmatura(e.target.value)}
            >
              <option value="armatura imbottita">Armatura imbottita</option>
              <option value="armatura cuoio">armatura cuoio</option>
              <option value="cuoio borchiato">cuoio borchiato</option>
              <option value="armatura di pelle">armatura di pelle</option>
              <option value="giaco di maglia">giaco di maglia</option>
              <option value="corazza di scaglie">corazza di scaglie</option>
              <option value="corazza di piastre">corazza di piastre</option>
              <option value="mezza armatura">mezza armatura</option>
              <option value="corazza ad anelli">corazza ad anelli</option>
              <option value="cotta di maglia">cotta di maglia</option>
              <option value="corazza a strisce">corazza a strisce</option>
              <option value="armatura completa">armatura completa</option>
              <option value="">rimuovi armatura</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="scudo">
            <Form.Label>Seleziona il nuovo scudo</Form.Label>
            <Form.Select
              value={newScudo}
              onChange={(e) => setNewScudo(e.target.value)}
            >
              <option value="scudo">scudo</option>
              <option value="">Rimuovi scudo</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalArmor}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModArmor()}>
            Cambia equipaggiamento
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica tiriSalvezza */}
      <Modal show={showModalTS} onHide={handleCloseModalTS}>
        <Modal.Header closeButton>
          <Modal.Title>Selezione i ts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="tiriSalvezza">
            <Form.Label>tutti i tiri salvezza</Form.Label>
            <Form.Select
              multiple
              value={newTS}
              onChange={(e) =>
                setNewTS(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="forza">forza</option>
              <option value="destrezza">destrezza</option>
              <option value="costituzione">costituzione</option>
              <option value="intelligenza">intelligenza</option>
              <option value="saggezza">saggezza</option>
              <option value="carisma">carisma</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalTS}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModTS()}>
            modica TS
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica tiriSalvezza */}
      <Modal show={showModalAbilita} onHide={handleCloseModalAbilita}>
        <Modal.Header closeButton>
          <Modal.Title>Selezione le abilità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="abilita">
            <Form.Label>tutte le abilità</Form.Label>
            <Form.Select
              multiple
              value={newAbilita}
              onChange={(e) =>
                setNewAbilita(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="Acrobazia">Acrobazia</option>
              <option value="Addestrare animali">Addestrare animali</option>
              <option value="Arcano">Arcano</option>
              <option value="Atletica">Atletica</option>
              <option value="Furtività">Furtività</option>
              <option value="Indagare">Indagare</option>
              <option value="Inganno">Inganno</option>
              <option value="Intimidire">Intimidire</option>
              <option value="Intrattenere">Intrattenere</option>
              <option value="Intuizione">Intuizione</option>
              <option value="Medicina">Medicina</option>
              <option value="Natura">Natura</option>
              <option value="Percezione">Percezione</option>
              <option value="Persuasione">Persuasione</option>
              <option value="Rapidità di mano">Rapidità di mano</option>
              <option value="Religione">Religione</option>
              <option value="Sopravvivenza">Sopravvivenza</option>
              <option value="Storia">Storia</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAbilita}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModAbilita()}>
            modica Abilità
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica linguaggi */}
      <Modal show={showModalLinguaggi} onHide={handleCloseModalLinguaggi}>
        <Modal.Header closeButton>
          <Modal.Title>Selezione linguaggi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="linguaggi">
            <Form.Label>Linguaggi di questo mondo</Form.Label>
            <Form.Select
              multiple
              value={newLinguaggi}
              onChange={(e) =>
                setNewLinguaggi(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="comune">comune</option>
              <option value="elfico">elfico</option>
              <option value="gigante">gigante</option>
              <option value="gnomesco">gnomesco</option>
              <option value="golblin">golblin</option>
              <option value="halfling">halfling</option>
              <option value="nanico">nanico</option>
              <option value="orchesco">orchesco</option>
              <option value="abissale">abissale</option>
              <option value="celestiale">celestiale</option>
              <option value="draconico">draconico</option>
              <option value="gergo delle profondità">
                gergo delle profondità
              </option>
              <option value="infernale">infernale</option>
              <option value="primordiale">primordiale</option>
              <option value="silvano">silvano</option>
              <option value="sottocomune">sottocomune</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalLinguaggi}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModLinguaggi()}>
            apprendi linguaggi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica competenze */}
      <Modal show={showModalCompetenze} onHide={handleCloseModalCompetenze}>
        <Modal.Header closeButton>
          <Modal.Title>Selezione Competenze</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="competenze">
            <Form.Label>Tutte le competenze </Form.Label>
            <Form.Select
              multiple
              value={newCompetenze}
              onChange={(e) =>
                setNewCompetenze(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="base">base</option>
              <option value="focus arcano">focus arcano</option>
              <option value="focus druidico">focus druidico</option>
              <option value="simbolo sacro">simbolo sacro</option>
              <option value="armatura leggera">armatura leggera</option>
              <option value="armatura media">armatura media</option>
              <option value="armatura pesante">armatura pesante</option>
              <option value="scudo">scudo</option>
              <option value="pozione">pozione</option>
              <option value="gioco">gioco</option>
              <option value="strumento">strumento</option>
              <option value="strumento musicale">strumento musicale</option>
              <option value="strumento da artigiano">
                strumento da artigiano
              </option>
              <option value="arma da mischia semplice">
                arma da mischia semplice
              </option>
              <option value="arma a distanza semplice">
                arma a distanza semplice
              </option>
              <option value="arma da mischia da guerra">
                arma da mischia da guerra
              </option>
              <option value="arma a distanza da guerra">
                arma a distanza da guerra
              </option>
              <option value="balestra a mano">balestra a mano</option>
              <option value="balestra leggera">balestra leggera</option>
              <option value="balestra pesante">balestra pesante</option>
              <option value="spada corta">spada corta</option>
              <option value="spada lunga">spada lunga</option>
              <option value="stocco">stocco</option>
              <option value="bastone ferrato">bastone ferrato</option>
              <option value="dardo">dardo</option>
              <option value="falcetto">falcetto</option>
              <option value="fionda">fionda</option>
              <option value="giavellotto">giavellotto</option>
              <option value="lancia">lancia</option>
              <option value="mazza">mazza</option>
              <option value="pugnale">pugnale</option>
              <option value="randello">randello</option>
              <option value="scimitarra">scimitarra</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalCompetenze}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModCompetenze()}>
            apprendi linguaggi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica vita */}
      <Modal show={showModalVita} onHide={handleCloseModalVita}>
        <Modal.Header closeButton>
          <Modal.Title>inserisci i danni o usa le pozioni</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="pfMassimi">
            <Form.Label>pf massimi</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete di rame"
              value={newPfMassimi}
              onChange={(e) => setNewPfMassimi(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pfAttuali">
            <Form.Label>pf attuali</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete di rame"
              value={newPfAttuali}
              onChange={(e) => setNewPfAttuali(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pfTemporanei">
            <Form.Label>pf temporanei</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete d'argento"
              value={newPfTemporanei}
              onChange={(e) => setNewPfTemporanei(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalVita}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModVita()}>
            conferma
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica monete */}
      <Modal show={showModalMonete} onHide={handleCloseModalMonete}>
        <Modal.Header closeButton>
          <Modal.Title>Spendi o guadagna monete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="moneteRame">
            <Form.Label>monete di rame</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete di rame"
              value={newMR}
              onChange={(e) => setNewMR(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="moneteArgento">
            <Form.Label>monete d'argento'</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete d'argento"
              value={newMA}
              onChange={(e) => setNewMA(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="moneteOro">
            <Form.Label>monete d'oro</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci le monete d'oro"
              value={newMO}
              onChange={(e) => setNewMO(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="monetePlatino">
            <Form.Label>monete di platino</Form.Label>
            <Form.Control
              type="number"
              placeholder="inserisci le monete di platino"
              value={newMP}
              onChange={(e) => setNewMP(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalMonete}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModMonete()}>
            termina gli acquisti
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modale modifica note del pg */}
      <Modal show={showModalNote} onHide={handleCloseModalNote}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica note del personaggio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="Background">
              <Form.Label>Background</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il background"
                value={newBackground}
                onChange={(e) => setNewBackground(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tratti caratteriali">
              <Form.Label>tratti caratteriali</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci i tratti caratteriali"
                value={newTrattiCaratteriali}
                onChange={(e) => setNewTrattiCaratteriali(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Ideali">
              <Form.Label>Ideali</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci gli ideali"
                value={newIdeali}
                onChange={(e) => setNewIdeali(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Legami">
              <Form.Label>Legami</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci i legami"
                value={newLegami}
                onChange={(e) => setNewLegami(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Difetti">
              <Form.Label>Difetti</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci i difetti"
                value={newDifetti}
                onChange={(e) => setNewDifetti(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalNote}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickModNote()}>
            conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Homepage;
