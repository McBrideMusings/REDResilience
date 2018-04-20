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

  onClick = (e) => {
    console.log(e.target);
    this.state.appHandler(e.target.attributes.getNamedItem('data-pageIndex').value);
  };

  render() {
    const styles = {
      button: {
          margin: 12
      },
      root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
      },
      flexList: {
          display: 'flex',
          overflowX: 'auto',
          flexDirection: 'column',
          justifyContent: 'space-between'
      }
    };
    return (
      <div className="container">
        <div className="section row">
          <div className="col m12 l8">
            <div class="video-container">
              <iframe src="https://www.youtube-nocookie.com/embed/_hH7vZF15SY?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </div>
          <div className="col m12 l4 flex flex-column">
            <h5>We're working to improve Atlanta's westside</h5>
            <p className="grey-text">
              Block by Block is a neighborhood volunteer organization working to improve Atlanta westside housing through the tracking and reporting of housing violations. 
              We're active primarily in the English Avenue and Vine City neighborhoods with plans to continue this work to other Atlanta neighborhoods 
            </p>
            <section className="flex flex-column">
              <MuiThemeProvider> 
                <RaisedButton
                  label="Download Code violation Form"
                  backgroundColor="#25AB50"
                  labelColor="white"
                  labelPosition="before"
                  className="green darken-1 white-text"
                  containerElement="label"
                  href="../../static/BbB_Form.pdf"
                  target="_blank"
                >
                </RaisedButton>
              </MuiThemeProvider>
              <MuiThemeProvider> 
                <RaisedButton
                  href="javascript:void(0)"
                  label="Add New Code Violation"
                  backgroundColor="#25AB50"
                  labelColor="white"
                  labelPosition="before"
                  className="green darken-1 white-text x-margin"
                  containerElement="label"
                  data-pageindex="1"
                  onClick={this.onClick}
                >
                </RaisedButton>
              </MuiThemeProvider>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;