import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Form from './pages/form/Form';
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css';
import { isNumber, error } from 'util';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pageIndex: 0,
      page:[
        <Home appHandler={this.appHandler}></Home>,
        <Form appHandler={this.appHandler}></Form>
      ]
    };
  }
  appHandler = newPageIndex => {
    if (newPageIndex > this.state.page.length || newPageIndex < 0) {
      console.error("pageHandler - Tried to set pageIndex to invalid index");
    }
    else {
      this.setState({
        pageIndex: newPageIndex
      });
    }
  }
  render() {
    
    return (
      <div className="app">
        <main>
<<<<<<< HEAD
        <Header appHandler={this.appHandler}></Header>
        {this.state.page[this.state.pageIndex]}
=======
        <Header></Header>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/form' component={Form2}/>
        </Switch>
>>>>>>> 2296c91e20cfaa17a43f46768f98962fb2466833
        </main>
        <Footer appHandler={this.appHandler}></Footer>
      </div>
    );
  }
}

export default App;
