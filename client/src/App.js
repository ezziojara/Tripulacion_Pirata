import logo from './logo.svg';
import './App.css';
import AppRouter from './Routes/AppRouter';
import { UsuarioProvider } from './context/UsuarioContext';

function App() {
  return (
    <UsuarioProvider>
      <AppRouter/>
    </UsuarioProvider>
    
  );
}

export default App;