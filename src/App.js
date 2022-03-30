import Home from './components/Home';
import Alunos from './components/Alunos';
import Cadastrar from './components/Cadastrar';
import Sobre from './components/Sobre';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';    


function App() {
  
  return (
  
    <div className="App">
      <h1>Programa - Cadastro de Alunos</h1>
      <BrowserRouter>

      <Nav variant="tabs">
          <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
          <Nav.Link as={Link} to="/alunos">Lista de alunos</Nav.Link>
          <Nav.Link as={Link} to="/cadastrar">Cadastro de alunos</Nav.Link>
          <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>

      </Nav>

      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/alunos" component={Alunos}></Route>
        <Route path="/cadastrar" component={Cadastrar}></Route>
        <Route path="/sobre" component={Sobre}></Route>
      </Switch>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
