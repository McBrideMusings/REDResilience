import React, { Component } from 'react';
import tempData from '../../tempData.json';

class Form extends Component {
  constructor(props) {
    super(props);
    this.currHouse = {};
    this.violations = [];
    this.violationList = ["Open & Vacant Structure", "Overgrowth (grass, weeds, kudz)", "Junk vehicle", "Junk, debris, trash", "Vacant Lot", "Leaking/ inoperable plumbing", "No water (hot/cold)", "No heat", "Junk Tires"];
  }

  state = {
    screen: 0,
    test: null,
    openChecked: false,
    overgrowthChecked: false,
    junkVehicleChecked: false,
    junkChecked: false,
    vacantChecked: false,
    leakingChecked: false,
    waterChecked: false,
    heatChecked: false,
    tiresChecked: false
  };

  resetCheckboxes(){
    this.setState({
      openChecked: false,
      overgrowthChecked: false,
      junkVehicleChecked: false,
      junkChecked: false,
      vacantChecked: false,
      leakingChecked: false,
      waterChecked: false,
      heatChecked: false,
      tiresChecked: false
    });
  }

  setHouse(obj){
    this.currHouse = obj;
    // var result = this.state.test.results[0].sheets.find((n) => {
    //   return n.id === this.currHouse.id;
    // });
    // for(var i=0; i<result.codeviolations.length; i++){
    //   for(var j=0; j<this.violationList.length; j++){
    //     if(result.codeviolations[i] == this.violationList[j]){
    //       if(result.codeviolations[i] == "Open & Vacant Structure"){
    //         this.setState({openChecked: true});
    //       }
    //       if(result.codeviolations[i] == "Overgrowth (grass, weeds, kudz)"){
    //         this.setState({overgrowthChecked: true});
    //       }
    //       if(result.codeviolations[i] == "Junk vehicle"){
    //         this.setState({junkVehicleChecked: true});
    //       }
    //       if(result.codeviolations[i] == "Junk, debris, trash"){
    //         this.setState({junkChecked: true});
    //       }
    //     }
    //   }
    // }

    //Clear current violation array
    this.violations = [];
  }

  updateViolations(v){
   var result = this.violations.find((n) => {
     return n === v;
    });
    if(result == null){
      this.violations.push(v);
      console.log(v +" added to the array");
    }
    else{
      var index = this.violations.indexOf(v);
      this.violations.splice(index, 1);
      console.log(v +" removed from the array");
    }
  }

  saveViolations(){
    var result = this.state.test.results[0].sheets.find((n) => {
      return n.id === this.currHouse.id;
    });
    for(var i=0; i<this.violations.length; i++){
      var newViolationObj = {"timestamp": "March 9th, 2018", "codeviolation": this.violations[i], "codenumber" : 5};
      result.codeviolations.push(newViolationObj);
      fetch('/addViolations', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.currHouse.id,
          data: newViolationObj
        })
      })
    }
  }

  componentDidMount() {
    console.log(tempData);
    /*
    fetch('/', {
      method: 'POST' 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
    */
  }

  render() {
    const today = new Date();
    return (
      <div className="App">
        <div className="section">
          <div className="container">
            <div className="row no-margin">
              <div className="col s12 l4">
                <h5 className="no-margin-top"><b>Select A Property</b></h5>
              </div>
            </div>
            <div className="row">
              <div className="col s12 l4 border-right-light">
                <div className="row">
                  {this.checkState().map(sheet =>
                    <div className="col s6">
                      <a key={sheet.id}  href="#" onClick={() => this.setHouse(sheet)}>
                        <div className="card">
                          <div className="card-image">
                            <img src="/img/559_sunset.png" width="100%" />
                            <div className="card-content white-text">
                              <span className="black-text">{sheet.fulladdress}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="col s12 l8">
                <div className="row image">
                  <div className="col s12 m4">
                  </div>
                  <div className="col s12 m8">
                    <img src="/img/559_sunset.png" width="50%" />
                  </div>
                </div>
                <div className="row address">
                  <div className="col s12 m4">
                    <p className="right no-margin">Address</p>
                  </div>
                  <div className="col s12 m8">
                    <p className="no-margin">{this.currHouse.fulladdress}</p>
                  </div>
                </div>
                <div className="row time">
                  <div className="col s12 m4">
                    <p className="right no-margin">Date</p>
                  </div>
                  <div className="col s12 m8">
                    <p className="no-margin">{today.getMonth()+1}/{today.getDate()}/{today.getFullYear()}</p>
                  </div>
                </div>
                <div className="row issues">
                  <div className="col s12 m4">
                    <p className="right">Select Code Violation(s)</p>
                  </div>
                  <div className="col s12 m8 formCol">
                    <form action="#">
                      <p>
                        <input type="checkbox" id="open-struct" onChange={() => this.updateViolations("Open & Vacant Structure")} />
                        <label for="open-struct">Open & Vacant Structure</label>
                      </p>
                      <p>
                        <input type="checkbox" id="overgrowth" onChange={() => this.updateViolations("Overgrowth (grass, weeds, kudz)")} />
                        <label for="overgrowth">Overgrowth (grass, weeds, kudz)</label>
                      </p>
                      <p>
                        <input type="checkbox" id="junk-vehicle" onChange={() => this.updateViolations("Junk vehicle")} />
                        <label for="junk-vehicle">Junk vehicle</label>
                      </p>
                      <p>
                        <input type="checkbox" id="trash" onChange={() => this.updateViolations("Junk, debris, trash")} />
                        <label for="trash">Junk, debris, trash</label>
                      </p>
                      <p>
                        <input type="checkbox" id="vacant-lot" onChange={() => this.updateViolations("Vacant Lot")} />
                        <label for="vacant-lot">Vacant Lot</label>
                      </p>
                      <p>
                        <input type="checkbox" id="leaking" onChange={() => this.updateViolations("Leaking / inoperable plumbing")} />
                        <label for="leaking">Leaking / inoperable plumbing</label>
                      </p>
                      <p>
                        <input type="checkbox" id="no-water" onChange={() => this.updateViolations("No water (hot/cold)")} />
                        <label for="no-water">No water (hot/cold)</label>
                      </p>
                      <p>
                        <input type="checkbox" id="no-heat" onChange={() => this.updateViolations("No heat")} />
                        <label for="no-heat">No heat</label>
                      </p>
                      <p>
                        <input type="checkbox" id="junk-tires" onChange={() => this.updateViolations("Junk Tires")} />
                        <label for="junk-tires">Junk Tires</label>
                      </p>
                    </form>
                    <br></br>
                    <a className="btn" onClick={() => this.saveViolations()}>Save</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  checkState() { // This is hyper-specific and bad and assumes the data never fails to be passed
    if (this.state.test === null) {
      return [];
    }
    return this.state.test.results[0].sheets;
  }
}

export default Form;