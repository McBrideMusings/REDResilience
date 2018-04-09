import React, { Component } from 'react';
import axios from 'axios';

class UploadPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: this.props.handler,
      files: '',
    };
  }

  onChange = (e) => {
    this.setState({ 
      files: e.target.files
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    let inputElement;
    for (let index = 0; index < e.target.children.length; index++) {
      if (e.target.children[index].tagName === "INPUT") {
        inputElement = e.target.children[index];
        break;
      }
    }
    for (let index = 0; index < inputElement.files.length; index++) {
      formData.append('userPhoto', inputElement.files[index], 'chris2.jpg'); // APPEND WORKS?!
    }
    axios.post('/upload', formData)
      .then(response => { 
        console.log(response);
        this.state.handler(response.data.files);
      })
      .catch(error => {
        console.log(error.response);
      }); 
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            id="child"
            type="file"
            name="userPhoto"
            onChange={this.onChange}
            accept='image/*'
            multiple
          />
          <span className='hint'>Supported files: jpg, jpeg, png.</span>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default UploadPics;