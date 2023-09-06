import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import React from 'react';
import LandingPage from './components/LandingPage/landingPage'
import Home from './components/Home/home';
import Details from './components/Detail/detail';
import CreateVideogame from './components/CreateVideogame/createVideogame';
import ContactInfo from './components/Contacto/contacto';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path= '/videogame/:id' component={Details}/>
        <Route path= '/createvideogame' component={CreateVideogame}/>
        <Route path= '/contacto' component={ContactInfo}/>
      </div>
    </Router>
  );
}

export default App;
