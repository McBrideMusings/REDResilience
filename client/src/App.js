import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import MapView from './pages/mapview/Mapview';
import Form from './pages/form/Form';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="content-wrap">
        <Header State="BlockByBlock"></Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/map' component={MapView}/>
          <Route path='/form' component={Form}/>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
