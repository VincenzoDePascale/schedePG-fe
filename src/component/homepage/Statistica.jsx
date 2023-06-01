import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Statistica.scss";

const Statistica = ({ stat, nome }) => {
  let mod = Math.floor((stat - 10) / 2.0);

  const [result, setResult] = useState();
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    const result = mod + randomNum;
    setResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  let nomeCompleto;

  switch (nome) {
    case "for":
      nomeCompleto = "forza";
      break;
    case "des":
      nomeCompleto = "destrezza";
      break;
    case "cos":
      nomeCompleto = "costituzione";
      break;
    case "int":
      nomeCompleto = "intelligenza";
      break;
    case "sag":
      nomeCompleto = "saggezza";
      break;
    case "car":
      nomeCompleto = "carisma";
      break;
    default:
      break;
  }

  return (
    <>
      <div className="centro" onClick={handleClick}>
        <div className="box">
          <div className="statistica">{nome}</div>
          <div className="modificatore">{mod}</div>
          <div className="punteggio">{stat}</div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>tiro su: {nomeCompleto}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Il risultato è: {result}</Modal.Body>
      </Modal>
    </>
  );
};

export default Statistica;
