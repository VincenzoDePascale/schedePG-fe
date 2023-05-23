import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./Abilità.scss";

const Abilità = ({ mod, pg, abilità, stat }) => {
  let BComp = pg.bonusCompetenza;
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const [result, setResult] = useState();
  const [showModal, setShowModal] = useState();

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 20) + 1;
    const result = mod + (isChecked ? BComp : 0) + randomNum;
    setResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const presente = pg.abilitaAttive.includes(abilità);
    setIsChecked(presente);
  }, [pg.abilitaAttive, abilità]);

  return (
    <>
      <div className="formaAB">
        <Form>
          <div className="lineaAB">
            <span className="clickAB">
              <Form.Check
                type={`checkbox`}
                checked={isChecked}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ptAB">
              {!isChecked && mod}
              {isChecked && mod + BComp}
            </span>{" "}
            <span className="abilitàAB" onClick={handleClick}>
              {abilità}
            </span>
            <span className="statAB">({stat})</span>
          </div>
        </Form>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>tiro su: {abilità}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Il risultato è: {result}</Modal.Body>
      </Modal>
    </>
  );
};

export default Abilità;
