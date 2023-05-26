import { useState } from "react";
import { Modal } from "react-bootstrap";

import "./Armour.scss";

const Armour = ({ armour }) => {
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div onClick={handleClick}>{armour.nome}</div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {armour.nome} : {armour.tipo.nome}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Classe armatura: {armour.classeArmatura}</div>
        </Modal.Body>
        <Modal.Body>
          <div>descrizione:</div>
          <div> {armour.descrizione}</div>
        </Modal.Body>
        <Modal.Body>
          valore: {armour.costo} {armour.moneta}
        </Modal.Body>
        <Modal.Body>
          <div>peso: {armour.peso}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Armour;
