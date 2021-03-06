import React, { useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { mask, unMask } from "remask";
import ApiBase from "../../services/ApiBase";
import apiCep from "../../services/ApiCep";

const FacaParteAluno = () => {
  const navigate = useNavigate();

  //mask
  const { register, setValue, handleSubmit } = useForm();
  function handleChange(event) {
    const name = event.target.name;
    const mascara = event.target.getAttribute("mask");

    let valor = unMask(event.target.value);
    valor = mask(valor, mascara);

    setValue(name, valor);
  }

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (props) => {
    setShow(true);
  };

  // alimentando pré-informações
  const { state } = useLocation();
  const [senha, setSenha] = useState("");

  //consumindo os dados
  function enviarDados(dados) {
    if (state.pre.senha === senha) {
      addAluno(dados);
    } else {
      alert("Senha Incorreta");
    }
  }

  function addAluno(props) {
    const envioAluno = {
      nome: `${props.nome}`,
      sexo: `${props.sexo}`,
      email: `${props.email}`,
      dataNascimento: `${props.dataNascimento}`,
      telefone: `${props.telefone}`,
      endereco: {
        cidade: `${props.cidade}`,
        logradouro: `${props.logradouro}`,
        estado: `${props.uf}`,
        cep: `${props.cep}`,
        numero: `${props.numero}`,
        bairro: `${props.bairro}`,
        complemento: `${props.complemento}`,
      },
      senha: `${senha}`,
      instrumento: `${props.instrumento}`,
    };
    console.log(envioAluno);

    ApiBase.post(`/alunos`, { envioAluno })
      .then((response) =>
        alert(
          "Pré cadastro efetudo com sucesso! Aguarde confirmação do administrador para acessar o sistema.",
          navigate("/home")
        )
      )
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  //CEP

  function handleCep(event) {
    const valor = unMask(event.target.value);

    apiCep.get(`/ws/${valor}/json/`).then((resultado) => {
      const endereco = resultado.data;

      setValue("logradouro", endereco.logradouro);
      setValue("complemento", endereco.complemento);
      setValue("uf", endereco.uf);
      setValue("cidade", endereco.localidade);
      setValue("bairro", endereco.bairro);
    });
  }

  //mostrar senha
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <>
      <br />

      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header align="left">
                Cadastro Aluno Completo - OSADS
              </Card.Header>
              <Card.Body align="left">
                <Card.Text>
                  <Form onSubmit={handleSubmit}>
                    <Container>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nome"
                              onChange={handleChange}
                              {...register("nome")}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Label>Email</Form.Label>
                          <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">
                              @
                            </InputGroup.Text>
                            <FormControl
                              type="email"
                              placeholder="exemplo@email.com"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                              value={state.pre.email}
                              onChange={handleChange}
                              {...register("email")}
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Form.Label>Telefone</Form.Label>
                          <InputGroup className="mb-3">
                            <FormControl
                              type="text"
                              {...register("telefone")}
                              mask="(99) 99999-9999"
                              onChange={handleChange}
                              placeholder="(00) 00000-0000"
                              required
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                            required
                          >
                            <Form.Label>Instrumento</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={handleChange}
                              {...register("instrumento")}
                            >
                              <option>Selecione o Instrumento</option>
                              <option value="Baixo">Baixo</option>
                              <option value="Bateria">Bateria</option>
                              <option value="Clarinete 1">Clarinete 1</option>
                              <option value="Clarinete 2">Clarinete 2</option>
                              <option value="Flauta 1">Flauta 1</option>
                              <option value="Flauta 2">Flauta 2</option>
                              <option value="Guitarra">Guitarra</option>
                              <option value="Maestro">Maestro</option>
                              <option value="Saxofone 1">Saxofone 1</option>
                              <option value="Saxofone 2">Saxofone 2</option>
                              <option value="Saxofone Tenor">Saxofone Tenor</option>
                              <option value="Teclado">Teclado</option>
                              <option value="Trombone">Trombone</option>
                              <option value="Trompete 1">Trompete 1</option>
                              <option value="Trompete 2">Trompete 2</option>
                              <option value="Tuba">Tuba</option>
                              <option value="Violão">Violão</option>
                              <option value="Violino 1">Violino 1</option>
                              <option value="Violino 2">Violino 2</option>
                              <option value="Violoncello">Violoncello</option>
                              
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                              hasValidation
                              type="date"
                              onChange={handleChange}
                              {...register("dataNascimento")}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={handleChange}
                              {...register("sexo")}
                            >
                              <option>Selecione o Sexo</option>
                              <option value="F">F</option>
                              <option value="M">M</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("cep")}
                              mask="99.999-999"
                              placeholder="CEP"
                              onChange={handleChange}
                              onBlur={handleCep}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Cidade"
                              {...register("cidade")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Estado"
                              {...register("uf")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={9}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Logradouro"
                              {...register("logradouro")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Número"
                              {...register("numero")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Bairro"
                              {...register("bairro")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={8}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Complemento"
                              {...register("complemento")}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={5} />
                        <Col md={12} align="center">
                          <br />
                          <Button
                            variant="primary"
                            onClick={() => handleShow()}
                            onChange={handleSubmit(enviarDados)}
                            className="w-50"
                          >
                            Cadastrar
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                Transformando vidas através do louvor!
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <Form>
            <InputGroup className="mb-3">
              <FormControl
                type={passwordShown ? "text" : "password"}
                value={senha}
                placeholder="Senha"
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={togglePassword}
              >
                Mostrar
              </Button>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit(enviarDados)}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
    </>
  );
};

export default FacaParteAluno;
