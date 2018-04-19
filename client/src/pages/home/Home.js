/**
 * Created by Pierce.
 */
import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select';
import 'react-material-select/lib/css/reactMaterialSelect.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PaperForm from '../../static/BbB_Form.pdf'

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
        <div className="section row">
          <div className="col m12 l6">
            <h5>This is the Block by Block Initiative</h5>
            <p className="grey-text">
              A neighborhood volunteer organization dedicated to improving west side housing
            </p>
            <ul>
              <li><a className="black-text" href="#!">1. </a></li>
              <li><a className="black-text" href="#!">Link 2</a></li>
              <li><a className="black-text" href="#!">Link 3</a></li>
              <li><a className="black-text" href="#!">Link 4</a></li>
            </ul>
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
            <div class="video-container">
              <iframe src="https://www.youtube-nocookie.com/embed/_hH7vZF15SY?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;