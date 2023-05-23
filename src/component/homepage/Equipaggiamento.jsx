import { useState } from "react";
import "./Equipaggiamento.scss";
import { Modal } from "react-bootstrap";

const Equipaggiamento = ({ index, equip }) => {
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="formaEquip">
        <div className="linea" onClick={handleClick}>
          <span className="nome">{equip.nome}</span>
          <span className="peso">{equip.peso}</span>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{equip.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>descrizione:</div>
          <div> {equip.descrizione}</div>
        </Modal.Body>
        <Modal.Body>
          valore: {equip.costo} {equip.moneta}
        </Modal.Body>
        <Modal.Body>
          <div>peso: {equip.peso}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Equipaggiamento;
