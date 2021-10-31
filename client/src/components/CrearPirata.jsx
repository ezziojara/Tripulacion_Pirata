import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik, Form as FormFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UsuarioContext } from '../context/UsuarioContext';
import Swal from 'sweetalert2';
import {
     useHistory
  } from "react-router-dom";

const CrearPirata = () => {
    const {usuario} = useContext(UsuarioContext);
    const history  = useHistory();

    const [pirataForm, setPirataForm] = useState({
        name: '',
        url: '',
        position: '',
        pegLeg: true,
        eyePatch: true,
        hookHand: true,
        treasure: '',
        phrases: ''
    });

    const pirateSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .required('Este campo es requerido'),
        url: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .required('Este campo es requerido'),
        position: Yup.string()
            .required('Este campo es requerido'),
        pegLeg: Yup.bool()
            .required('Este campo es requerido'),
        eyePatch: Yup.bool()
            .required('Este campo es requerido'),
        hookHand: Yup.bool()
            .required('Este campo es requerido'),
        treasure: Yup.number()
            .required('Este campo es requerido'),
        phrases: Yup.string()
            .min(2, 'Mínimo 2 caracteres!')
            .required('Este campo es requerido'),
    });
    
    
    const agregarPirata = async (values) => {

        try{
            
            const pirataValues = {...values, autor:usuario._id}
            // console.log('pirata',pirataValues)
            
            const pirata = axios.post('http://localhost:8000/api/piratas/new',pirataValues)

            // console.log('respuesta',pirata)

            Swal.fire(
                'Good job!',
                'Se ha creado el pirata',
                'success'
              )
            history.push('/');

        }
        catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data.error.message
            })
        }
    }

    


    return(
        <div>
            <h1>formulario</h1>

            <Formik
                initialValues={pirataForm}
                validationSchema={pirateSchema}
                onSubmit={agregarPirata}
            >
                {({ errors, touched, getFieldProps }) => (
                    <FormFormik>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar nombre" name="name"
                                value={pirataForm.name} {...getFieldProps('name')} />
                            <p>{(errors.name && touched.name) && errors.name}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar url" name="url"
                                value={pirataForm.url} {...getFieldProps('url')} />
                            <p>{(errors.url && touched.url) && errors.url}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>N cofres de tesoro</Form.Label>
                            <Form.Control type="number" placeholder="Ingresar número de tesoros" name="treasure"
                                value={pirataForm.treasure} {...getFieldProps('treasure')} />
                            <p>{(errors.treasure && touched.treasure) && errors.treasure}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>frase del pirata</Form.Label>
                            <Form.Control type="text" placeholder="Ingresar frase del pirata" name="phrases"
                                value={pirataForm.phrases} {...getFieldProps('phrases')} />
                            <p>{(errors.phrases && touched.phrases) && errors.phrases}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Select aria-label="Default select example" value={pirataForm?.position} {...getFieldProps('position')}>
                            <option value=""> seleccione una opcion</option>
                            <option value="Capitan">Capitan</option>
                            <option value="Primer Oficial">Primer Oficial</option>
                            <option value="Maestro Cuarto">Maestro Cuarto</option>
                            <option value="Barcaza">Barcaza</option>
                            <option value="Chico Polvora">Chico Polvora</option>
                            
                        </Form.Select>
                        <p className="errors">{(errors.position && touched.position) && errors.position}</p>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check
                            name="pegLeg"
                            label="pata de palo"
                            value={pirataForm?.pegLeg} {...getFieldProps('pegLeg')}
                            />
                        <p className="errors">{(errors.position && touched.position) && errors.position}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check
                            name="eyePatch"
                            label="parche en el ojo"
                            value={pirataForm?.eyePatch} {...getFieldProps('eyePatch')}
                            />
                        <p className="errors">{(errors.position && touched.position) && errors.position}</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Check
                            name="hookHand"
                            label="gancho de mano"
                            value={pirataForm?.hookHand} {...getFieldProps('hookHand')}
                            />
                        <p className="errors">{(errors.position && touched.position) && errors.position}</p>
                        </Form.Group>

                        


                        <Button variant="primary" type="submit">
                            Crear pirata
                        </Button>

                    </FormFormik>
                ) }
            </Formik>
        </div>
    );
}

export default CrearPirata;