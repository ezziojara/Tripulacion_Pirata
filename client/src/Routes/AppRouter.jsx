import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import CrearPirata from '../components/CrearPirata'
import DetalleProducto from '../components/DetallePirata'
import LoginRegistarScreen from '../views/LoginRegistrarScreen'
// import MainScreen from '../views/MainSreen'
import Piratas from '../views/Piratas'
// import Viajes from '../Views/Viajes'

const AppRouter = () => {
    return(
        <>
        <Router>
            <Switch>
                <Route exact path='/login'>
                    <LoginRegistarScreen />
                </Route>
                <Route exact path='/registrar'>
                    <LoginRegistarScreen />
                </Route>
                <Route exact path='/ingresar-pirata'>
                    <CrearPirata/>
                </Route>
                <Route exact path='/ver-detallePirata/:id'>
                    <DetalleProducto/>
                </Route>
                
                <Route exact path='/'>
                   <Piratas/>
                </Route>

            </Switch>
        </Router>
        </>
    );
}
export default AppRouter;