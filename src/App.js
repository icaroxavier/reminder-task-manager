import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from '../src/store/';
import { Provider } from 'react-redux';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

/*PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo'; 
import Home from './view/home'; 
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha';



function App() {
  return (
    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Router>
          <Route exact path='/' component={Login} />
          <Route exact path='/novousuario' component={NovoUsuario} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/recuperarsenha' component={UsuarioRecuperarSenha} />
        </Router>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
