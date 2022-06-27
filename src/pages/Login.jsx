import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { Card, Col, Container, FloatingLabel, InputGroup, Row } from "react-bootstrap";
import ApiBase from "../services/ApiBase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && senha.length > 0;
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      senha: senha,
    };
    login(data);
  }

  const login = (data) => {
    console.clear();

    ApiBase.post("/login", { data })
      .then((result) => {
        sessionStorage.setItem("_id", result.data.user._id);
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("instrumento", result.data.user.instrumento);
        sessionStorage.setItem("_role", result.data.user._role);
        sessionStorage.setItem("email", result.data.user.email);

        if (result.data.user._role === "Musico") {
          window.location.reload(navigate("/partituras"));

          //pastas e instrumentos 

          if (result.data.user.instrumento === "Baixo") {
            sessionStorage.setItem(
              "pasta",
              "15ALzwsptsvBcSiC0RWubT2oYQjfEKC86"
            );
          } 
          else if (result.data.user.instrumento === "Bateria") {
            sessionStorage.setItem(
              "pasta",
              "1azbwyviVPkclvCxbRnwhMHHiEd7zI6LR"
            );
          }
          else if (result.data.user.instrumento === "Clarinete 1") {
            sessionStorage.setItem(
              "pasta",
              "14vHnCqUALFSUxSKtxVE27gvO91jKCu7K"
            );
          }
          else if (result.data.user.instrumento === "Clarinete 2") {
            sessionStorage.setItem(
              "pasta",
              "1jgRXQ46K0cfOh0uwWRnGztmNtk_VyN4K"
            );
          }
          else if (result.data.user.instrumento === "Flauta 1") {
            sessionStorage.setItem(
              "pasta",
              "1ZeJ4sgus35ExH3vz7vWHkw3GNAZHC9rx"
            );
          }
          else if (result.data.user.instrumento === "Flauta 2") {
            sessionStorage.setItem(
              "pasta",
              "1438j7_O3ioPObVeJKGPqLeA0rJrh0u"
            );
          }
          else if (result.data.user.instrumento === "Guitarra") {
            sessionStorage.setItem(
              "pasta",
              "17uPbYTpXVFyPTOsBEB3h4gqW2EmUBxrm"
            );
          }
          else if (result.data.user.instrumento === "Maestro") {
            sessionStorage.setItem(
              "pasta",
              "18JLuw2m_TaPEjD3R6DH5JNFX5AXg8i4a"
            );
          }
          else if (result.data.user.instrumento === "Saxofone 1") {
            sessionStorage.setItem(
              "pasta",
              "1loSFj6cPyP27Nq_Dptgd_FbGwKoXGCQD"
            );
          }
          else if (result.data.user.instrumento === "Saxofone 2") {
            sessionStorage.setItem(
              "pasta",
              "1YbOPt_RDT0O7Q2WVhMfjNeYzTN5Q2fQG"
            );
          }
          else if (result.data.user.instrumento === "Saxofone Tenor") {
            sessionStorage.setItem(
              "pasta",
              "1qZ39EWPtlTFcHwo_LuRmFeBaLoiqsDDB"
            );
          }
          else if (result.data.user.instrumento === "Teclado") {
            sessionStorage.setItem(
              "pasta",
              "15-Lqp-TNYgb1ZScIl0eTFpcijaLCtbUO"
            );
          }
          else if (result.data.user.instrumento === "Trombone") {
            sessionStorage.setItem(
              "pasta",
              "1Svg5Hp61oOFh5LDCxXgSn1rBl2fyGM9P"
            );
          }
          else if (result.data.user.instrumento === "Trompete 1") {
            sessionStorage.setItem(
              "pasta",
              "1NBEML7aXEdDYkSSEfNpD8xcDPLG1EEpR"
            );
          }          
          else if (result.data.user.instrumento === "Trompete 2") {
            sessionStorage.setItem(
              "pasta",
              "1tVGH4lwd6lMqkFsbg55OvryGeCvcl-qo"
            );
          }
          else if (result.data.user.instrumento === "Tuba") {
            sessionStorage.setItem(
              "pasta",
              "1F0n-vMADtCHnxgWOCZQ_GROb7-8Z0F4Q"
            );
          }
          else if (result.data.user.instrumento === "Violão") {
            sessionStorage.setItem(
              "pasta",
              "1_CRDnLOnbq047ODtRQGPekoViYnUG_f7"
            );
          }
          else if (result.data.user.instrumento === "Violino 1") {
            sessionStorage.setItem(
              "pasta",
              "137f2Qp_HkzvIAF4NJF8d4VnnJRWMfcyq"
            );
          }
          else if (result.data.user.instrumento === "Violino 2") {
            sessionStorage.setItem(
              "pasta",
              "1py8AEAUeD7kNeqaoaIcWkIJEzLBrKMOT"
            );
          }
          else if (result.data.user.instrumento === "Violoncello") {
            sessionStorage.setItem(
              "pasta",
              "1hLHhDZp1nDItE-uDI3qobWOTOlZuGfzv"
            );
          }


        } else if (result.data.user._role === "Admin") {
          window.location.reload(navigate("/orquestra/partituras"));
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <>
      <Container>
        <br />

        <Row className="row d-flex justify-content-center">
          <Col className="col-md-6">
            <Card border="dark">
              <Card.Header>Login OSADS</Card.Header>
              <Card.Body>
                <br />

                <Form onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="email"
                    label="Email:"
                    className="col-md-12"
                  >
                    <Form.Control
                      autoFocus
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </FloatingLabel>
                  <br />

                  <div>
                    <InputGroup controlId="password" className="md-3">
                      <FloatingLabel
                        controlId="senha"
                        label="Senha:"
                        className="w-75"
                      >
                        <Form.Control
                          type={passwordShown ? "text" : "password"}
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          placeholder="Senha:"
                        />
                      </FloatingLabel>
                      <Button
                        variant="outline-secondary"
                        onClick={togglePassword}
                        className="w-25"
                      >
                        Mostrar
                      </Button>
                    </InputGroup>
                  </div>

                  <br />
                  <Container>
                    <Row className="row d-flex justify-content-center">
                      <Col md={4}>
                        <div className="d-grid">
                          <Button type="submit" disabled={!validateForm()}>
                            Entrar
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted">
                Transformando vidas através do louvor!
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
