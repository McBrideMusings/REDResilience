/**
 * Created by Pierce.
 */
import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select';
import 'react-material-select/lib/css/reactMaterialSelect.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appHandler: this.props.appHandler,
    };
  }

  render() {
    const styles = {
      button: {
          margin: 12
      },
      exampleImageInput: {
          cursor: 'pointer',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          opacity: 0
      },
      root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
      },
      gridList: {
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto'
      }
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 l6">
            <h5>This is the Block by Block Initiative</h5>
            <p>
              A neighborhood volunteer organization dedicated to improving west side housing <br />
              We're dedicated. 
            </p>
            <MuiThemeProvider>
              <RaisedButton
                label="Download Code violation Form"
                backgroundColor="#25AB50"
                labelColor="white"
                labelPosition="before"
                className="green darken-1 white-text"
                containerElement="label"
              >
              </RaisedButton>
            </MuiThemeProvider>
          </div>
          <div className="col m12 l6">
            <h5>This is the Block by Block Initiative</h5>
            <p>
              A neighborhood volunteer organization dedicated to improving west side housing <br />
              We're dedicated. 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;