import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'
import tempData from '../../tempData.json';

class Form extends Component {
  constructor(props) {
    super(props);

    this.violations = [];
    this.violationList = ["Open & Vacant Structure", "Overgrowth (grass, weeds, kudz)", "Junk vehicle", "Junk, debris, trash", "Vacant Lot", "Leaking/ inoperable plumbing", "No water (hot/cold)", "No heat", "Junk Tires"];
    this.picRow1Callback = this.picRow1Callback.bind(this);
    this.picRow2Callback = this.picRow2Callback.bind(this);
    this.picRow3Callback = this.picRow3Callback.bind(this);
  }

  state = {
    screen: 0,
    picRow1Data: {},
    picRow2Data: {},
    picRow3Data: {},
    currHouse: {},
    currImg: null,
    test: undefined,
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
  picRow1Callback(selected) {
    this.setState({picRow1Data: selected})
    console.log(this.state.picRow1Data);
  }
  picRow2Callback(selected) {
    this.setState({picRow2Data: selected})
  }
  picRow3Callback(selected) {
    this.setState({picRow3Data: selected})
  }
  componentDidMount() {
    fetch('/data', {
      method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({test: data});
        });
  }
  
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
  setAddressRow1(img){
    //console.log(JSON.parse(this.refs.row1Select.getValue()));
    if(this.refs.row1Select.getValue() !== "Choose An Address..."){
      this.setState({currHouse: JSON.parse(this.refs.row1Select.getValue())});
      this.setState({currImg: img});
      this.violations = [];
    }
  }
  setAddressRow2(img){
    //console.log(JSON.parse(this.refs.row2Select.getValue()));
    if(this.refs.row2Select.getValue() !== "Choose An Address..."){
      this.setState({currHouse: JSON.parse(this.refs.row2Select.getValue())});
      this.setState({currImg: img});
      this.violations = [];
    }
  }
  setAddressRow3(img){
    //console.log(JSON.parse(this.refs.row3Select.getValue()));
    if(this.refs.row3Select.getValue() !== "Choose An Address..."){
      this.setState({currHouse: JSON.parse(this.refs.row3Select.getValue())});
      this.setState({currImg: img});
      this.violations = [];
    }
  }

  setHouse(obj){
    this.currHouse = obj;
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
    // var result = this.state.test.results[0].sheets.find((n) => {
    //   return n.id === this.currHouse.id;
    // });
    for(var i=0; i<this.violations.length; i++){
      var newViolationObj = {"timestamp": "March 9th, 2018", "codeviolation": this.violations[i], "codenumber" : 5};
      //result.codeviolations.push(newViolationObj);
      fetch('/addViolations', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.currHouse,
          data: newViolationObj
        })
      })
    }
    this.violations = [];
  }



  render() {
    const today = new Date();
    if (this.state.test !== undefined) {
      return (
          <div className="App">
            <div className="section">
              <div className="container">
                <div className="row no-margin">
                  <div className="col s12 l4">
                    <h5 className="no-margin-top heading"><b>1. Select An Image<br></br>2. Assign An Address<br></br>3. Add
                      Violation(s)</b></h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 l4 border-right-light">
                    <div className="row">
                      <div className="col s12">
                        <ReactMaterialSelect ref="row1Select" label="Assign address to picture(s) below" resetLabel="None" defaultValue="Choose An Address..." onChange={this.picRow1Callback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>
                        <div class="row no-margin">
                          <div class="col s6">
                            <a href="javascript:void(0)" onClick={() => this.setAddressRow1("/img/559_sunset.png")}>
                              <div className="card">
                                <div className="card-image">
                                  <img src="/img/559_sunset.png" width="50%"/>
                                </div>
                              </div>
                            </a>
                          </div>
                          <div class="col s6">
                            <a href="javascript:void(0)" onClick={() => this.setAddressRow1("/img/559_sunset_2.png")}>
                              <div className="card">
                                <div className="card-image">
                                  <img src="/img/559_sunset_2.png" width="50%"/>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <ReactMaterialSelect ref="row2Select" label="Assign address to picture(s) below" resetLabel="None" defaultValue="Choose An Address..." onChange={this.picRow2Callback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>
                        <div class="row no-margin-bottom">
                          <div class="col s6">
                            <a href="javascript:void(0)" onClick={() => this.setAddressRow2("/img/683_dalvigney.png")}>
                              <div className="card">
                                <div className="card-image">
                                  <img src="/img/683_dalvigney.png" width="50%"/>
                                </div>
                              </div>
                            </a>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s12">
                        <ReactMaterialSelect ref="row3Select" label="Assign address to picture(s) below" resetLabel="None" defaultValue="Choose An Address..." onChange={this.picRow3Callback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>
                        <div class="row">
                          <div class="col s6">
                            <a href="javascript:void(0)" onClick={() => this.setAddressRow3("/img/696_fox.png")}>
                              <div className="card">
                                <div className="card-image">
                                  <img src="/img/696_fox.png" width="50%"/>
                                </div>
                              </div>
                            </a>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row">

                      {/*{this.state.test.map((element) =>
                          <div className="col s6">
                            <a key={element.id} href="#" onClick={() => this.setHouse(element)}>
                              <div className="card">
                                <div className="card-image">
                                  <img src="/img/559_sunset.png" width="100%"/>
                                  <div className="card-content white-text">
                                    <span className="black-text">{element.fulladdress}</span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                      )}*/}
                    </div>
                  </div>
                  <div className="col s12 l8">
                    <div className="row image">
                      <div className="col s12 m4">
                      </div>
                      <div className="col s12 m8">
                        <img src={this.state.currImg} width="50%"/>
                      </div>
                    </div>
                    <div className="row address">
                      <div className="col s12 m4">
                        <p className="right no-margin">Address</p>
                      </div>
                      <div className="col s12 m8">
                        <p className="no-margin">{this.state.currHouse.fullAddress}</p>
                      </div>
                    </div>
                    <div className="row time">
                      <div className="col s12 m4">
                        <p className="right no-margin">Date</p>
                      </div>
                      <div className="col s12 m8">
                        <p className="no-margin">{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</p>
                      </div>
                    </div>
                    <div className="row issues">
                      <div className="col s12 m4">
                        <p className="right">Select Code Violation(s)</p>
                      </div>
                      <div className="col s12 m8 formCol">
                        <form action="#">
                          <p>
                            <input type="checkbox" id="open-struct"
                                   onChange={() => this.updateViolations("Open & Vacant Structure")}/>
                            <label for="open-struct">Open & Vacant Structure</label>
                          </p>
                          <p>
                            <input type="checkbox" id="overgrowth"
                                   onChange={() => this.updateViolations("Overgrowth (grass, weeds, kudz)")}/>
                            <label for="overgrowth">Overgrowth (grass, weeds, kudz)</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junk-vehicle"
                                   onChange={() => this.updateViolations("Junk vehicle")}/>
                            <label for="junk-vehicle">Junk vehicle</label>
                          </p>
                          <p>
                            <input type="checkbox" id="trash"
                                   onChange={() => this.updateViolations("Junk, debris, trash")}/>
                            <label for="trash">Junk, debris, trash</label>
                          </p>
                          <p>
                            <input type="checkbox" id="vacant-lot"
                                   onChange={() => this.updateViolations("Vacant Lot")}/>
                            <label for="vacant-lot">Vacant Lot</label>
                          </p>
                          <p>
                            <input type="checkbox" id="leaking"
                                   onChange={() => this.updateViolations("Leaking / inoperable plumbing")}/>
                            <label for="leaking">Leaking / inoperable plumbing</label>
                          </p>
                          <p>
                            <input type="checkbox" id="no-water"
                                   onChange={() => this.updateViolations("No water (hot/cold)")}/>
                            <label for="no-water">No water (hot/cold)</label>
                          </p>
                          <p>
                            <input type="checkbox" id="no-heat" onChange={() => this.updateViolations("No heat")}/>
                            <label for="no-heat">No heat</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junk-tires"
                                   onChange={() => this.updateViolations("Junk Tires")}/>
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
    }else{
      return (
          <div className="row">
            <div className="col s12 flex flex-column">
              loading data....
            </div>
          </div>
      );
    }
  }

  checkState() { // This is hyper-specific and bad and assumes the data never fails to be passed
    if (this.state.test === null) {
      return [];
    }
    return this.state.test;
  }
}

export default Form;
