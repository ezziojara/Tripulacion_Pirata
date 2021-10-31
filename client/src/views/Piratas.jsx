import React, { useContext , useState, useEffect} from 'react'
import MainScreen from './MainSreen'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Table, Tag, Space } from 'antd';
import { UsuarioContext } from '../context/UsuarioContext'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2';

const Piratas = () => {


    const {usuario} = useContext(UsuarioContext);
    const [piratasList, setPiratasList] = useState();
    const history = useHistory()
    const columns = [
        {
          title: 'Foto del Pirata',
          dataIndex: 'url',
          key: 'url',
          render: (text, record) => (
           <>
              <img src={record.url} alt="" width="50px" />
            </>
          ),
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (text, record) => (
            <Space size="middle">
                <Button variant="primary" key="1" onClick={()=> irDetallePirata(record._id)} >ver pirata</Button>
                <Button variant="danger" key="2" onClick={()=> deletePirata(record._id)}>Eliminar</Button>
            </Space>
          ),
        },
      ];

    const data = piratasList

    const getPiratasxUsuario = async () => {
        try{
            const piratas = await axios.get(`http://localhost:8000/api/piratas/${usuario._id}`)
            // console.log('piratas', piratas);
            setPiratasList(piratas.data.piratas);

        }catch(err){
            console.log('err', err);
        }
    }

    useEffect(() => {
        getPiratasxUsuario();
    },[])

    const deletePirata = async (id) => {
        try{
            const pirata = await axios.delete(`http://localhost:8000/api/piratas/delete/${id}`);
            // console.log("pirata", pirata);
            getPiratasxUsuario();
        }catch(err){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'al eliminar al pirata'
            })
        }
    }

    const irDetallePirata = (id) => {
        history.push(`/ver-detallePirata/${id}`);
    }

    return ( 
    <>
        <MainScreen />
        <Container>
        {/* <Row className="justify-content-md-center">
            <Col md="auto"><h1>Piratas</h1></Col>
        </Row> */}
        <Row>
            <Col></Col>
            <Col xs={5} style={{textAlign: "center"}}><h1>Piratas</h1></Col>
            <Col><Link to='/ingresar-pirata'>Agregar nuevo pirata</Link></Col>
        </Row>
        <Table columns={columns} dataSource={data} />
        
        </Container>

        
    </>
    );
}

export default Piratas;