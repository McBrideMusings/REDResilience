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
    screen: 0,
    picRow1Data: {},
    picRow2Data: {},
    picRow3Data: {},
    currHouse: {},
    currImg: null,
    images: [],
    test: undefined,
    currId: null,
    openChecked: false,
    openCheckedmonthsOne: false,
    openCheckedmonthsFour: false,
    openCheckedmonthsSix: false,
    openCheckedfront: false,
    openCheckedback: false,
    openCheckedside: false,
    openCheckedcomments: null,
    overgrowthChecked: false,
    overgrowthCheckedmonthsOne: false,
    overgrowthCheckedmonthsFour: false,
    overgrowthCheckedmonthsSix: false,
    overgrowthCheckedfront: false,
    overgrowthCheckedback: false,
    overgrowthCheckedside: false,
    overgrowthCheckedcomments: null,
    junkVehicleChecked: false,
    junkVehicleCheckedmonthsOne: false,
    junkVehicleCheckedmonthsFour: false,
    junkVehicleCheckedmonthsSix: false,
    junkVehicleCheckedfront: false,
    junkVehicleCheckedback: false,
    junkVehicleCheckedside: false,
    junkVehicleCheckedcomments: null,
    junkChecked: false,
    junkCheckedmonthsOne: false,
    junkCheckedmonthsFour: false,
    junkCheckedmonthsSix: false,
    junkCheckedfront: false,
    junkCheckedback: false,
    junkCheckedside: false,
    junkCheckedcomments: null,
    leakingChecked: false,
    leakingCheckedmonthsOne: false,
    leakingCheckedmonthsFour: false,
    leakingCheckedmonthsSix: false,
    leakingCheckedfront: false,
    leakingCheckedback: false,
    leakingCheckedside: false,
    leakingCheckedcomments: null,
    waterChecked: false,
    waterCheckedmonthsOne: false,
    waterCheckedmonthsFour: false,
    waterCheckedmonthsSix: false,
    waterCheckedfront: false,
    waterCheckedback: false,
    waterCheckedside: false,
    waterCheckedcomments: null,
    squattersChecked: false,
    squattersCheckedmonthsOne: false,
    squattersCheckedmonthsFour: false,
    squattersCheckedmonthsSix: false,
    squattersCheckedfront: false,
    squattersCheckedback: false,
    squattersCheckedside: false,
    squattersCheckedcomments: null,
    boardedChecked: false,
    boardedCheckedmonthsOne: false,
    boardedCheckedmonthsFour: false,
    boardedCheckedmonthsSix: false,
    boardedCheckedfront: false,
    boardedCheckedback: false,
    boardedCheckedside: false,
    boardedCheckedcomments: null,
    rodentChecked: false,
    rodentCheckedmonthsOne: false,
    rodentCheckedmonthsFour: false,
    rodentCheckedmonthsSix: false,
    rodentCheckedfront: false,
    rodentCheckedback: false,
    rodentCheckedside: false,
    rodentCheckedcomments: null,
    floodedChecked: false,
    floodedCheckedmonthsOne: false,
    floodedCheckedmonthsFour: false,
    floodedCheckedmonthsSix: false,
    floodedCheckedfront: false,
    floodedCheckedback: false,
    floodedCheckedside: false,
    floodedCheckedcomments: null,
    otherChecked: false,
    otherCheckedmonthsOne: false,
    otherCheckedmonthsFour: false,
    otherCheckedmonthsSix: false,
    otherCheckedfront: false,
    otherCheckedback: false,
    otherCheckedside: false,
    otherCheckedcomments: null
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
          openChecked: false,
          openCheckedmonthsOne: false,
          openCheckedmonthsFour: false,
          openCheckedmonthsSix: false,
          openCheckedfront: false,
          openCheckedback: false,
          openCheckedside: false,
          openCheckedcomments: null,
          overgrowthChecked: false,
          overgrowthCheckedmonthsOne: false,
          overgrowthCheckedmonthsFour: false,
          overgrowthCheckedmonthsSix: false,
          overgrowthCheckedfront: false,
          overgrowthCheckedback: false,
          overgrowthCheckedside: false,
          overgrowthCheckedcomments: null,
          junkVehicleChecked: false,
          junkVehicleCheckedmonthsOne: false,
          junkVehicleCheckedmonthsFour: false,
          junkVehicleCheckedmonthsSix: false,
          junkVehicleCheckedfront: false,
          junkVehicleCheckedback: false,
          junkVehicleCheckedside: false,
          junkVehicleCheckedcomments: null,
          junkChecked: false,
          junkCheckedmonthsOne: false,
          junkCheckedmonthsFour: false,
          junkCheckedmonthsSix: false,
          junkCheckedfront: false,
          junkCheckedback: false,
          junkCheckedside: false,
          junkCheckedcomments: null,
          vacantChecked: false,
          vacantCheckedmonthsOne: false,
          vacantCheckedmonthsFour: false,
          vacantCheckedmonthsSix: false,
          vacantCheckedfront: false,
          vacantCheckedback: false,
          vacantCheckedside: false,
          vacantCheckedcomments: null,
          leakingChecked: false,
          leakingCheckedmonthsOne: false,
          leakingCheckedmonthsFour: false,
          leakingCheckedmonthsSix: false,
          leakingCheckedfront: false,
          leakingCheckedback: false,
          leakingCheckedside: false,
          leakingCheckedcomments: null,
          waterChecked: false,
          waterCheckedmonthsOne: false,
          waterCheckedmonthsFour: false,
          waterCheckedmonthsSix: false,
          waterCheckedfront: false,
          waterCheckedback: false,
          waterCheckedside: false,
          waterCheckedcomments: null,
          squattersChecked: false,
          squattersCheckedmonthsOne: false,
          squattersCheckedmonthsFour: false,
          squattersCheckedmonthsSix: false,
          squattersCheckedfront: false,
          squattersCheckedback: false,
          squattersCheckedside: false,
          squattersCheckedcomments: null,
          boardedChecked: false,
          boardedCheckedmonthsOne: false,
          boardedCheckedmonthsFour: false,
          boardedCheckedmonthsSix: false,
          boardedCheckedfront: false,
          boardedCheckedback: false,
          boardedCheckedside: false,
          boardedCheckedcomments: null,
          rodentChecked: false,
          rodentCheckedmonthsOne: false,
          rodentCheckedmonthsFour: false,
          rodentCheckedmonthsSix: false,
          rodentCheckedfront: false,
          rodentCheckedback: false,
          rodentCheckedside: false,
          rodentCheckedcomments: null,
          floodedChecked: false,
          floodedCheckedmonthsOne: false,
          floodedCheckedmonthsFour: false,
          floodedCheckedmonthsSix: false,
          floodedCheckedfront: false,
          floodedCheckedback: false,
          floodedCheckedside: false,
          floodedCheckedcomments: null,
          otherChecked: false,
          otherCheckedmonthsOne: false,
          otherCheckedmonthsFour: false,
          otherCheckedmonthsSix: false,
          otherCheckedfront: false,
          otherCheckedback: false,
          otherCheckedside: false,
          otherCheckedcomments: null,
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
      openChecked: obj.openChecked,
      openCheckedmonthsOne: obj.openCheckedmonthsOne,
      openCheckedmonthsFour: obj.openCheckedmonthsFour,
      openCheckedmonthsSix: obj.openCheckedmonthsSix,
      openCheckedfront: obj.openCheckedfront,
      openCheckedback: obj.openCheckedback,
      openCheckedside: obj.openCheckedside,
      openCheckedcomments: obj.openCheckedcomments,
      overgrowthChecked: obj.overgrowthChecked,
      overgrowthCheckedmonthsOne: obj.overgrowthCheckedmonthsOne,
      overgrowthCheckedmonthsFour: obj.overgrowthCheckedmonthsFour,
      overgrowthCheckedmonthsSix: obj.overgrowthCheckedmonthsSix,
      overgrowthCheckedfront: obj.overgrowthCheckedfront,
      overgrowthCheckedback: obj.overgrowthCheckedback,
      overgrowthCheckedside: obj.overgrowthCheckedside,
      overgrowthCheckedcomments: obj.overgrowthCheckedcomments,
      junkVehicleChecked: obj.junkVehicleChecked,
      junkVehicleCheckedmonthsOne: obj.junkVehicleCheckedmonthsOne,
      junkVehicleCheckedmonthsFour: obj.junkVehicleCheckedmonthsFour,
      junkVehicleCheckedmonthsSix: obj.junkVehicleCheckedmonthsSix,
      junkVehicleCheckedfront: obj.junkVehicleCheckedfront,
      junkVehicleCheckedback: obj.junkVehicleCheckedback,
      junkVehicleCheckedside: obj.junkVehicleCheckedside,
      junkVehicleCheckedcomments: obj.junkVehicleCheckedcomments,
      junkChecked: obj.junkChecked,
      junkCheckedmonthsOne: obj.junkCheckedmonthsOne,
      junkCheckedmonthsFour: obj.junkCheckedmonthsFour,
      junkCheckedmonthsSix: obj.junkCheckedmonthsSix,
      junkCheckedfront: obj.junkCheckedfront,
      junkCheckedback: obj.junkCheckedback,
      junkCheckedside: obj.junkCheckedside,
      junkCheckedcomments: obj.junkCheckedcomments,
      leakingChecked: obj.leakingChecked,
      leakingCheckedmonthsOne: obj.leakingCheckedmonthsOne,
      leakingCheckedmonthsFour: obj.leakingCheckedmonthsFour,
      leakingCheckedmonthsSix: obj.leakingCheckedmonthsSix,
      leakingCheckedfront: obj.leakingCheckedfront,
      leakingCheckedback: obj.leakingCheckedback,
      leakingCheckedside: obj.leakingCheckedside,
      leakingCheckedcomments: obj.leakingCheckedcomments,
      waterChecked: obj.waterChecked,
      waterCheckedmonthsOne: obj.waterCheckedmonthsOne,
      waterCheckedmonthsFour: obj.waterCheckedmonthsFour,
      waterCheckedmonthsSix: obj.waterCheckedmonthsSix,
      waterCheckedfront: obj.waterCheckedfront,
      waterCheckedback: obj.waterCheckedback,
      waterCheckedside: obj.waterCheckedside,
      waterCheckedcomments: obj.waterCheckedcomments,
      squattersChecked: obj.squattersChecked,
      squattersCheckedmonthsOne: obj.squattersCheckedmonthsOne,
      squattersCheckedmonthsFour: obj.squattersCheckedmonthsFour,
      squattersCheckedmonthsSix: obj.squattersCheckedmonthsSix,
      squattersCheckedfront: obj.squattersCheckedfront,
      squattersCheckedback: obj.squattersCheckedback,
      squattersCheckedside: obj.squattersCheckedside,
      squattersCheckedcomments: obj.squattersCheckedcomments,
      boardedChecked: obj.boardedChecked,
      boardedCheckedmonthsOne: obj.boardedCheckedmonthsOne,
      boardedCheckedmonthsFour: obj.boardedCheckedmonthsFour,
      boardedCheckedmonthsSix: obj.boardedCheckedmonthsSix,
      boardedCheckedfront: obj.boardedCheckedfront,
      boardedCheckedback: obj.boardedCheckedback,
      boardedCheckedside: obj.boardedCheckedside,
      boardedCheckedcomments: obj.boardedCheckedcomments,
      rodentChecked: obj.rodentChecked.state,
      rodentCheckedmonthsOne: obj.rodentCheckedmonthsOne,
      rodentCheckedmonthsFour: obj.rodentCheckedmonthsFour,
      rodentCheckedmonthsSix: obj.rodentCheckedmonthsSix,
      rodentCheckedfront: obj.rodentCheckedfront,
      rodentCheckedback: obj.rodentCheckedback,
      rodentCheckedside: obj.rodentCheckedside,
      rodentCheckedcomments: obj.rodentCheckedcomments,
      floodedChecked: obj.floodedChecked,
      floodedCheckedmonthsOne: obj.floodedCheckedmonthsOne,
      floodedCheckedmonthsFour: obj.floodedCheckedmonthsFour,
      floodedCheckedmonthsSix: obj.floodedCheckedmonthsSix,
      floodedCheckedfront: obj.floodedCheckedfront,
      floodedCheckedback: obj.floodedCheckedback,
      floodedCheckedside: obj.floodedCheckedside,
      floodedCheckedcomments: obj.floodedCheckedcomments,
      otherChecked: obj.otherChecked,
      otherCheckedmonthsOne: obj.otherCheckedmonthsOne,
      otherCheckedmonthsFour: obj.otherCheckedmonthsFour,
      otherCheckedmonthsSix: obj.otherCheckedmonthsSix,
      otherCheckedfront: obj.otherCheckedfront,
      otherCheckedback: obj.otherCheckedback,
      otherCheckedside: obj.otherCheckedside,
      otherCheckedcomments: obj.otherCheckedcomments,
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

  updateViolations(v, c){
    var id  = this.state.currId;
    this.setState({ [c]: !this.state[c] });
    this.state.images[id][c] = !this.state.images[id][c];
    //console.log(this.state.images[id]);
   var result = this.state.images[id].violations.find((n) => {
     return n === v;
    });
    if(result == null){
      this.state.images[id].violations.push(v);
      this.state.images[id][c] = true;
      console.log(this.state.images[id]);
    }
    else{
      var index = this.state.images[id].violations.indexOf(v);
      this.state.images[id][c] = false;
      this.state.images[id].violations.splice(index, 1);
      console.log(this.state.images[id]);
    }
  }

  saveViolations(){
    for(var i=0; i< Object.keys(this.state.images).length; i++){
      var postData = {houseData: {}, violationData: {}};
      let newViolations = this.reconstructViolations(this.state.images[i].violations);
      postData.houseData = this.state.images[i].houseData;
      Object.keys(newViolations[0]).forEach(function(key, idx) {
        if(Object.keys(newViolations[0][key]).length){
          fetch('/addViolations', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              houseData: postData.houseData,
              violationData: newViolations[0][key]
            })
          });
        }
      });
    }
    this.violations = [];
  }

  reconstructViolations(v){
    var newViolations = [];
    var obj = {open: {}, overgrowth: {}, squatters: {}, leaking: {}, water: {}, boarded: {}, rodent: {}, flooded: {}, trash: {}, junkVehicle: {}, other: {}};
    for(var i=0; i<v.length; i++){
      if(v[i].includes("Open/Vacant")){
        obj.open.name = "Open/Vacant";
        if(v[i].includes("1-3")){
          obj.open.monthsOne = true;
        }
        if(v[i].includes("4-6")){
          obj.open.monthsFour = true;
        }
        if(v[i].includes("6+")){
          obj.open.monthsSix = true;
        }
        if(v[i].includes("front")){
          obj.open.front = true;
        }
        if(v[i].includes("back")){
          obj.open.back = true;
        }
        if(v[i].includes("side")){
          obj.open.side = true;
        }
      }
      if(v[i].includes("Overgrown")){
        obj.overgrowth.name = "Overgrown";
        if(v[i].includes("1-3")){
          obj.overgrowth.monthsOne = true;
        }
        if(v[i].includes("4-6")){
          obj.overgrowth.monthsFour = true;
        }
        if(v[i].includes("6+")){
          obj.overgrowth.monthsSix = true;
        }
        if(v[i].includes("front")){
          obj.overgrowth.front = true;
        }
        if(v[i].includes("back")){
          obj.overgrowth.back = true;
        }
        if(v[i].includes("side")){
          obj.overgrowth.side = true;
        }
      }
      if(v[i].includes("Squatters")) {
        obj.squatters.name = "Housing Squatters";
        if (v[i].includes("1-3")) {
          obj.squatters.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.squatters.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.squatters.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.squatters.front = true;
        }
        if (v[i].includes("back")) {
          obj.squatters.back = true;
        }
        if (v[i].includes("side")) {
          obj.squatters.side = true;
        }
      }
      if(v[i].includes("Damaged/Leaking")) {
        obj.leaking.name = "Damaged/Leaking";
        if (v[i].includes("1-3")) {
          obj.leaking.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.leaking.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.leaking.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.leaking.front = true;
        }
        if (v[i].includes("back")) {
          obj.leaking.back = true;
        }
        if (v[i].includes("side")) {
          obj.leaking.side = true;
        }
      }
      if(v[i].includes("Water")) {
        obj.leaking.name = "No Power/Water";
        if (v[i].includes("1-3")) {
          obj.water.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.water.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.water.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.water.front = true;
        }
        if (v[i].includes("back")) {
          obj.water.back = true;
        }
        if (v[i].includes("side")) {
          obj.water.side = true;
        }
      }
      if(v[i].includes("Boarded Up")) {
        obj.boarded.name = "Boarded Up";
        if (v[i].includes("1-3")) {
          obj.boarded.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.boarded.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.boarded.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.boarded.front = true;
        }
        if (v[i].includes("back")) {
          obj.boarded.back = true;
        }
        if (v[i].includes("side")) {
          obj.boarded.side = true;
        }
      }
      if(v[i].includes("Rodent")) {
        obj.rodent.name = "Rodent Infested";
        if (v[i].includes("1-3")) {
          obj.rodent.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.rodent.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.rodent.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.rodent.front = true;
        }
        if (v[i].includes("back")) {
          obj.rodent.back = true;
        }
        if (v[i].includes("side")) {
          obj.rodent.side = true;
        }
      }
      if(v[i].includes("Flooded")) {
        obj.flooded.name = "Flooded";
        if (v[i].includes("1-3")) {
          obj.flooded.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.flooded.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.flooded.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.flooded.front = true;
        }
        if (v[i].includes("back")) {
          obj.flooded.back = true;
        }
        if (v[i].includes("side")) {
          obj.flooded.side = true;
        }
      }
      if(v[i].includes("Excessive Trash")) {
        obj.trash.name = "Excessive Trash";
        if (v[i].includes("1-3")) {
          obj.trash.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.trash.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.trash.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.trash.front = true;
        }
        if (v[i].includes("back")) {
          obj.trash.back = true;
        }
        if (v[i].includes("side")) {
          obj.trash.side = true;
        }
      }
      if(v[i].includes("Vehicle")) {
        obj.junkVehicle.name = "Junk Vehicle";
        if (v[i].includes("1-3")) {
          obj.junkVehicle.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.junkVehicle.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.junkVehicle.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.junkVehicle.front = true;
        }
        if (v[i].includes("back")) {
          obj.junkVehicle.back = true;
        }
        if (v[i].includes("side")) {
          obj.junkVehicle.side = true;
        }
      }
      if(v[i].includes("Other")) {
        obj.other.name = "Other";
        if (v[i].includes("1-3")) {
          obj.other.monthsOne = true;
        }
        if (v[i].includes("4-6")) {
          obj.other.monthsFour = true;
        }
        if (v[i].includes("6+")) {
          obj.other.monthsSix = true;
        }
        if (v[i].includes("front")) {
          obj.other.front = true;
        }
        if (v[i].includes("back")) {
          obj.other.back = true;
        }
        if (v[i].includes("side")) {
          obj.other.side = true;
        }
      }
    }
    newViolations.push(obj);
    return newViolations;
  }


  render() {
    const today = new Date();
    if (this.state.test !== undefined) {
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
                          <input type="checkbox" id="open-struct" checked={this.state.openChecked}
                                 onChange={() => this.updateViolations("Open/Vacant", "openChecked")}/>
                          <label for="open-struct">Open/Vacant</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth" checked={this.state.overgrowthChecked}
                                 onChange={() => this.updateViolations("Overgrown", "overgrowthChecked")}/>
                          <label for="overgrowth">Overgrown</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters" checked={this.state.squattersChecked}
                                 onChange={() => this.updateViolations("Housing Squatters", "squattersChecked")}/>
                          <label for="squatters">Housing Squatters</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking" checked={this.state.leakingChecked}
                                 onChange={() => this.updateViolations("Damaged/Leaking", "leakingChecked")}/>
                          <label for="leaking">Damaged/Leaking</label>
                        </p>
                        <p>
                          <input type="checkbox" id="no-water" checked={this.state.waterChecked}
                                 onChange={() => this.updateViolations("No Power/Water", "waterChecked")}/>
                          <label for="no-water">No Power/Water</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded" checked={this.state.boardedChecked}
                                 onChange={() => this.updateViolations("Boarded Up", "boardedChecked")}/>
                          <label for="boarded">Boarded Up</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent" checked={this.state.rodentChecked}
                                 onChange={() => this.updateViolations("Rodent Infested", "rodentChecked")}/>
                          <label for="rodent">Rodent Infested</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded" checked={this.state.floodedChecked}
                                 onChange={() => this.updateViolations("Flooded", "floodedChecked")}/>
                          <label for="flooded">Flooded</label>
                        </p>
                        <p>
                          <input type="checkbox" id="trash" checked={this.state.junkChecked}
                                 onChange={() => this.updateViolations("Excessive Trash", "junkChecked")}/>
                          <label for="trash">Excessive Trash</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-vehicle" checked={this.state.junkVehicleChecked}
                                 onChange={() => this.updateViolations("Junk Vehicle", "junkVehicleChecked")}/>
                          <label for="junk-vehicle">Junk Vehicle/Tires</label>
                        </p>

                        <p>
                          <input type="checkbox" id="other" checked={this.state.otherChecked}
                                 onChange={() => this.updateViolations("Other", "otherChecked")}/>
                          <label for="other">Other</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className=""># Months</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-months-one" checked={this.state.openCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Open/Vacant 1-3", "openCheckedmonthsOne")}/>
                          <label for="open-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="open-months-four" checked={this.state.openCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Open/Vacant 4-6", "openCheckedmonthsFour")}/>
                          <label for="open-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="open-months-six" checked={this.state.openCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Open/Vacant 6+", "openCheckedmonthsSix")}/>
                          <label for="open-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-months-one" checked={this.state.overgrowthCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Overgrown 1-3", "overgrowthCheckedmonthsOne")}/>
                          <label for="overgrowth-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="overgrowth-months-four" checked={this.state.overgrowthCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Overgrown 4-6", "overgrowthCheckedmonthsFour")}/>
                          <label for="overgrowth-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="overgrowth-months-six" checked={this.state.overgrowthCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Overgrown 6+", "overgrowthCheckedmonthsSix")}/>
                          <label for="overgrowth-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-months-one" checked={this.state.squattersCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Housing Squatters 1-3", "squattersCheckedmonthsOne")}/>
                          <label for="squatters-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="squatters-months-four" checked={this.state.squattersCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Housing Squatters 4-6", "squattersCheckedmonthsFour")}/>
                          <label for="squatters-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="squatters-months-six" checked={this.state.squattersCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Housing Squatters 6+", "squattersCheckedmonthsSix")}/>
                          <label for="squatters-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-months-one" checked={this.state.leakingCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Damaged/Leaking 1-3", "leakingCheckedmonthsOne")}/>
                          <label for="leaking-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="leaking-months-four" checked={this.state.leakingCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Damaged/Leaking 4-6", "leakingCheckedmonthsFour")}/>
                          <label for="leaking-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="leaking-months-six" checked={this.state.leakingCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Damaged/Leaking 6+", "leakingCheckedmonthsSix")}/>
                          <label for="leaking-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-months-one" checked={this.state.waterCheckedmonthsOne}
                                 onChange={() => this.updateViolations("No Power/Water 1-3", "waterCheckedmonthsOne")}/>
                          <label for="water-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="water-months-four" checked={this.state.waterCheckedmonthsFour}
                                 onChange={() => this.updateViolations("No Power/Water 4-6", "waterCheckedmonthsFour")}/>
                          <label for="water-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="water-months-six" checked={this.state.waterCheckedmonthsSix}
                                 onChange={() => this.updateViolations("No Power/Water 6+", "waterCheckedmonthsSix")}/>
                          <label for="water-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-months-one" checked={this.state.boardedCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Boarded Up 1-3", "boardedCheckedmonthsOne")}/>
                          <label for="boarded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="boarded-months-four" checked={this.state.boardedCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Boarded Up 4-6", "boardedCheckedmonthsFour")}/>
                          <label for="boarded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="boarded-months-six" checked={this.state.boardedCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Boarded Up 6+", "boardedCheckedmonthsSix")}/>
                          <label for="boarded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-months-one" checked={this.state.rodentCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Rodent Infested 1-3", "rodentCheckedmonthsOne")}/>
                          <label for="rodent-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="rodent-months-four" checked={this.state.rodentCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Rodent Infested 4-6", "rodentCheckedmonthsFour")}/>
                          <label for="rodent-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="rodent-months-six" checked={this.state.rodentCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Rodent Infested 6+", "rodentCheckedmonthsSix")}/>
                          <label for="rodent-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-months-one" checked={this.state.floodedCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Flooded 1-3", "floodedCheckedmonthsOne")}/>
                          <label for="flooded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="flooded-months-four" checked={this.state.floodedCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Flooded 4-6", "floodedCheckedmonthsFour")}/>
                          <label for="flooded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="flooded-months-six" checked={this.state.floodedCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Flooded 6+", "floodedCheckedmonthsSix")}/>
                          <label for="flooded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-months-one" checked={this.state.junkCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Excessive Trash 1-3", "junkCheckedmonthsOne")}/>
                          <label for="junk-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="junk-months-four" checked={this.state.junkCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Excessive Trash 4-6", "junkCheckedmonthsFour")}/>
                          <label for="junk-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junk-months-six" checked={this.state.junkCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Excessive Trash 6+", "junkCheckedmonthsSix")}/>
                          <label for="junk-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-months-one" checked={this.state.junkVehicleCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Junk Vehicle 1-3", "junkVehicleCheckedmonthsOne")}/>
                          <label for="junkVehicle-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="junkVehicle-months-four" checked={this.state.junkVehicleCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Junk Vehicle 4-6", "junkVehicleCheckedmonthsFour")}/>
                          <label for="junkVehicle-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junkVehicle-months-six" checked={this.state.junkVehicleCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Junk Vehicle 6+", "junkVehicleCheckedmonthsSix")}/>
                          <label for="junkVehicle-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-months-one" checked={this.state.otherCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Other 1-3", "otherCheckedmonthsOne")}/>
                          <label for="other-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="other-months-four" checked={this.state.otherCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Other 4-6", "otherCheckedmonthsFour")}/>
                          <label for="other-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="other-months-six" checked={this.state.otherCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Other 6+", "otherCheckedmonthsSix")}/>
                          <label for="other-months-six" className="monthsLabel">6+</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className="">Location On Property</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-front" checked={this.state.openCheckedfront}
                                 onChange={() => this.updateViolations("Open/Vacant front", "openCheckedfront")}/>
                          <label for="open-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="open-back" checked={this.state.openCheckedback}
                                 onChange={() => this.updateViolations("Open/Vacant back", "openCheckedback")}/>
                          <label for="open-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="open-side" checked={this.state.openCheckedside}
                                 onChange={() => this.updateViolations("Open/Vacant side", "openCheckedside")}/>
                          <label for="open-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-front" checked={this.state.overgrowthCheckedfront}
                                 onChange={() => this.updateViolations("Overgrown front", "overgrowthCheckedfront")}/>
                          <label for="overgrowth-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="overgrowth-back" checked={this.state.overgrowthCheckedback}
                                 onChange={() => this.updateViolations("Overgrown back", "overgrowthCheckedback")}/>
                          <label for="overgrowth-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="overgrowth-side" checked={this.state.overgrowthCheckedside}
                                 onChange={() => this.updateViolations("Overgrown side", "overgrowthCheckedside")}/>
                          <label for="overgrowth-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-front" checked={this.state.squattersCheckedfront}
                                 onChange={() => this.updateViolations("Housing Squatters front", "squattersCheckedfront")}/>
                          <label for="squatters-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="squatters-back" checked={this.state.squattersCheckedback}
                                 onChange={() => this.updateViolations("Housing Squatters back", "squattersCheckedback")}/>
                          <label for="squatters-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="squatters-side" checked={this.state.squattersCheckedside}
                                 onChange={() => this.updateViolations("Housing Squatters side", "squattersCheckedside")}/>
                          <label for="squatters-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-front" checked={this.state.leakingCheckedfront}
                                 onChange={() => this.updateViolations("Damaged/Leaking front", "leakingCheckedfront")}/>
                          <label for="leaking-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="leaking-back" checked={this.state.leakingCheckedback}
                                 onChange={() => this.updateViolations("Damaged/Leaking back", "leakingCheckedback")}/>
                          <label for="leaking-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="leaking-side" checked={this.state.leakingCheckedside}
                                 onChange={() => this.updateViolations("Damaged/Leaking side", "leakingCheckedside")}/>
                          <label for="leaking-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-front" checked={this.state.waterCheckedfront}
                                 onChange={() => this.updateViolations("No Power/Water front", "waterCheckedfront")}/>
                          <label for="water-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="water-back" checked={this.state.waterCheckedback}
                                 onChange={() => this.updateViolations("No Power/Water back", "waterCheckedback")}/>
                          <label for="water-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="water-side" checked={this.state.waterCheckedside}
                                 onChange={() => this.updateViolations("No Power/Water side", "waterCheckedside")}/>
                          <label for="water-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-front" checked={this.state.boardedCheckedfront}
                                 onChange={() => this.updateViolations("Boarded Up front", "boardedCheckedfront")}/>
                          <label for="boarded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="boarded-back" checked={this.state.boardedCheckedback}
                                 onChange={() => this.updateViolations("Boarded Up back", "boardedCheckedback")}/>
                          <label for="boarded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="boarded-side" checked={this.state.boardedCheckedside}
                                 onChange={() => this.updateViolations("Boarded Up side", "boardedCheckedside")}/>
                          <label for="boarded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-front" checked={this.state.rodentCheckedfront}
                                 onChange={() => this.updateViolations("Rodent Infested front", "rodentCheckedfront")}/>
                          <label for="rodent-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="rodent-back" checked={this.state.rodentCheckedback}
                                 onChange={() => this.updateViolations("Rodent Infested back", "rodentCheckedback")}/>
                          <label for="rodent-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="rodent-side" checked={this.state.rodentCheckedside}
                                 onChange={() => this.updateViolations("Rodent Infested side", "rodentCheckedside")}/>
                          <label for="rodent-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-front" checked={this.state.floodedCheckedfront}
                                 onChange={() => this.updateViolations("Flooded front", "floodedCheckedfront")}/>
                          <label for="flooded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="flooded-back" checked={this.state.floodedCheckedback}
                                 onChange={() => this.updateViolations("Flooded back", "floodedCheckedback")}/>
                          <label for="flooded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="flooded-side" checked={this.state.floodedCheckedside}
                                 onChange={() => this.updateViolations("Flooded side", "floodedCheckedside")}/>
                          <label for="flooded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-front" checked={this.state.junkCheckedfront}
                                 onChange={() => this.updateViolations("Excessive Trash front", "junkCheckedfront")}/>
                          <label for="junk-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junk-back" checked={this.state.junkCheckedback}
                                 onChange={() => this.updateViolations("Excessive Trash back", "junkCheckedback")}/>
                          <label for="junk-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="junk-side" checked={this.state.junkCheckedside}
                                 onChange={() => this.updateViolations("Excessive Trash side", "junkCheckedside")}/>
                          <label for="junk-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-front" checked={this.state.junkVehicleCheckedfront}
                                 onChange={() => this.updateViolations("Junk Vehicle front", "junkVehicleCheckedfront")}/>
                          <label for="junkVehicle-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junkVehicle-back" checked={this.state.junkVehicleCheckedback}
                                 onChange={() => this.updateViolations("Junk Vehicle back", "junkVehicleCheckedback")}/>
                          <label for="junkVehicle-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="junkVehicle-side" checked={this.state.junkVehicleCheckedside}
                                 onChange={() => this.updateViolations("Junk Vehicle side", "junkVehicleCheckedside")}/>
                          <label for="junkVehicle-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-front" checked={this.state.otherCheckedfront}
                                 onChange={() => this.updateViolations("Other front", "otherCheckedfront")}/>
                          <label for="other-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="other-back" checked={this.state.otherCheckedback}
                                 onChange={() => this.updateViolations("Other back", "otherCheckedback")}/>
                          <label for="other-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="other-side" checked={this.state.otherCheckedside}
                                 onChange={() => this.updateViolations("Other side", "otherCheckedside")}/>
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
                          <br></br>
                          <a className="btn" onClick={() => this.saveViolations()}>Save</a>
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
