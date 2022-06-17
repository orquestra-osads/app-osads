import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import Acordion from "../../components/Acordion";
import Forms from "../../components/forms";
import ApiBase from "../../services/ApiBase";

const GerenteMusicos = () => {
  //Listando músicos
  const [musicos, setMusicos] = useState([]);
  const [novosMusicos, setNovosMusicos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    ApiBase.get("/musicos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        console.log(result.data.musicos);
        setMusicos(result.data.musicos);
      })
      .catch((error) => {
        console.log(error);
      });
    ApiBase.get("/forms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        console.log(result.data.users);
        setNovosMusicos(result.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //modal
  const [show, setShow] = useState(false);
  const [detalhes, setDetalhes] = useState([]);

  const handleClose = () => {
    setShow(false);
    setDetalhes(0);
  };
  const handleShow = (props) => {
    const id = props;
    console.log(id);
    const token = sessionStorage.getItem("token");
    ApiBase.get(`/musicos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.musico);
        setDetalhes(response.data.musico);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    setShow(true);
  };
  const handleShow2 = (props) => {
    const id = props;
    console.log(id);
    const token = sessionStorage.getItem("token");
    ApiBase.get(`/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data.user);
        setDetalhes(response.data.user);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    setShow(true);
  };

  //excluir músico
  const excluir = (id) => {
    console.log(id);
    const token = sessionStorage.getItem("token");
    ApiBase.delete(`/musicos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) =>
        alert(response.data.message, window.location.reload(false))
      )
      .catch((error) => {
        console.log(error);
      });
  };

  //aprovar músico

  function aprovarMusico(props) {
    const id = props;
    const token = sessionStorage.getItem("token");
    ApiBase.get(`/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setDetalhes(response.data.user);
        const envioMusico = {
          nome: `${response.data.user.nome}`,
          sexo: `${response.data.user.sexo}`,
          email: `${response.data.user.email}`,
          dataNascimento: `${response.data.user.dataNascimento}`,
          telefone: `${response.data.user.telefone}`,

          endereco: {
            cidade: `${response.data.user.endereco.cidade}`,
            logradouro: `${response.data.user.endereco.logradouro}`,
            estado: `${response.data.user.endereco.estado}`,
            cep: `${response.data.user.endereco.cep}`,
            numero: `${response.data.user.endereco.numero}`,
            complemento: `${response.data.user.endereco.complemento}`,
          },

          senha: `${response.data.user.senha}`,
          instrumento: `${response.data.user.instrumento}`,
        };
        ApiBase.post(`/musicos`, { envioMusico })
          .then(
            (response) =>
              alert(
                "Músico adicionado com sucesso!",
                window.location.reload(false)
              ),
            ApiBase.delete(`/forms/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              })
          )
          .catch((error) => {
            console.error("Error: ", error);
          });
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  //reprovar músico

  function reprovarMusico(props) {
    const id = props;
    const token = sessionStorage.getItem("token");

    ApiBase.delete(`/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) =>
        alert(response.data.message, window.location.reload(false))
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <br />
      <p>Gerente de Músicos</p>
      <br />
      <Container>
        <Row>
          <Col>
            <Acordion
              title="Lista de Músicos da OSADS"
              body={
                <Table responsive striped bordered hover>
                  <thead align="left">
                    <tr>
                      <th>Nome</th>
                      <th>Instrumento</th>
                      <th>Telefone</th>
                      <th>Email</th>
                      <th>Vizualizar</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    {musicos.map((files) => (
                      <tr key={files.id}>
                        <td>{files.nome}</td>
                        <td>{files.instrumento}</td>
                        <td>{files.telefone}</td>
                        <td>{files.email}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            onClick={() => handleShow(`${files._id}`)}
                          >
                            Visualizar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              }
            />
            <br />
            <Acordion
              title="Novos músicos"
              body={
                <Table responsive striped bordered hover>
                  <thead align="left">
                    <tr>
                      <th>Nome</th>
                      <th>Instrumento</th>
                      <th>Telefone</th>
                      <th>Email</th>
                      <th>Vizualizar</th>
                      <th>Aprovar Músico</th>
                      <th>Excluir Músico</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    {novosMusicos.map((files) => (
                      <tr key={files.id}>
                        <td>{files.nome}</td>
                        <td>{files.instrumento}</td>
                        <td>{files.telefone}</td>
                        <td>{files.email}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            onClick={() => handleShow2(`${files._id}`)}
                          >
                            Visualizar
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-secundary"
                            onClick={() => aprovarMusico(`${files._id}`)}
                          >
                            Aprovar
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="btn btn-danger"
                            onClick={() => reprovarMusico(`${files._id}`)}
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              }
            />
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
          <Modal.Title>Dados Músico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detalhes._id && (
            <Forms
              Header={`${detalhes.nome}`}
              nome={`${detalhes.nome}`}
              email={`${detalhes.email}`}
              senha={`${detalhes.senha}`}
              telefone={`${detalhes.telefone}`}
              instrumento={`${detalhes.instrumento}`}
              dataNascimento={`${detalhes.dataNascimento}`}
              sexo={`${detalhes.sexo}`}
              quadra={`${detalhes.endereco.quadra}`}
              numero={`${detalhes.endereco.numero}`}
              logradouro={`${detalhes.endereco.logradouro}`}
              estado={`${detalhes.endereco.estado}`}
              cidade={`${detalhes.endereco.cidade}`}
              cep={`${detalhes.endereco.cep}`}
              complemento={`${detalhes.endereco.complemento}`}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="danger" onClick={() => excluir(`${detalhes._id}`)}>
            Excluir Músico
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GerenteMusicos;
