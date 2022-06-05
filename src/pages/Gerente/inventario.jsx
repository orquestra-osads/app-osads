import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row, Table } from 'react-bootstrap';
import ApiBase from '../../services/ApiBase';

const GerenteInventario = () => {
    const [show, setShow] = useState(false);
    const [detalhes, setDetalhes] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        const token = sessionStorage.getItem('token')

        ApiBase.get(`/contato/${id}`, {headers: {
            'Authorization' : `Bearer ${token}`}}
            ).then((data) => {
                console.log(data.data.mensagem)
                setDetalhes(data.data.mensagem);
            }).catch((error) => {      
                console.log(error)
            })
        setShow(true);
    };
    
    const [inventario, setIventario] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        ApiBase.get('/inventario', {headers: {
          'Authorization' : `Bearer ${token}`
        }}).then((result) => {
            console.log(result.data.inventario)
            setIventario(result.data.inventario)
        }).catch((error) => {      
          console.log(error)
        })
    },[])


    const excluir = (id) =>{
        console.log(id)
        const token = sessionStorage.getItem('token')
        ApiBase.delete(`/contato/${id}`, {headers: {
          'Authorization' : `Bearer ${token}` }})
        .then((response) => alert(response.data.message, window.location.reload(false)))
        .catch((error)=>{
        console.error('Error: ', error)
        })  
    }


    return (
        <>
            <br />
            <Container>
                <Row>
                    <Col>
                    <Table responsive striped bordered hover>
                        <thead align='left'>
                            <tr>
                            <th>Número</th>
                            <th>Código</th>
                            <th>Bem</th>
                            <th>Descrição</th>

                            <th>Visualizar</th>
                            <th>Excluir</th>
                            
                            </tr>
                        </thead>
                        <tbody align='left'>
                            {inventario.map((files) => (
                            <tr key={files.id}>
                                <td>{files.numero}</td>
                                <td>{files.codigo}</td>
                                <td>{files.bem}</td>
                                <td>{files.descricao}</td>

                                <td>
                                <Button className="btn btn-info" onClick={() => handleShow(files._id)}>Visualizar</Button>
                                </td>
                                <td>
                                <Button className="btn btn-danger" onClick={() => excluir(files._id)}>Excluir</Button>
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
                <Modal.Title>{detalhes.email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {detalhes.telefone}
                        <br />
                        <br />
                        {detalhes.message}
                    </>                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="btn btn-danger" onClick={() => excluir(detalhes._id)}>
                    Excluir
                </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default GerenteInventario