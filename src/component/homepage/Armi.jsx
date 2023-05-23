import { useState } from "react";
import "./Armi.scss";
import { Form, Modal } from "react-bootstrap";

const Armi = ({ index, arma, modFor, modDes, BComp }) => {
  let mod = 0;
  switch (arma.tipo) {
    case "ARMA_DA_MISCHIA_SEMPLICE":
      mod = modFor;
      break;
    case "ARMA_A_DISTANZA_SEMPLICE":
      mod = modDes;
      break;
    case "ARMA_DA_MISCHIA_DA_GUERRA":
      mod = modFor;
      break;
    case "ARMA_A_DISTANZA_DA_GUERRA":
      mod = modDes;
      break;
    default:
      break;
  }
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [tiroPerColpire, setTiroPerColpire] = useState();
  const [danno, setDanno] = useState();
  const [showAttacco, setShowAttacco] = useState();

  const handleAttacco = () => {
    let randomTPC = Math.floor(Math.random() * 20) + 1;
    if (isChecked) {
      randomTPC += mod + BComp;
    } else {
      randomTPC += mod;
    }
    setTiroPerColpire(randomTPC);

    let randomDanno = 0;
    for (let i = 0; i < arma.numeroDadi; i++) {
      randomDanno += Math.floor(Math.random() * arma.danno.valore) + 1;
    }
    randomDanno += mod;
    setDanno(randomDanno);

    setShowAttacco(true);
  };

  const handleCloseAttacco = () => {
    setShowAttacco(false);
  };
  return (
    <>
      <div className="formaArmi">
        <Form>
          <div className="lineaArma">
            <span className="clickArma">
              <Form.Check
                type={`checkbox`}
                checked={isChecked}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ptArma">
              {!isChecked && mod}
              {isChecked && mod + BComp}
            </span>{" "}
            <span className="nome" onClick={handleClick}>
              {arma.nome}
            </span>
            <span className="danno" onClick={handleAttacco}>
              {arma.numeroDadi}
              {arma.danno.dado}
            </span>
          </div>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {arma.nome} : {arma.tipo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            danno: {arma.numeroDadi}
            {arma.danno.dado}, {arma.tipoDanno}
          </div>
        </Modal.Body>
        <Modal.Body>
          <div>descrizione:</div>
          <div> {arma.descrizione}</div>
        </Modal.Body>
        <Modal.Body>
          valore: {arma.costo} {arma.moneta}
        </Modal.Body>
        <Modal.Body>
          <div>peso: {arma.peso}</div>
        </Modal.Body>
      </Modal>

      <Modal show={showAttacco} onHide={handleCloseAttacco} centered>
        <Modal.Header closeButton>
          <Modal.Title>attacci con: {arma.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>tiro per colpire: {tiroPerColpire}</Modal.Body>
        <Modal.Body>danni: {danno}</Modal.Body>
      </Modal>
    </>
  );
};

export default Armi;
