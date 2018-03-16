import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import MapView from './pages/mapview/Mapview';
import Form from './pages/form/Form';
import Test from './pages/test/Test';
import Pictures from './pages/pictures/Pictures';
import Upload from './pages/upload/Upload';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header useContainer="true"></Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/map' component={MapView}/>
          <Route path='/form' component={Form}/>
          <Route path='/test' component={Test}/>
          <Route path='/pictures' component={Pictures}/>
          <Route path='/upload' component={Upload}/>
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
