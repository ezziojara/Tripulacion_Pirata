import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { UsuarioContext } from '../context/UsuarioContext'
import Button from 'react-bootstrap/Button'
import { Col, Container, Row } from 'react-bootstrap'

const MainScreen = () => {

    const {usuario, setUsuario} = useContext(UsuarioContext);
    const history = useHistory();

    useEffect(() => {
        // console.log('usuario',usuario);
        if (!usuario) {
            history.push('/login')
        }
    },[usuario])

    const cerrarSesion = () => {
        setUsuario(null);
        localStorage.clear();
    }

    return(
        <Container>
            <Row>
                <Col></Col>
                <Col xs={5} ></Col>
                <Col style={{textAlign: "right"}}>
                <h5>Usuario: {`${usuario?.first_name} ${usuario?.last_name}`}</h5> 
                <Button variant="primary" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Col>
            </Row>
        </Container>
    );

}

export default MainScreen;