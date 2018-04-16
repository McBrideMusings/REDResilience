import React, { Component } from 'react';

import UploadPics from './UploadPics';
import ViewPics from './ViewPics';
import Form from '../form/Form';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    };
  }

  handler = data => {
    this.setState({
      files: data
    })
  }

  onClick = (e) => {
    this.setState({ uploading: true });
  }

  render() {
    if (this.state.files.length === 0){
      return (
        <div className="container">
          <div className="row">
            <UploadPics handler={this.handler}></UploadPics>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <div className="row">
            <ViewPics files={this.state.files}></ViewPics>
          </div>
        </div>
      );
    }

  }
  /*
  constructor(props) {
    super(props);
    this.state = {
      uploadedImgs: []
    };
  }
  onChange = (e) => {
    const state = this.state;

    switch (e.target.name) {
      case 'selectedFile':
        state.selectedFile = e.target.files[0];
        break;
      default:
        state[e.target.name] = e.target.value;
    }

    this.setState(state);
  }


  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.uploadInput.files[0].name);
  
    axios.post('/upload', data)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    fetch('/upload', { // Your POST endpoint
      method: 'POST',
      body: data,
    }).then( response => response.json()
    ).then( success => {
      console.log(success);
      this.setState({ imageURL: `${success.file}` });
    }).catch( error => {
      console.log(error);
    });
  }
  render() {
    console.log("Rendering");
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 flex flex-column">
            <form onSubmit={this.onSubmit}>
              <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file"></input>
              </div>
              <div>
                <button type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  */
}

export default Upload;