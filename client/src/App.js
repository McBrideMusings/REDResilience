import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Form from './pages/form/Form';
import Form2 from './pages/form/Form2';
import Test from './pages/test/Test';
import Pictures from './pages/pictures/Pictures';
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
          <Route path='/form' component={Form2}/>
        </Switch>
        </main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
