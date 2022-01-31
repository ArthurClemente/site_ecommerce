import './App.css';
import Header from '../components/templates/Header.jsx';
import Home from '../components/home/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../components/conexaoUsuario/Login';
import Registro from '../components/conexaoUsuario/Registro';
import Checkout from '../components/checkout/Checkout';
import Footer from '../components/templates/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route exact path="/checkout" element={
            <>
              <Header/>
              <Checkout/>
            </>
          }></Route> 

          <Route exact path="/login" element={<Login/>}></Route>  
          <Route exact path="/registro" element={<Registro/>}></Route> 

          <Route exact path ="/" element={
            <>
              <Header/>
              <Home/>
              <Footer/>
            </>
          }></Route> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
