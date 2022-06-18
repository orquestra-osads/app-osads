import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Card,
  FloatingLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router";

const PreCadastroMusico = () => {
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState("");
  const [senha1, setSenha1] = useState("");
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      novoEvento(event);
    }
    setValidated(true);
  };

  function novoEvento(props) {
    if (senha === senha1) {
      const pre = {
        email: email,
        senha: senha,
      };
      navigate("/facaparte/musico", { state: { pre } });
    } else {
      alert("Senhas Diferentes", window.location.reload(false));
    }
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col md={3} />
          <Col md={6}>
            <Card border="dark">
              <Card.Header>Cadastro Músico - OSADS</Card.Header>
              <Card.Body>
                <br />

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <InputGroup controlId="validationCustom01">
                      <FloatingLabel
                        controlId="email"
                        label="Insira seu e-mail:"
                        className="w-100"
                      >
                        <Form.Control
                          required
                          type="email"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor insira o email corretamente.
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </InputGroup>
                  </Row>

                  <Row className="mb-3">
                    
                    <InputGroup controlId="validationCustom01">
                      <FloatingLabel
                        controlId="senha"
                        label="Insira sua senha:"
                        className="w-100"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Senha"
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Por favor insira a senha.
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </InputGroup>
                    
                  </Row>

                  <div>
                    <InputGroup controlId="password" className="md-3">
                      <FloatingLabel
                        controlId="senha"
                        label="Repita a senha:"
                        className="w-75"
                      >
                        <Form.Control
                          type={passwordShown ? "text" : "password"}
                          onChange={(e) => setSenha1(e.target.value)}
                          placeholder="Repetir Senha:"
                          required
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
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        onChange={handleSubmit}
                        className="w-50"
                      >
                        Cadastrar
                      </Button>
                    </Col>
                  </Row>
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
};

export default PreCadastroMusico;
