import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import ApiUpload from "../../services/ApiUpload";

const GerentePartitura = () => {
  const [state, setState] = useState({ selectedFile: null });
  const [detalhes, setDetalhes] = useState([]);
  const [id, setId] = useState([]);
  const [folderID, setFolderID] = useState([]);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setDetalhes([0]);
    setId([0]);
    setFolderID([0]);
    setShow(false);
  };
  const handleShow = (props) => {
    const pasta = { folder: `${props}` }; //1bHqYWKtmZlENRtiD140CHeOMt4-NW4q9
    setFolderID(props);
    ApiUpload.post("/upload/list", { pasta }).then((result) => {
        setDetalhes(result.data);
      }).catch((error) => {
        console.error(error);
      });
    setShow(true);
    setId(pasta);
  };

  //validar se tem algum arquivo no form
  function validateForm() {
    return state.selectedFile != null;
  }

  //fazendo uplado de arquivos
  const onFileChange = (event) => {
    setState({ selectedFile: event.target.files[0] });
  };

  const onFileUpload = () => {
    const folderId = id;
    const formData = new FormData();
    formData.append("myFile", state.selectedFile, state.selectedFile.name);

    ApiUpload.post(`/upload/folder/${folderId.folder}`, formData)
      .then((result) => {
        console.log("Success: ", result, handleShow(folderID));
      }).catch((error) => {
        console.error(error);
      });
  };

  //excluindo arquivos
  const excluir = (id) => {
    ApiUpload.delete(`/file/${id}`)
      .then((response) => response.json(handleShow(folderID)))
      .then((result) => {
        alert(result);
      }).catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <br />

      <h2>Partituras</h2>

      <br />
           
      <>
        <Container>
          <Row>
            
            <Container>
              <Row xs={1} md={2} className="g-3">
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Baixo</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="info"
                        onClick={() =>
                          handleShow("15ALzwsptsvBcSiC0RWubT2oYQjfEKC86")
                        }
                      >
                        Partituras Baixo
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Bateria</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="info"
                        onClick={() =>
                          handleShow("1azbwyviVPkclvCxbRnwhMHHiEd7zI6LR")
                        }
                      >
                        Partituras Bateria
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Clarinete 1</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="success"
                      onClick={() => handleShow("14vHnCqUALFSUxSKtxVE27gvO91jKCu7K")}
                    >
                      Partituras Clarinete 1
                    </Button>
                  </Card.Body>
                </Card>
                </Col>
              
                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Clarinete 2</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="success"
                      onClick={() => handleShow("1jgRXQ46K0cfOh0uwWRnGztmNtk_VyN4K")}
                    >
                      Partituras Clarinete 2
                    </Button>
                  </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Flauta 1</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="success"
                        onClick={() =>
                          handleShow("1ZeJ4sgus35ExH3vz7vWHkw3GNAZHC9rx")
                        }
                      >
                        Partituras Flauta 1
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Flauta 2</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="success"
                        onClick={() =>
                          handleShow("1438j7_O3ioPObVeJKGPqLeA0rJrh0u")
                        }
                      >
                        Partituras Flauta 2
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Guitarra</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="info"
                      onClick={() => handleShow("17uPbYTpXVFyPTOsBEB3h4gqW2EmUBxrm")}
                    >
                      Partituras Guitarra
                    </Button>
                  </Card.Body>
                </Card>
                </Col>
              
                <Col md={3}>
                <Card>
                  <Card.Header>Maestro</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="secondary"
                      onClick={() => handleShow("18JLuw2m_TaPEjD3R6DH5JNFX5AXg8i4a")}
                    >
                      Partituras Maestro
                    </Button>
                  </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Saxofone 1</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="warning"
                        onClick={() =>
                          handleShow("1loSFj6cPyP27Nq_Dptgd_FbGwKoXGCQD")
                        }
                      >
                        Partituras Saxofone 1
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Saxofone 2</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="warning"
                        onClick={() =>
                          handleShow("1YbOPt_RDT0O7Q2WVhMfjNeYzTN5Q2fQG")
                        }
                      >
                        Partituras Saxofone 2
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Saxofone Tenor</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="warning"
                      onClick={() => handleShow("1qZ39EWPtlTFcHwo_LuRmFeBaLoiqsDDB")}
                    >
                      Partituras Saxofone Tenor
                    </Button>
                  </Card.Body>
                </Card>
                </Col>
              
                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Teclado</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="info"
                      onClick={() => handleShow("15-Lqp-TNYgb1ZScIl0eTFpcijaLCtbUO")}
                    >
                      Partituras Teclado
                    </Button>
                  </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Trombone</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="dark"
                        onClick={() =>
                          handleShow("1Svg5Hp61oOFh5LDCxXgSn1rBl2fyGM9P")
                        }
                      >
                        Partituras Trombone
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Trompete 1</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="dark"
                        onClick={() =>
                          handleShow("1NBEML7aXEdDYkSSEfNpD8xcDPLG1EEpR")
                        }
                      >
                        Partituras Trompete 1
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Trompete 2</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="dark"
                      onClick={() => handleShow("1tVGH4lwd6lMqkFsbg55OvryGeCvcl")}
                    >
                      Partituras Trompete 2
                    </Button>
                  </Card.Body>
                </Card>
                </Col>
              
                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Tuba</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="dark"
                      onClick={() => handleShow("1F0n-vMADtCHnxgWOCZQ_GROb7-8Z0F4Q")}
                    >
                      Partituras Tuba
                    </Button>
                  </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Violão</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="info"
                        onClick={() =>
                          handleShow("1_CRDnLOnbq047ODtRQGPekoViYnUG_f7")
                        }
                      >
                        Partituras Violão
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              
                <Col md={3}>
                  <Card border="dark">
                    <Card.Header>Violino 1</Card.Header>
                    <Card.Body>
                      <Button
                        className="bt bt-danger"
                        variant="danger"
                        onClick={() =>
                          handleShow("137f2Qp_HkzvIAF4NJF8d4VnnJRWMfcyq")
                        }
                      >
                        Partituras Violino 1
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Violino 2</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="danger"
                      onClick={() => handleShow("1py8AEAUeD7kNeqaoaIcWkIJEzLBrKMOT")}
                    >
                      Partituras Violino 2
                    </Button>
                  </Card.Body>
                </Card>
                </Col>
              
                <Col md={3}>
                <Card border="dark">
                  <Card.Header>Violoncello</Card.Header>
                  <Card.Body>
                    <Button
                      className="bt bt-danger"
                      variant="danger"
                      onClick={() => handleShow("1hLHhDZp1nDItE-uDI3qobWOTOlZuGfzv")}
                    >
                      Partituras Violoncello
                    </Button>
                  </Card.Body>
                </Card>
                </Col>


              </Row>
            </Container>

           
          </Row>
        </Container>
      </>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Partituras
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form>
                  <Row>
                    <Col md={10}>
                      <input
                        type="file"
                        className="form-control"
                        onChange={onFileChange}
                      />
                    </Col>
                    <Col md={2} align="right" className="d-grid gap-2">
                      <Button
                        className="btn btn-primary"
                        onClick={() => onFileUpload(folderID)}
                        disabled={!validateForm()}
                      >
                        Enviar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>

          <Container>
            <>
              <br />
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Download</th>
                    <th>Visualizar</th>
                    <th>Excluir</th>
                  </tr>
                </thead>
                <tbody align="center">
                  {detalhes.map((files) => (
                    <tr>
                      <td>{files.name}</td>
                      <td>
                        <a
                          href={`${files.webContentLink}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Button className="btn btn-success">DownLoad</Button>
                        </a>
                      </td>
                      <td>
                        <a
                          href={`${files.webViewLink}`}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <Button className="btn btn-primary">
                            Vizualizar
                          </Button>
                        </a>
                      </td>
                      <td>
                        <Button
                          className="btn btn-danger"
                          onClick={() => excluir(files.id)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="outline-primary">Fechar</Button>
        </Modal.Footer>
      </Modal>
      <br />
    </>
  );
};

export default GerentePartitura;
