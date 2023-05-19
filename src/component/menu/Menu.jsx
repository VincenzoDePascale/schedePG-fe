import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Menu.scss";
//import Modal_newPg from "./Modal_newPg";

const Menu = () => {
  console.log("menu");
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.main.myProfile);
  const personaggi = useSelector((state) => state.main.myProfile.listaPG);
  const token = useSelector((state) => state.main.myProfile.accessToken);
  console.log("profilo completo in myProfile", myProfile);
  console.log("token", token);

  console.log("personaggi", personaggi);

  // let [codicePG, setCodicePG] = useState();
  // setCodicePG(myProfile.listaPG[0].id);

  const searchAllPG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/giocatore/" + myProfile.username,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            //"Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (response.ok) {
        console.log("la fetch della navbar è ok");
        const data = await response.json();
        console.log("i personaggi sono stati trovati", data);
        dispatch({ type: "ADD_PG_LIST", payload: data });
        console.log("risultato della fetch che cerca i personaggi", data);
      } else {
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  const [idPG, setIdPG] = useState();

  const searchPGById = async (idPG) => {
    try {
      console.log("click sul menu", idPG);
      const response = await fetch("http://localhost:8080/api/pg/id/" + idPG, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin": "*",
        },
      });
      if (response.ok) {
        console.log("la fetch della SEARCH_PG_BY_ID è ok");
        const data = await response.json();
        console.log("i personaggi sono stati trovati", data);
        dispatch({ type: "SET_PG", payload: data });
        console.log("risultato della fetch che cerca i personaggi", data);
      } else {
        //gestione dell'errore
      }
    } catch (error) {
      //gestione dell'errore
    }
  };

  //modale creazione personaggio

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nomeNewPg, setNomeNewPg] = useState();
  const [newForza, setNewForza] = useState();
  const [newDestrezza, setNewDestrezza] = useState();
  const [newCostituzione, setNewCostituzione] = useState();
  const [newIntelligenza, setNewIntelligenza] = useState();
  const [newSaggezza, setNewSaggezza] = useState();
  const [newCarisma, setNewCarisma] = useState();
  const [newRazza, setNewRazza] = useState();
  const [newClasse, setNewClasse] = useState();
  const [newLivello, setNewLivello] = useState();

  const [aggiorna, setAggiorna] = useState(false);

  const addNewPg = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/pg/save", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeUtente: myProfile.username,
          nomePersonaggio: nomeNewPg,
          forza: newForza,
          destrezza: newDestrezza,
          costituzione: newCostituzione,
          intelligenza: newIntelligenza,
          saggezza: newSaggezza,
          carisma: newCarisma,
          razza: newRazza,
          classe: newClasse,
          livello: newLivello,
        }),
      });
      if (response.ok) {
        console.log("la fetch della ADD_NEW_PG è ok");
        const data = await response.json();
        console.log("il personaggio è stato creato: ", data);
        dispatch({ type: "ADD_PG_LIST", payload: data });
        setAggiorna(true);
        console.log("risultato della fetch che cerca i personaggi", data);
      } else {
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    searchPGById(idPG);
    if (aggiorna === true) {
      searchAllPG();
      setAggiorna(false);
    }
  }, [idPG]);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand path="/homepage" className="userTitle">
            {myProfile.username}
          </Navbar.Brand>
          <Navbar.Brand path="/homepage">La tua scheda</Navbar.Brand>
          <Nav>
            <NavDropdown title="Personaggi" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <button
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#creazionePg"
                  onClick={handleShow}
                >
                  Creazione Pg
                </button>
              </NavDropdown.Item>
              {personaggi &&
                personaggi?.map((pg) => (
                  <NavDropdown.Item
                    key={pg?.id}
                    onClick={() => setIdPG(`${pg?.id}`)}
                  >
                    {pg?.nomePG}, {pg?.id}
                  </NavDropdown.Item>
                ))}

              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Esci</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crea il tuo nuovo Pg</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nomePersonaggio">
              <Form.Label>Nome personaggio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome del personaggio"
                value={nomeNewPg}
                onChange={(e) => setNomeNewPg(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="forza">
              <Form.Label>Forza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della forza"
                value={newForza}
                onChange={(e) => setNewForza(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="destrezza">
              <Form.Label>Destrezza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della destrezza"
                value={newDestrezza}
                onChange={(e) => setNewDestrezza(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="costituzione">
              <Form.Label>Costituzione</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della costituzione"
                value={newCostituzione}
                onChange={(e) => setNewCostituzione(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="intelligenza">
              <Form.Label>Intelligenza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore dell'intelligenza"
                value={newIntelligenza}
                onChange={(e) => setNewIntelligenza(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="saggezza">
              <Form.Label>Saggezza</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore della saggezza"
                value={newSaggezza}
                onChange={(e) => setNewSaggezza(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="carisma">
              <Form.Label>Carisma</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il valore del carisma"
                value={newCarisma}
                onChange={(e) => setNewCarisma(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="razza">
              <Form.Label>Razza</Form.Label>
              <Form.Select
                value={newRazza}
                onChange={(e) => setNewRazza(e.target.value)}
              >
                <option value="">Seleziona una razza</option>
                <option value="DRACONIDE">Draconide</option>
                <option value="ELFO">Elfo</option>
                <option value="GNOMO">Gnomo</option>
                <option value="HALFLING">Halfling</option>
                <option value="MEZZELFO">Mezzelfo</option>
                <option value="MEZZORCO">Mezzorco</option>
                <option value="NANO">Nano</option>
                <option value="TIEFLING">Tiefling</option>
                <option value="UMANO">Umano</option>
                {/* Aggiungi ulteriori opzioni di razza qui */}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="classe">
              <Form.Label>Classe</Form.Label>
              <Form.Select
                value={newClasse}
                onChange={(e) => setNewClasse(e.target.value)}
              >
                <option value="">Seleziona una classe</option>
                <option value="BARBARO">Berbaro</option>
                <option value="BARDO">Bardo</option>
                <option value="CHIERICO">Chierico</option>
                <option value="DRUIDO">Druido</option>
                <option value="GUERRIERO">Guerriero</option>
                <option value="LADRO">Ladro</option>
                <option value="MAGO">Mago</option>
                <option value="MONACO">Monaco</option>
                <option value="PALADINO">Paladino</option>
                <option value="RANGER">Ranger</option>
                <option value="STREGONE">Stregone</option>
                <option value="WARLOCK">Warlock</option>
                {/* Aggiungi ulteriori opzioni di classe qui */}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="livello">
              <Form.Label>Livello</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il livello del personaggio"
                value={newLivello}
                onChange={(e) => setNewLivello(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={addNewPg}>
            Crea nuovo pg
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Menu;
