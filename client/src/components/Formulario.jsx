import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { UsuarioContext } from '../context/UsuarioContext'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, 'nombre debe tener más de 2 caracteres')
      .required('Required'),
    last_name: Yup.string()
      .min(2, 'Apellido debe tener más de 2 caracteres')
      .required('Required'),
    email: Yup.string().email('Email incorrecto').required('Required'),
    password: Yup.string()
      .min(4, 'Debe tener minimo 4 caracteres')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(4, 'Debe tener minimo 4 caracteres')
      .required('Required')
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });

  const LoginSchema = Yup.object().shape({
    
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(4, 'Debe tener minimo 4 caracteres')
      .required('Required'),
  });



const Formulario = ({ esLogin }) => {

    const { setUsuario } = useContext(UsuarioContext);
    const history = useHistory();

    const createProduct = async (values) => {
        try{
            const create = await axios.post('http://localhost:8000/api/aut/registrar',values);

            Swal.fire(
                'Good job!',
                'Se ha creado el usuario',
                'success'
              )


            history.push("/login");
            // console.log("create:", create.statusText)

        }catch(err){
            //  console.log('waa',err.response.data.error.code)

            
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error.message
                })
            

            
            // console.log("prueba:", err.response.data.error.message)
        }
    }

    const autenticaUsuario = async (values) => {
        try{
            const usuario = await axios.post('http://localhost:8000/api/aut/login',values);

            // console.log("axios", usuario.data.usuario);
            setUsuario(usuario.data.usuario)
            localStorage.setItem('usuario', JSON.stringify(usuario.data.usuario));

            history.push("/");

        }catch(err){
            // console.log("Error", err.response);
            err.response.status === 401 ?
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.error
                })
            :
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hubo problemas'
                })
        }
    }


    return (
        <div>
            
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={esLogin ? LoginSchema : SignupSchema}
                onSubmit={values => {
                    console.log(values);
                    esLogin ? autenticaUsuario(values) : createProduct(values)
                }}
                >
                    {({ errors, touched, handleChange, handleSubmit }) => (
                        
                            <Form noValidate onSubmit={handleSubmit}>
                                {
                                    !esLogin ? 
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text"  name="first_name" placeholder="Ingresar Nombre" onChange={handleChange}/>
                                        {errors.first_name && touched.first_name ? (
                                                <div>{errors.first_name}</div>
                                            ) : null}
                                    </Form.Group>
                                    :''
                                }
                                {
                                    !esLogin ? 
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control type="text"  name="last_name" placeholder="Ingresar Apellido" onChange={handleChange}/>
                                        {errors.last_name && touched.last_name ? (
                                                <div>{errors.last_name}</div>
                                            ) : null}
                                    </Form.Group>
                                    :''
                                }
                                
                                

                                <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Ingresar Email" onChange={handleChange}/>
                                {errors.email && touched.email ? (
                                        <div>{errors.email}</div>
                                    ) : null}
                                </Form.Group>
                            
                                <Form.Group className="mb-3" c>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Ingresar Contraseña" onChange={handleChange}/>
                                {errors.password && touched.password ? (
                                        <div>{errors.password}</div>
                                    ) : null}
                                </Form.Group>
                                {
                                    !esLogin ? 
                                        <Form.Group className="mb-3" >
                                        <Form.Label>Confirmar Contraseña</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" placeholder="Ingresar Confirmar Contraseña" onChange={handleChange} />
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                                <div>{errors.confirmPassword}</div>
                                            ) : null}
                                        </Form.Group>
                                    :''
                                }
                                <Button variant="primary" type="submit">
                                {esLogin ? 'iniciar sesion' : 'registrar'}
                                </Button>
                            </Form>

                        
                    )}
                    
            </Formik>
        </div>
    );
}

export default Formulario;