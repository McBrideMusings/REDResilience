import React, { Component } from 'react';
import axios from 'axios';

class ViewPics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.files
    };
  }

  render() {
    console.log(this.state.files);
    const listItems = this.state.files.map((file) =>
      <div key={file.toString()} className="col s1">
        <img className="responsive-img" src={'/uploads/'+file} />
      </div>
    );
    return (
      <div>
        {listItems}
      </div>
    );
  }
}

export default ViewPics;