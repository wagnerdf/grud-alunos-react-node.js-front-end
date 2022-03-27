import Home from './components/Home';
import Alunos from './components/Alunos';
import Cadastrar from './components/Cadastrar';
import Sobre from './components/Sobre';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Teste app react</h1>
      <BrowserRouter>
      <ul>
        <li><Link to="/">Página Inicial</Link></li>
        <li><Link to="/alunos">Lista de alunos</Link></li>
        <li><Link to="cadastrar">Cadastro de alunos</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
      </ul>

      <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/alunos' element={<Alunos/>}></Route>
        <Route path='/cadastrar' element={<Cadastrar/>}></Route>
        <Route path='/sobre' element={<Sobre/>}></Route>
      </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
