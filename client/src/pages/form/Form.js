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
    this.picRow3Callback = this.picRow3Callback.bind(this);
    this.localSelectCallback = this.localSelectCallback.bind(this);
  }

  state = {
    test: false,
    screen: 0,
    picRow1Data: {},
    picRow2Data: {},
    picRow3Data: {},
    currHouse: {},
    currImg: null,
    images: [],
    test: undefined,
    currId: null,
    openChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    overgrowthChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    junkVehicleChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    junkChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    leakingChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    waterChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    squattersChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    boardedChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    rodentChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    floodedChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    },
    otherChecked: {
      state: false,
      monthsOne: false,
      monthsFour: false,
      monthsSix: false,
      front: false,
      back: false,
      side: false,
      comments: null
    }
  };

  localSelectCallback(selected){
    console.log(selected);
    var id = this.state.currId;
    try{
      this.state.images[id].houseData = JSON.parse(selected.value);
      this.setState({images : this.state.images});
      console.log(selected);
    }catch(e){

    };

  }

  resetDropdown(){
    if(this.refs.localSelect != null){
      this.refs.localSelect.handleSetSelect("Select An Address", "None");
    }
  }
  picRow1Callback(selected) {
    this.setState({picRow1Data: selected});
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
    fetch('/images', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      var obj = {};
      for(var i = 0; i < data.length; i++){
        obj[i] = {
          id: i,
          url: data[i],
          openChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          overgrowthChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          junkVehicleChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          junkChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          vacantChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          leakingChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          waterChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          squattersChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          boardedChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          rodentChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          floodedChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          otherChecked: {
            state: false,
            monthsOne: false,
            monthsFour: false,
            monthsSix: false,
            front: false,
            back: false,
            side: false,
            comments: null
          },
          houseData: {},
          violations: []
        }
      }
      this.setState({images: obj});
      console.log(this.state.images[0]);
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

  selectImage(obj){
    this.setState({
      currId: obj.id,
      openChecked: {
        state: obj.openChecked.state,
        monthsOne: obj.openChecked.monthsOne,
        monthsFour: obj.openChecked.monthsFour,
        monthsSix: obj.openChecked.monthsSix,
        front: obj.openChecked.front,
        back: obj.openChecked.back,
        side: obj.openChecked.side,
        comments: obj.openChecked.comments
      },
      overgrowthChecked: {
        state: obj.overgrowthChecked.state,
        monthsOne: obj.overgrowthChecked.monthsOne,
        monthsFour: obj.overgrowthChecked.monthsFour,
        monthsSix: obj.overgrowthChecked.monthsSix,
        front: obj.overgrowthChecked.front,
        back: obj.overgrowthChecked.back,
        side: obj.overgrowthChecked.side,
        comments: obj.overgrowthChecked.comments
      },
      junkVehicleChecked: {
        state: obj.junkVehicleChecked.state,
        monthsOne: obj.junkVehicleChecked.monthsOne,
        monthsFour: obj.junkVehicleChecked.monthsFour,
        monthsSix: obj.junkVehicleChecked.monthsSix,
        front: obj.junkVehicleChecked.front,
        back: obj.junkVehicleChecked.back,
        side: obj.junkVehicleChecked.side,
        comments: obj.junkVehicleChecked.comments
      },
      junkChecked: {
        state: obj.junkChecked.state,
        monthsOne: obj.junkChecked.monthsOne,
        monthsFour: obj.junkChecked.monthsFour,
        monthsSix: obj.junkChecked.monthsSix,
        front: obj.junkChecked.front,
        back: obj.junkChecked.back,
        side: obj.junkChecked.side,
        comments: obj.junkChecked.comments
      },
      leakingChecked: {
        state: obj.leakingChecked.state,
        monthsOne: obj.leakingChecked.monthsOne,
        monthsFour: obj.leakingChecked.monthsFour,
        monthsSix: obj.leakingChecked.monthsSix,
        front: obj.leakingChecked.front,
        back: obj.leakingChecked.back,
        side: obj.leakingChecked.side,
        comments: obj.leakingChecked.comments
      },
      waterChecked: {
        state: obj.waterChecked.state,
        monthsOne: obj.waterChecked.monthsOne,
        monthsFour: obj.waterChecked.monthsFour,
        monthsSix: obj.waterChecked.monthsSix,
        front: obj.waterChecked.front,
        back: obj.waterChecked.back,
        side: obj.waterChecked.side,
        comments: obj.waterChecked.comments
      },
      squattersChecked: {
        state: obj.squattersChecked.state,
        monthsOne: obj.squattersChecked.monthsOne,
        monthsFour: obj.squattersChecked.monthsFour,
        monthsSix: obj.squattersChecked.monthsSix,
        front: obj.squattersChecked.front,
        back: obj.squattersChecked.back,
        side: obj.squattersChecked.side,
        comments: obj.squattersChecked.comments
      },
      boardedChecked: {
        state: obj.boardedChecked.state,
        monthsOne: obj.boardedChecked.monthsOne,
        monthsFour: obj.boardedChecked.monthsFour,
        monthsSix: obj.boardedChecked.monthsSix,
        front: obj.boardedChecked.front,
        back: obj.boardedChecked.back,
        side: obj.boardedChecked.side,
        comments: obj.boardedChecked.comments
      },
      rodentChecked: {
        state: obj.rodentChecked.state,
        monthsOne: obj.rodentChecked.monthsOne,
        monthsFour: obj.rodentChecked.monthsFour,
        monthsSix: obj.rodentChecked.monthsSix,
        front: obj.rodentChecked.front,
        back: obj.rodentChecked.back,
        side: obj.rodentChecked.side,
        comments: obj.rodentChecked.comments
      },
      floodedChecked: {
        state: obj.floodedChecked.state,
        monthsOne: obj.floodedChecked.monthsOne,
        monthsFour: obj.floodedChecked.monthsFour,
        monthsSix: obj.floodedChecked.monthsSix,
        front: obj.floodedChecked.front,
        back: obj.floodedChecked.back,
        side: obj.floodedChecked.side,
        comments: obj.floodedChecked.comments
      },
      otherChecked: {
        state: obj.otherChecked.state,
        monthsOne: obj.otherChecked.monthsOne,
        monthsFour: obj.otherChecked.monthsFour,
        monthsSix: obj.otherChecked.monthsSix,
        front: obj.otherChecked.front,
        back: obj.otherChecked.back,
        side: obj.otherChecked.side,
        comments: obj.otherChecked.comments
      },
      currImg: obj.url
    },function(){
          //console.log(this.state.images[this.state.currId]);
      this.resetDropdown();
         // if(this.refs.localSelect.getValue) this.refs.localSelect.handleSetSelect("Select An Address", "None");
     if(this.state.images[this.state.currId].houseData.streetName != null) {
       // var obj = this.state.images[this.state.currId].houseData;
       // console.log(obj);
       // var str = obj.fullAddress;
       // this.refs.localSelect.handleSetSelect(str, obj);
     }
      else{
       //this.refs.localSelect.handleResetSelect();
     }
    }
    );
    // if(this.refs.row1Select.getValue() != "Choose An Address..."){
    //   this.setState({currHouse: JSON.parse(this.refs.row1Select.getValue())});
    //   this.state.images[obj.id].houseData = JSON.parse(this.refs.row1Select.getValue());
    // }
    //if(this.refs.localSelect) this.refs.localSelect.handleResetSelect();
    //this.state.images[obj.id].houseData = {};

    console.log(this.state.images[obj.id]);
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

  updateViolations(event, v, c, e){
    console.log(event);
    var id  = this.state.currId;
    this.setState({ [c]: {[e]: !this.state[c][e]} });
    this.state.images[id][c][e] = !this.state.images[id][c][e];
    console.log(this.state.images[id]);
   // var result = this.state.images[id].violations.find((n) => {
   //   return n === v;
   //  });
   //  if(result == null){
   //    this.state.images[id].violations.push(v);
   //    this.state.images[id][c][e] = true;
   //    console.log(this.state.images[id]);
   //  }
   //  else{
   //    var index = this.state.images[id].violations.indexOf(v);
   //    this.state.images[id][c][e] = false;
   //    this.state.images[id].violations.splice(index, 1);
   //    console.log(this.state.images[id]);
   //  }
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
    if (this.state.images[0] !== null) {
      return (
          <div className="App">
            <div className="section">
              <div className="container">
                <div className="row">
                  <div className="col s12 l6">
                    {/*<h5 className="no-margin-top heading"><b>1. Select An Address</b></h5>
                    <ReactMaterialSelect ref="row1Select" label="Select An Address" resetLabel="None" defaultValue="Choose An Address..." onChange={this.picRow1Callback.bind(this)}>
                      {this.state.test.map((element) =>
                          <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                      )}
                    </ReactMaterialSelect>*/}
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 l3">
                    <h5><b>1. Select A Photo</b></h5>
                  </div>
                  <div className="col s12 l8">
                    <h5><b>2. Add Violation(s)</b></h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 l3">
                    <div className="row">
                      <div className="col s12">
                        {/*<ReactMaterialSelect ref="row1Select" label="Assign address to picture(s) below" resetLabel="None" defaultValue="Choose An Address..." onChange={this.picRow1Callback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>*/}
                        <div className="row">
                          { Object.keys(this.state.images).map((element, i) =>
                          <div className="col s6">
                              <a href="javascript:void(0)" onClick={() => this.selectImage(this.state.images[element])}>
                                <div className="card">
                                  <div className="card-image">
                                    <img src={this.state.images[element].url} width="50%"/>
                                  </div>
                                </div>
                              </a>
                          </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <a className="btn btn-large green darken-1">Create Entry w/o Photo</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.currId != null ? (
                  <div className="col s12 l9 border-left-light">
                    <div className="row image">

                      <div className="col s12 m8">
                        <ReactMaterialSelect ref="localSelect" label="Select An Address" resetLabel="None" defaultValue="None" onChange={this.localSelectCallback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>
                        <p></p>
                        <img src={this.state.currImg} width="50%"/>
                      </div>
                    </div>
                    <div className="row address">
                      <div className="col s12 m8">
                        <p className="no-margin">Address</p>
                        { this.state.images[this.state.currId].houseData.fullAddress != null ? (
                            <p className="no-margin">{this.state.images[this.state.currId].houseData.fullAddress}</p>
                        ) : (
                            <p className="no-margin red-text"><em>Use the dropdown above to assign an address to this picture</em></p>
                        )}
                      </div>
                    </div>
                    <div className="row time">
                      <div className="col s12 m8">
                        <p className="no-margin">Date</p>
                        <p className="no-margin">{today.getMonth() + 1}/{today.getDate()}/{today.getFullYear()}</p>
                      </div>
                    </div>

                    <div className="row issues">
                      <div className="col s12 m3">
                        <p className="">Select Code Violation(s)</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-struct" checked={this.state.openChecked.state}
                                 onChange={() => this.updateViolations("Open/Vacant", "openChecked", "state")}/>
                          <label for="open-struct">Open/Vacant</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth" checked={this.state.overgrowthChecked.state}
                                 onChange={() => this.updateViolations("Overgrown", "overgrowthChecked", "state")}/>
                          <label for="overgrowth">Overgrown</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters" checked={this.state.squattersChecked.state}
                                 onChange={() => this.updateViolations("Housing Squatters", "squattersChecked", "state")}/>
                          <label for="squatters">Housing Squatters</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking" checked={this.state.leakingChecked.state}
                                 onChange={() => this.updateViolations("Damaged/Leaking", "leakingChecked", "state")}/>
                          <label for="leaking">Damaged/Leaking</label>
                        </p>
                        <p>
                          <input type="checkbox" id="no-water" checked={this.state.waterChecked.state}
                                 onChange={() => this.updateViolations("No Power/Water", "waterChecked", "state")}/>
                          <label for="no-water">No Power/Water</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded" checked={this.state.boardedChecked.state}
                                 onChange={() => this.updateViolations("Boarded Up", "boardedChecked", "state")}/>
                          <label for="boarded">Boarded Up</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent" checked={this.state.rodentChecked.state}
                                 onChange={() => this.updateViolations("Rodent Infested", "rodentChecked", "state")}/>
                          <label for="rodent">Rodent Infested</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded" checked={this.state.floodedChecked.state}
                                 onChange={() => this.updateViolations("Flooded", "floodedChecked", "state")}/>
                          <label for="flooded">Flooded</label>
                        </p>
                        <p>
                          <input type="checkbox" id="trash" checked={this.state.junkChecked.state}
                                 onChange={() => this.updateViolations("Excessive Trash", "junkChecked", "state")}/>
                          <label for="trash">Excessive Trash</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-vehicle" checked={this.state.junkVehicleChecked.state}
                                 onChange={() => this.updateViolations("Junk Vehicle", "junkVehicleChecked", "state")}/>
                          <label for="junk-vehicle">Junk Vehicle/Tires</label>
                        </p>

                        <p>
                          <input type="checkbox" id="other" checked={this.state.otherChecked.state}
                                 onChange={() => this.updateViolations("Other", "otherChecked", "state")}/>
                          <label for="other">Other</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className=""># Months</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-months-one" checked={this.state.openChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "openChecked", "monthsOne")}/>
                          <label for="open-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="open-months-four" checked={this.state.openChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "openChecked", "monthsFour")}/>
                          <label for="open-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="open-months-six" checked={this.state.openChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "openChecked", "monthsSix")}/>
                          <label for="open-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-months-one" checked={this.state.overgrowthChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "overgrowthChecked", "monthsOne")}/>
                          <label for="overgrowth-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="overgrowth-months-four" checked={this.state.overgrowthChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "overgrowthChecked", "monthsFour")}/>
                          <label for="overgrowth-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="overgrowth-months-six" checked={this.state.overgrowthChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "overgrowthChecked", "monthsSix")}/>
                          <label for="overgrowth-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-months-one" checked={this.state.squattersChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "squattersChecked", "monthsOne")}/>
                          <label for="squatters-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="squatters-months-four" checked={this.state.squattersChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "squattersChecked", "monthsFour")}/>
                          <label for="squatters-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="squatters-months-six" checked={this.state.squattersChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "squattersChecked", "monthsSix")}/>
                          <label for="squatters-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-months-one" checked={this.state.leakingChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "leakingChecked", "monthsOne")}/>
                          <label for="leaking-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="leaking-months-four" checked={this.state.leakingChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "leakingChecked", "monthsFour")}/>
                          <label for="leaking-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="leaking-months-six" checked={this.state.leakingChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "leakingChecked", "monthsSix")}/>
                          <label for="leaking-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-months-one" checked={this.state.waterChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "waterChecked", "monthsOne")}/>
                          <label for="water-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="water-months-four" checked={this.state.waterChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "waterChecked", "monthsFour")}/>
                          <label for="water-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="water-months-six" checked={this.state.waterChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "waterChecked", "monthsSix")}/>
                          <label for="water-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-months-one" checked={this.state.boardedChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "boardedChecked", "monthsOne")}/>
                          <label for="boarded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="boarded-months-four" checked={this.state.boardedChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "boardedChecked", "monthsFour")}/>
                          <label for="boarded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="boarded-months-six" checked={this.state.boardedChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "boardedChecked", "monthsSix")}/>
                          <label for="boarded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-months-one" checked={this.state.rodentChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "rodentChecked", "monthsOne")}/>
                          <label for="rodent-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="rodent-months-four" checked={this.state.rodentChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "rodentChecked", "monthsFour")}/>
                          <label for="rodent-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="rodent-months-six" checked={this.state.rodentChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "rodentChecked", "monthsSix")}/>
                          <label for="rodent-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-months-one" checked={this.state.floodedChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "floodedChecked", "monthsOne")}/>
                          <label for="flooded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="flooded-months-four" checked={this.state.floodedChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "floodedChecked", "monthsFour")}/>
                          <label for="flooded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="flooded-months-six" checked={this.state.floodedChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "floodedChecked", "monthsSix")}/>
                          <label for="flooded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-months-one" checked={this.state.junkChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "junkChecked", "monthsOne")}/>
                          <label for="junk-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="open-months-four" checked={this.state.junkChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "junkChecked", "monthsFour")}/>
                          <label for="junk-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junk-months-six" checked={this.state.junkChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "junkChecked", "monthsSix")}/>
                          <label for="junk-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-months-one" checked={this.state.junkVehicleChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "junkVehicleChecked", "monthsOne")}/>
                          <label for="junkVehicle-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="junkVehicle-months-four" checked={this.state.junkVehicleChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "junkVehicleChecked", "monthsFour")}/>
                          <label for="junkVehicle-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junkVehicle-months-six" checked={this.state.junkVehicleChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "junkVehicleChecked", "monthsSix")}/>
                          <label for="junkVehicle-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-months-one" checked={this.state.otherChecked.monthsOne}
                                 onChange={() => this.updateViolations("1-3", "otherChecked", "monthsOne")}/>
                          <label for="other-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="other-months-four" checked={this.state.otherChecked.monthsFour}
                                 onChange={() => this.updateViolations("4-6", "otherChecked", "monthsFour")}/>
                          <label for="other-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="other-months-six" checked={this.state.otherChecked.monthsSix}
                                 onChange={() => this.updateViolations("6+", "otherChecked", "monthsSix")}/>
                          <label for="other-months-six" className="monthsLabel">6+</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className="">Location On Property</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-front" checked={this.state.openChecked.front}
                                 onChange={() => this.updateViolations("front", "openChecked", "front")}/>
                          <label for="open-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="open-back" checked={this.state.openChecked.back}
                                 onChange={() => this.updateViolations("back", "openChecked", "back")}/>
                          <label for="open-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="open-side" checked={this.state.openChecked.side}
                                 onChange={() => this.updateViolations("side", "openChecked", "side")}/>
                          <label for="open-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-front" checked={this.state.overgrowthChecked.front}
                                 onChange={() => this.updateViolations("front", "overgrowthChecked", "front")}/>
                          <label for="overgrowth-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="open-back" checked={this.state.overgrowthChecked.back}
                                 onChange={() => this.updateViolations("back", "overgrowthChecked", "back")}/>
                          <label for="overgrowth-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="open-side" checked={this.state.overgrowthChecked.side}
                                 onChange={() => this.updateViolations("side", "overgrowthChecked", "side")}/>
                          <label for="overgrowth-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-front" checked={this.state.squattersChecked.front}
                                 onChange={() => this.updateViolations("front", "squattersChecked", "front")}/>
                          <label for="squatters-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="squatters-back" checked={this.state.squattersChecked.back}
                                 onChange={() => this.updateViolations("back", "squattersChecked", "back")}/>
                          <label for="squatters-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="squatters-side" checked={this.state.squattersChecked.side}
                                 onChange={() => this.updateViolations("side", "squattersChecked", "side")}/>
                          <label for="squatters-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-front" checked={this.state.leakingChecked.front}
                                 onChange={() => this.updateViolations("front", "leakingChecked", "front")}/>
                          <label for="leaking-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="leaking-back" checked={this.state.leakingChecked.back}
                                 onChange={() => this.updateViolations("back", "leakingChecked", "back")}/>
                          <label for="leaking-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="leaking-side" checked={this.state.leakingChecked.side}
                                 onChange={() => this.updateViolations("side", "leakingChecked", "side")}/>
                          <label for="leaking-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-front" checked={this.state.waterChecked.front}
                                 onChange={() => this.updateViolations("front", "waterChecked", "front")}/>
                          <label for="water-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="water-back" checked={this.state.waterChecked.back}
                                 onChange={() => this.updateViolations("back", "waterChecked", "back")}/>
                          <label for="water-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="water-side" checked={this.state.waterChecked.side}
                                 onChange={() => this.updateViolations("side", "waterChecked", "side")}/>
                          <label for="water-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-front" checked={this.state.boardedChecked.front}
                                 onChange={() => this.updateViolations("front", "boardedChecked", "front")}/>
                          <label for="boarded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="boarded-back" checked={this.state.boardedChecked.back}
                                 onChange={() => this.updateViolations("back", "boardedChecked", "back")}/>
                          <label for="boarded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="boarded-side" checked={this.state.boardedChecked.side}
                                 onChange={() => this.updateViolations("side", "boardedChecked", "side")}/>
                          <label for="boarded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-front" checked={this.state.rodentChecked.front}
                                 onChange={() => this.updateViolations("front", "rodentChecked", "front")}/>
                          <label for="rodent-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="rodent-back" checked={this.state.rodentChecked.back}
                                 onChange={() => this.updateViolations("back", "rodentChecked", "back")}/>
                          <label for="rodent-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="rodent-side" checked={this.state.rodentChecked.side}
                                 onChange={() => this.updateViolations("side", "rodentChecked", "side")}/>
                          <label for="rodent-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-front" checked={this.state.floodedChecked.front}
                                 onChange={() => this.updateViolations("front", "floodedChecked", "front")}/>
                          <label for="flooded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="flooded-back" checked={this.state.floodedChecked.back}
                                 onChange={() => this.updateViolations("back", "floodedChecked", "back")}/>
                          <label for="flooded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="flooded-side" checked={this.state.floodedChecked.side}
                                 onChange={() => this.updateViolations("side", "floodedChecked", "side")}/>
                          <label for="flooded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-front" checked={this.state.junkChecked.front}
                                 onChange={() => this.updateViolations("front", "junkChecked", "front")}/>
                          <label for="junk-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junk-back" checked={this.state.junkChecked.back}
                                 onChange={() => this.updateViolations("back", "junkChecked", "back")}/>
                          <label for="junk-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="open-side" checked={this.state.junkChecked.side}
                                 onChange={() => this.updateViolations("side", "junkChecked", "side")}/>
                          <label for="junk-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-front" checked={this.state.junkVehicleChecked.front}
                                 onChange={() => this.updateViolations("front", "junkVehicleChecked", "front")}/>
                          <label for="junkVehicle-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junkVehicle-back" checked={this.state.junkVehicleChecked.back}
                                 onChange={() => this.updateViolations("back", "junkVehicleChecked", "back")}/>
                          <label for="junkVehicle-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="junkVehicle-side" checked={this.state.junkVehicleChecked.side}
                                 onChange={() => this.updateViolations("side", "junkVehicleChecked", "side")}/>
                          <label for="junkVehicle-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-front" checked={this.state.otherChecked.front}
                                 onChange={() => this.updateViolations("front", "otherChecked", "front")}/>
                          <label for="other-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="other-back" checked={this.state.otherChecked.back}
                                 onChange={() => this.updateViolations("back", "otherChecked", "back")}/>
                          <label for="other-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="other-side" checked={this.state.otherChecked.side}
                                 onChange={() => this.updateViolations("side", "otherChecked", "side")}/>
                          <label for="other-side" className="monthsLabel">Side</label>
                        </p>
                          </form>
                      </div>
                      <div className="col s12 m3">
                        <p className="">Comments</p>
                        <form action="#">
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" onBlur={() => this.updateViolations("comment", "openChecked", "comment")} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="first_name" type="text" className="validate" />
                          </div>
                        </div>
                          </form>
                      </div>


                      <div className="col s12 formCol">
                        {/*<form action="#">
                          <p>
                            <input type="checkbox" id="open-struct" checked={this.state.openChecked.state}
                                   onChange={() => this.updateViolations("Open/Vacant", "openChecked.state")}/>
                            <label for="open-struct">Open & Vacant Structure</label>
                          </p>
                          <p>
                            <input type="checkbox" id="overgrowth" checked={this.state.overgrowthChecked}
                                   onChange={() => this.updateViolations("Overgrowth (grass, weeds, kudz)", "overgrowthChecked")}/>
                            <label for="overgrowth">Overgrowth (grass, weeds, kudz)</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junk-vehicle" checked={this.state.junkVehicleChecked}
                                   onChange={() => this.updateViolations("Junk vehicle", "junkVehicleChecked")}/>
                            <label for="junk-vehicle">Junk vehicle</label>
                          </p>
                          <p>
                            <input type="checkbox" id="trash" checked={this.state.junkChecked}
                                   onChange={() => this.updateViolations("Junk, debris, trash", "junkChecked")}/>
                            <label for="trash">Junk, debris, trash</label>
                          </p>
                          <p>
                            <input type="checkbox" id="vacant-lot" checked={this.state.vacantChecked}
                                   onChange={() => this.updateViolations("Vacant Lot", "vacantChecked")}/>
                            <label for="vacant-lot">Vacant Lot</label>
                          </p>
                          <p>
                            <input type="checkbox" id="leaking" checked={this.state.leakingChecked}
                                   onChange={() => this.updateViolations("Leaking / inoperable plumbing", "leakingChecked")}/>
                            <label for="leaking">Leaking / inoperable plumbing</label>
                          </p>
                          <p>
                            <input type="checkbox" id="no-water" checked={this.state.waterChecked}
                                   onChange={() => this.updateViolations("No water (hot/cold)", "waterChecked")}/>
                            <label for="no-water">No water (hot/cold)</label>
                          </p>
                          <p>
                            <input type="checkbox" id="no-heat" checked={this.state.heatChecked}
                                   onChange={() => this.updateViolations("No heat", "heatChecked")}/>
                            <label for="no-heat">No heat</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junk-tires" checked={this.state.tiresChecked}
                                   onChange={() => this.updateViolations("Junk Tires", "tiresChecked")}/>
                            <label for="junk-tires">Junk Tires</label>
                          </p>
                        </form>*/}
                        <br></br>
                        <a className="btn" onClick={() => this.saveViolations()}>Save</a>
                      </div>
                    </div>
                  </div> ) :
                        <div className="col s12 l8 null">
                          <h3 className="grey-text lighten-2 null-state">Choose An Image, Assign An Address, Add Violations</h3>
                        </div>

                  }
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
