import React, { useEffect, useState } from 'react';
import {
    useParams, useHistory, Link
  } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Col, Container, Row ,Card, Form} from 'react-bootstrap';
import MainScreen from '../views/MainSreen';

const DetalleProducto = () => {

    const { id } = useParams();

    const [pirata, setPirata] = useState()

    const getPirata = async (id) => {
        try{
            const pirata = await axios.get(`http://localhost:8000/api/piratas/pirata/${id}`)
            // console.log("pirata:", pirata)
            setPirata(pirata.data.pirata);

        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'al traer los datos'
            })
        }
    }

    useEffect(()=>{
        getPirata(id);
    },[]);
    
    const changeStatus = (e) => {

        pirata[e.target.name] = e.target.checked 
        setPirata({ ...pirata, [e.target.name]:e.target.checked });
        
        actualizarPirata()
    }
    
    const actualizarPirata = async () => {
        try{
            // console.log("previo:", pirata)
            const actualizar = await axios.put(`http://localhost:8000/api/piratas/update/${id}`,pirata);
            // console.log("pirataupdate:", actualizar)
            setPirata(actualizar.data.updatePirata);

            Swal.fire(
                'Good job!',
                actualizar.data.msg,
                'success'
              )
            

        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Existe problemas para actualizar el pirata"
            })
        }

    }

    return(
        <>
        <MainScreen/>
        <Container>
            <Row>
                <Col></Col>
                <Col xs={5}><h1>{pirata?.name}</h1></Col>
                <Col><Link to='/'>volver al detalle de piratas</Link></Col>
            </Row>
            <Row>
                <Col xs={6}><img src={pirata?.url} alt="" width="400px" height="200px" /><br />
                    <h2>{`" ${pirata?.phrases} "`}</h2>
                </Col>
                <Col xs={6}>
                <Card >
                    <Card.Body>
                        <Card.Title>Sobre el pirata</Card.Title>
                        <Card.Text>
                            Posición: {pirata?.position} <br />
                            Tesoros: {pirata?.treasure} <br />
                            <Form.Check 
                                type="switch"
                                name="pegLeg"
                                label={`Pata de palo: ${pirata?.pegLeg ? 'SI' : 'NO'}`}
                                checked={pirata?.pegLeg}
                                onChange={(e) => changeStatus(e)}
                            />
                             <br /> 
                            <Form.Check 
                                type="switch"
                                name="eyePatch"
                                label={`Parche en el ojo: ${pirata?.eyePatch ? 'SI' : 'NO'}`}
                                checked={pirata?.eyePatch}
                                onChange={(e) => changeStatus(e)}
                            />
                             <br />
                             <Form.Check 
                                type="switch"
                                name="hookHand"
                                label={`Gancho de mano: ${pirata?.hookHand ? 'SI' : 'NO'}`}
                                checked={pirata?.hookHand}
                                onChange={(e) => changeStatus(e)}
                            />
                             <br />
                            
                        </Card.Text>

                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default DetalleProducto;