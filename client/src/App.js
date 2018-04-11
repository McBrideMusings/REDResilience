import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Form from './pages/form/Form';
import Upload from './pages/upload/Upload';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <main>
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/form' component={Form}/>
          <Route path='/upload' component={Upload}/>
        </Switch>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
