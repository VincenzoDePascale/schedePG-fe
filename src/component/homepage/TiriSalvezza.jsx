import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./TiriSalvezza.scss";

const TiriSalvezza = ({ mod, pg, stat }) => {
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
    if (pg?.tsattivi !== null) {
      const presente = pg?.tsattivi?.some(
        (item) => item?.statistica === stat?.toLowerCase()
      );
      setIsChecked(presente);
    }
  }, [pg?.tsattivi, stat]);

  return (
    <>
      <div className="formaTS">
        <Form>
          <div className="lineaTS">
            <span className="clickTS">
              <Form.Check
                type={`checkbox`}
                checked={isChecked}
                onChange={handleChange}
              />
            </span>{" "}
            <span className="ptTS">
              {!isChecked && mod}
              {isChecked && mod + BComp}
            </span>{" "}
            <span className="statTS" onClick={handleClick}>
              {stat}
            </span>
          </div>
        </Form>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>tiro salvezza su {stat}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Il risultato è: {result}</Modal.Body>
      </Modal>
    </>
  );
};

export default TiriSalvezza;
