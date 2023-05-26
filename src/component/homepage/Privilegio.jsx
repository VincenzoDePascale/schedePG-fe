import { useState } from "react";
import { Modal } from "react-bootstrap";

const Privilegio = ({ index, privilegio }) => {
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div onClick={handleClick}>{privilegio.nome}</div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{privilegio.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>descrizione:</div>
          <div> {privilegio.descrizione}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Privilegio;
