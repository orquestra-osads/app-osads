import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ApiBase from "../../services/ApiBase";

const GerenteInventario = () => {
  const [show, setShow] = useState(false);
  const [detalhes, setDetalhes] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    const token = sessionStorage.getItem("token");

    ApiBase.get(`/inventario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        setDetalhes(data.data.bem);
      })
      .catch((error) => {
        console.error(error);
      });
    setShow(true);
  };

  const [inventario, setIventario] = useState([]);
  const [musico, setMusico] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    ApiBase.get("/inventario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        setIventario(result.data.inventario);
      })
      .catch((error) => {
        console.error(error);
      });
    ApiBase.get("/musicos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        setMusico(result.data.musicos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const excluir = (id) => {
    console.log(id);
    const token = sessionStorage.getItem("token");
    ApiBase.delete(`/inventario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) =>
        alert(response.data.message, window.location.reload(false))
      )
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const [codigo, setCodigo] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [cautela, setCautela] = useState(null);
  const [data, setData] = useState(null);
  const [bem, setBem] = useState([]);

  const handleSubmit = () => {
    const token = sessionStorage.getItem("token");
    const novoBem = {
      codigo: codigo,
      descricao: descricao,
      bem: bem,
      cautela: {
        musico: cautela,
        data: data,
      },
    };
    ApiBase.post(`/inventario`, { novoBem },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => alert("Bem adicionado com sucesso")
    ).catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <br />

      <h2>Invent??rio patrimonial OSADS</h2>

      <br />

      <Container>
        <Row>
          <Col>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Adicionar Bem:</Accordion.Header>
                <Accordion.Body>
                  <Card>
                    <Card.Header>Novo Bem</Card.Header>
                    <Card.Body align="left">
                      <Card.Text>
                        <Form>
                          <Container>
                            <Row>
                              <Col md={3}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>C??digo:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="C??digo do bem"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Bem:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Nome do bem"
                                    value={bem}
                                    onChange={(e) => setBem(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={5}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Descri????o:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Descri????o"
                                    value={descricao}
                                    onChange={(e) =>
                                      setDescricao(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </Col>
                              
                              <hr />
                              <Col md={8}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>Cautela: </Form.Label>
                                  <Form.Select
                                    onChange={(e) => setCautela(e.target.value)}
                                    aria-label="Default select example"
                                  >
                                    <option>Escolha o m??sico:</option>
                                    {musico.map ((music) => (
                                        <>
                                            <option value={`${music.nome}`}>{`${music.nome}`}</option>
                                        </>
                                    ))}
                                    
                                  </Form.Select>
                                </Form.Group>
                              </Col>

                              <Col md={4}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label>
                                    Data de inicio da cautela
                                  </Form.Label>
                                  <Form.Control
                                    type="date"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <br />
                              <hr />
                              <Col md={12}>
                                <Button
                                  className="w-25"
                                  variant="primary"
                                  onClick={handleSubmit}
                                >
                                  Adicionar Bem
                                </Button>
                              </Col>
                            </Row>
                          </Container>
                        </Form>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <br />

            <Table responsive striped bordered hover>
              <thead align="left">
                <tr>
                  <th>C??digo</th>
                  <th>Bem</th>
                  <th>Descri????o</th>

                  <th>Visualizar</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody align="left">
                {inventario.map((files) => (
                  <tr key={files.id}>
                    <td>{files.codigo}</td>
                    <td>{files.bem}</td>
                    <td>{files.descricao}</td>

                    <td>
                      <Button
                        className="btn btn-info"
                        onClick={() => handleShow(files._id)}
                      >
                        Visualizar
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn btn-danger"
                        onClick={() => excluir(files._id)}
                      >
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes bem: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
            {detalhes._id && (
                <>
                    C??digo do bem: {detalhes.codigo}<br/>                
                    Bem: {detalhes.bem}<br/>
                    Descri????o: {detalhes.descricao}<br/>
                    <hr />
                    Cautela: {detalhes.cautela.musico}<br/>
                    Data da Cautela: {detalhes.cautela.data}<br/>
                </> 
              )
            }
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="btn btn-danger"
            onClick={() => excluir(detalhes._id)}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GerenteInventario;
