import { Button, Container, Form, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import "./Login.scss";

import dice from "../../Assets/img/d20.png";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.main.myProfile.accessToken);
  console.log(token);

  //visibilità password

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //form switch registrazione/login

  const [viewer, setViewer] = useState(true);

  const changeView = () => {
    setViewer(!viewer);
  };

  const navigate = useNavigate();

  const postLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          //Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("questo è data della fetch LOGIN", data);
        dispatch({ type: "ADD_MY_PROFILE", payload: data });
        console.log("data di login", data);
        dispatch({ type: "ADD_PG_LIST", payload: data.listaPG });
        console.log("data.personaggi di login", data.listaPG);
        dispatch({ type: "SET_PG", payload: data.listaPG[0] });
        navigate("/homepage");
      } else {
        alert("nome utente o password errati");
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  const postRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.text();
        console.log("questo è data della fetch REGISTER", data);
        postLogin();
      } else {
        // gestione dell'errore
      }
    } catch (error) {
      // gestione dell'errore
    }
  };

  return (
    <>
      <Container fluid className="containerAll">
        <Row>
          {viewer && (
            <div className="title">
              <p>Accedi alla tua partita</p>
              <img src={dice} alt="d20" />
            </div>
          )}
          {!viewer && (
            <div className="title">
              <p>Registrati e gioca con noi</p>
            </div>
          )}
        </Row>
        <Row className="form">
          <div className="containerForm border rounded p-4">
            {viewer && (
              <div className="mb-3">
                <Form.Label className="d-block">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            )}

            {!viewer && (
              <div className="mb-3">
                <Form.Label className="d-block">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Label className="d-block">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <div className="mb-3">
              <Form.Label className="d-block">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Inserisci password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Text onClick={toggleShowPassword}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </div>
            {viewer && (
              <Button
                variant="light"
                type="submit"
                onClick={postLogin}
                className="rounded-pill px-4 mt-3"
              >
                Accedi
              </Button>
            )}
            {!viewer && (
              <Button
                variant="light"
                type="submit"
                onClick={postRegister}
                className="rounded-pill px-4 mt-3"
              >
                Registrati
              </Button>
            )}
            <Form.Group className="mt-3">
              {viewer && (
                <p>
                  Se non hai un account{" "}
                  <span
                    style={{ color: "grey", cursor: "pointer" }}
                    onClick={changeView}
                  >
                    registrati
                  </span>
                </p>
              )}
              {!viewer && (
                <p>
                  Se hai già account{" "}
                  <span
                    style={{ color: "grey", cursor: "pointer" }}
                    onClick={changeView}
                  >
                    accedi
                  </span>
                </p>
              )}
            </Form.Group>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Login;
