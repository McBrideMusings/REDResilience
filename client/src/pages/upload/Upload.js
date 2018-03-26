import React, { Component } from 'react';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
      uploadedImgs: []
    };
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  handleUploadImage(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.uploadInput.files[0].name);
    console.log(this.uploadInput.files[0]);
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
    /*
    fetch('/upload', { // Your POST endpoint
      method: 'POST',
      body: data,
    }).then( 
      response => response.json() // if the response is a JSON object
    ).then( 
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
    */
    /*
    fetch('/upload', { // Your POST endpoint
      method: 'POST',
      body: data,
    }).then( (response) => function() {
      console.log("data back");
      response.json() // if the response is a JSON object
    }).then( (success) => function () {
      console.log(success);
      //this.setState({ imageURL: `http://localhost:8000/${body.file}` });
      //console.log(this.state);
    }).catch(
      error => console.log(error) // Handle the error response object
    );
    */
  }
  render() {
    console.log("Rendering");
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 flex flex-column">
            <form onSubmit={this.handleUploadImage}>
              <div>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file"></input>
              </div>
              <div>
                List of Uploaded Images
              </div>
              <div>
                <button type="submit">Upload</button>
              </div>
            </form>
            <img src={this.state.imageURL} alt="img" />
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;