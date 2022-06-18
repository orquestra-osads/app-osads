import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import ApiBase from '../../services/ApiBase';
import apiCep from '../../services/ApiCep';
import { mask, unMask } from "remask";
import { useForm } from "react-hook-form";



const Profile = () => {

  //carregando informações pessoais 
  const [detalhes, setDetalhes] = useState([]);
    useEffect(() => {
        const id = sessionStorage.getItem('_id')
        const token = sessionStorage.getItem('token')
        ApiBase.get(`/profile/${id}`, {headers: {
          'Authorization' : `Bearer ${token}`
        }}).then((result) => {
            console.log(result.data.user)
            setDetalhes(result.data.user)
            setSenha(result.data.user.senha)
            setEmail(result.data.user.email)
            setCep(result.data.user.endereco.cep)
            setCidade(result.data.user.endereco.cidade)
            setEstado(result.data.user.endereco.estado)
            setNumero(result.data.user.endereco.numero)
            setComplemento(result.data.user.endereco.complemento)
            setLogradouro(result.data.user.endereco.logradouro)
        }).catch((error) => {      
          console.log(error)
        })
  },[])
  
  //Atualizando informações

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState("");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [instrumento, setInstrumento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  function putMusico(props) {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem('_id')

    const envioMusico = {
      nome: nome,
      sexo: sexo,
      email: email,
      dataNascimento: dataNascimento,
      telefone: telefone,
      endereco: {
        cidade: cidade,
        logradouro: logradouro,
        estado: estado,
        cep: cep,
        numero: numero,
        complemento: complemento,
      },
      senha: senha,
      instrumento: instrumento,
    };
    console.log(envioMusico);
    ApiBase.put(`/musicos/${id}`, { envioMusico },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
        alert("Dados atualizados   com sucesso!", window.location.reload(false))
      ).catch((error) => {
        console.error("Error: ", error);
      });
  }

  //mask
  const { register, setValue } = useForm();
  function handleChange(event) {
    const name = event.target.name;
    const mascara = event.target.getAttribute("mask");

    let valor = unMask(event.target.value);
    valor = mask(valor, mascara);

    setValue(name, valor);
  }

  //CEP

  function handleCep(event) {
    const valor = unMask(event.target.value);

    apiCep.get(`/ws/${valor}/json/`).then((resultado) => {
      const endereco = resultado.data;
      console.log(endereco);
      setCep(valor)
      setValue("logradouro", endereco.logradouro);
      setValue("complemento", endereco.complemento);
      setValue("uf", endereco.uf);
      setValue("cidade", endereco.localidade);
      setValue("bairro", endereco.bairro);
    });
  }

  return (
    <>
    
        <br />
        <Container>
          <Row>
            <Col>
            <Card>
              <Card.Header align="left">Usuário</Card.Header>
              <Card.Body align="left">
                <Card.Text>
                  <Form>
                    <Container>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="nome"
                              value={`${detalhes.nome}`}
                              onChange={(e) => setNome(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Label>Email</Form.Label>
                          <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <FormControl
                              type="email"
                              placeholder="exemplo@email.com"
                              aria-label="Email"
                              aria-describedby="basic-addon1"
                              value={`${detalhes.email}`}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </InputGroup>
                        </Col>

                        <Col md={3}>
                          <Form.Label>Telefone</Form.Label>
                          <InputGroup className="mb-3">
                            <FormControl
                              type="text"
                              placeholder="(00)00000-0000"
                              aria-label="Email"
                              value={`${detalhes.telefone}`}
                              onChange={(e) => setTelefone(e.target.value)}
                            />
                          </InputGroup>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Instrumento</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={`${detalhes.instrumento}`}
                              onChange={(e) => setInstrumento(e.target.value)}
                            >
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
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                              type="date"
                              value={`${detalhes.dataNascimento}`}
                              onChange={(e) => setDataNascimento(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={`${detalhes.sexo}`}
                              onChange={(e) => setSexo(e.target.value)}
                            >
                              <option value="F">F</option>
                              <option value="M">M</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("cep")}
                              mask="99.999-999"
                              placeholder="CEP"
                              value={`${cep}`}
                              onChange={handleChange}
                              onBlur={handleCep}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Cidade"
                              value={`${cidade}`}
                              onChange={(e) => setCidade(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Estado"
                              value={`${estado}`}
                              onChange={(e) => setEstado(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={9}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Logradouro</Form.Label>
                            <Form.Control
                              type="text"
                              value={`${logradouro}`}
                              placeholder="Logradouro"
                              onChange={(e) => setLogradouro(e.target.value)}
                              {...register("logradouro")}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Número"
                              value={`${numero}`}
                              onChange={(e) => setNumero(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={12}>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Complemento</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Complemento"
                              value={`${complemento}`}
                              onChange={(e) => setComplemento(e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <br />
                      </Row>
                    </Container>
                  </Form>
                </Card.Text>
              </Card.Body>
              
            </Card>

              <br />
              
            </Col>
            
          </Row>
          <Row>
            <Col md={4}><Button variant="outline-secondary" className='w-75'>Alterar informações</Button></Col>
            <Col md={4}><Button variant="outline-primary" className='w-75'>Alterar Email</Button></Col>
            <Col md={4}><Button variant="outline-danger" className='w-75'>Alterar Senha</Button></Col>
          </Row>
          <br />
        </Container>
        
    
    </>
  )
}

export default Profile