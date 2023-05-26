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
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.main.myProfile);
  const token = useSelector((state) => state.main.myProfile.accessToken);
  const pgInState = useSelector((state) => state.main.listPG);
  const aggiornamento = useSelector((state) => state.main.aggiornamento);

  const searchAllPG = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/pg/username/" + myProfile.username,
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
      const data = await response.json();
      if (response.ok) {
        console.log("listaPG", data);
        dispatch({ type: "ADD_PG_LIST", payload: data });
        dispatch({ type: "AGGIORNAMENTO", payload: false });
        setChangePG(false);
        setAggiorna(false);
      } else {
        setChangePG(false);
        setAggiorna(false);
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  const [changePG, setChangePG] = useState(false);
  const [idPG, setIdPG] = useState();

  const clickIdPg = (id) => {
    setIdPG(id);
    setChangePG(true);
  };

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

  const clickAddPG = () => {
    setCreatePG(true);
    setAggiorna(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nomeNewPg, setNomeNewPg] = useState();
  const [newAllineamento, setNewAllineamento] = useState();
  const [newForza, setNewForza] = useState();
  const [newDestrezza, setNewDestrezza] = useState();
  const [newCostituzione, setNewCostituzione] = useState();
  const [newIntelligenza, setNewIntelligenza] = useState();
  const [newSaggezza, setNewSaggezza] = useState();
  const [newCarisma, setNewCarisma] = useState();
  const [newRazza, setNewRazza] = useState();
  const [newClasse, setNewClasse] = useState();
  const [newAbilita, setNewAbilita] = useState([]);
  const [newLivello, setNewLivello] = useState();
  const [newBackground, setNewBackground] = useState();
  const [newTrattiCaratteriali, setNewTrattiCaratteriali] = useState();
  const [newIdeali, setNewIdeali] = useState();
  const [newLegami, setNewLegami] = useState();
  const [newDifetti, setNewDifetti] = useState();

  const [aggiorna, setAggiorna] = useState(false);
  const [createPG, setCreatePG] = useState(false);

  const randomFor = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewForza(randomNumber.toString());
  };

  const randomDes = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewDestrezza(randomNumber.toString());
  };

  const randomCos = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewCostituzione(randomNumber.toString());
  };

  const randomInt = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewIntelligenza(randomNumber.toString());
  };

  const randomSag = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewSaggezza(randomNumber.toString());
  };

  const randomCar = () => {
    const randomNumber = Math.floor(Math.random() * 20) + 1;
    setNewCarisma(randomNumber.toString());
  };

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
          allineamento: newAllineamento,
          forza: newForza,
          destrezza: newDestrezza,
          costituzione: newCostituzione,
          intelligenza: newIntelligenza,
          saggezza: newSaggezza,
          carisma: newCarisma,
          razza: newRazza,
          classe: newClasse,
          abilitaAttive: newAbilita,
          livello: newLivello,
          background: newBackground,
          tratti_caratteriali: newTrattiCaratteriali,
          ideali: newIdeali,
          legami: newLegami,
          difetti: newDifetti,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        //dispatch({ type: "ADD_PG_LIST", payload: data });
        await dispatch({ type: "SET_PG", payload: data });
        console.log("abilità?", newAbilita);
        setAggiorna(false);
        setShow(false);
        setCreatePG(false);
      } else {
        setAggiorna(false);
        setCreatePG(false);
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  useEffect(() => {
    if (createPG === true) {
      addNewPg();
    }
  }, [createPG]);

  useEffect(() => {
    if (aggiorna === true || aggiornamento === true) {
      searchAllPG();
    }
  }, [aggiornamento, aggiorna, createPG]);

  useEffect(() => {
    if (changePG === true) {
      searchPGById(idPG);
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
            <NavDropdown
              title="Pg"
              id="basic-nav-dropdown"
              align="end"
              onClick={() => dispatch({ type: "AGGIORNAMENTO", payload: true })}
            >
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
              {pgInState !== undefined &&
                pgInState.map((pg) => (
                  <NavDropdown.Item
                    key={pg?.id}
                    onClick={() => clickIdPg(`${pg?.id}`)}
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
            <Form.Group className="mb-3" controlId="allinemaneto">
              <Form.Label>Allineamento</Form.Label>
              <Form.Select
                value={newAllineamento}
                onChange={(e) => setNewAllineamento(e.target.value)}
              >
                <option value="">Seleziona un allineamento</option>
                <option value="legale buono">Legale buono</option>
                <option value="legale neutrale">Legale neutrale</option>
                <option value="legale malvagio">Legale malvagio</option>
                <option value="neutrale buono">Neutrale buono</option>
                <option value="neutrale">Neutrale</option>
                <option value="neutrale buono">Neutrale Malvagio</option>
                <option value="caotico buono">Caotico buono</option>
                <option value="caotico neutrale">Caotico neutrale</option>
                <option value="caotico malvagio">Caotico malvagio</option>
              </Form.Select>
            </Form.Group>
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
                <Button onClick={randomFor}>1D20</Button>
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
                <Button onClick={randomDes}>1D20</Button>
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
                <Button onClick={randomCos}>1D20</Button>
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
                <Button onClick={randomInt}>1D20</Button>
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
                <Button onClick={randomSag}>1D20</Button>
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
                <Button onClick={randomCar}>1D20</Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="razza">
              <Form.Label>Razza</Form.Label>
              <Form.Select
                value={newRazza}
                onChange={(e) => setNewRazza(e.target.value)}
              >
                <option value="">Seleziona una razza</option>
                <option value="draconide">Draconide</option>
                <option value="elfo">Elfo</option>
                <option value="gnomo">Gnomo</option>
                <option value="halfling">Halfling</option>
                <option value="mezzelfo">Mezzelfo</option>
                <option value="mezzorco">Mezzorco</option>
                <option value="nano">Nano</option>
                <option value="tiefling">Tiefling</option>
                <option value="umano">Umano</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="classe">
              <Form.Label>Classe</Form.Label>
              <Form.Select
                value={newClasse}
                onChange={(e) => setNewClasse(e.target.value)}
              >
                <option value="">Seleziona una classe</option>
                <option value="barbaro">Barbaro</option>
                <option value="bardo">Bardo</option>
                <option value="chierico">Chierico</option>
                <option value="druido">Druido</option>
                <option value="guerriero">Guerriero</option>
                <option value="ladro">Ladro</option>
                <option value="mago">Mago</option>
                <option value="monaco">Monaco</option>
                <option value="paladino">Paladino</option>
                <option value="ranger">Ranger</option>
                <option value="stragone">Stregone</option>
                <option value="warlock">Warlock</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="abilita">
              <Form.Label>Abilità</Form.Label>
              <Form.Select
                multiple
                value={newAbilita}
                onChange={(e) =>
                  setNewAbilita(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="">Seleziona le tue abilità</option>
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
            <Form.Group className="mb-3" controlId="livello">
              <Form.Label>Livello</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il livello del personaggio"
                value={newLivello}
                onChange={(e) => setNewLivello(e.target.value)}
              />
            </Form.Group>
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
          <Button variant="secondary" onClick={handleClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => clickAddPG()}>
            Crea nuovo pg
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Menu;
