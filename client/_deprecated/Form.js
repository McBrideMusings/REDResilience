import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select'
import UploadPics from '../upload/UploadPics';
import Upload from '../upload/Upload';
import 'react-material-select/lib/css/reactMaterialSelect.css'
import tempData from '../../tempData.json';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.localSelectCallback = this.localSelectCallback.bind(this);
    this.commentCallback = this.commentCallback.bind(this);
    this.resolvedCallback = this.resolvedCallback.bind(this);
    this.handleMyFormSubmit = this.handleMyFormSubmit.bind(this);
  }

  state = {
    screen: 0,
    files: '',
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
    }catch(e){}
  }

  resetDropdown(){
    if(this.refs.localSelect != null){
      this.refs.localSelect.handleSetSelect("Select An Address", "None");
    }
  }
  createNewImages(arr){
    var tempImg = this.state.images;
    var imgOffset = Object.keys(this.state.images).length;
    var obj = {};
    for(var i = 0; i < arr.length; i++){
      var url = "/uploads/"+arr[i];
      obj[i] = {
        id: (i+imgOffset),
        url: url,
        openChecked: false,
        openResolved: false,
        openCheckedmonthsOne: false,
        openCheckedmonthsFour: false,
        openCheckedmonthsSix: false,
        openCheckedfront: false,
        openCheckedback: false,
        openCheckedside: false,
        openCheckedcomments: "",
        overgrowthChecked: false,
        overgrowthResolved: false,
        overgrowthCheckedmonthsOne: false,
        overgrowthCheckedmonthsFour: false,
        overgrowthCheckedmonthsSix: false,
        overgrowthCheckedfront: false,
        overgrowthCheckedback: false,
        overgrowthCheckedside: false,
        overgrowthCheckedcomments: "",
        junkVehicleChecked: false,
        junkVehicleResolved: false,
        junkVehicleCheckedmonthsOne: false,
        junkVehicleCheckedmonthsFour: false,
        junkVehicleCheckedmonthsSix: false,
        junkVehicleCheckedfront: false,
        junkVehicleCheckedback: false,
        junkVehicleCheckedside: false,
        junkVehicleCheckedcomments: "",
        junkChecked: false,
        junkResolved: false,
        junkCheckedmonthsOne: false,
        junkCheckedmonthsFour: false,
        junkCheckedmonthsSix: false,
        junkCheckedfront: false,
        junkCheckedback: false,
        junkCheckedside: false,
        junkCheckedcomments: "",
        vacantChecked: false,
        vacantResolved: false,
        vacantCheckedmonthsOne: false,
        vacantCheckedmonthsFour: false,
        vacantCheckedmonthsSix: false,
        vacantCheckedfront: false,
        vacantCheckedback: false,
        vacantCheckedside: false,
        vacantCheckedcomments: "",
        leakingChecked: false,
        leakingResolved: false,
        leakingCheckedmonthsOne: false,
        leakingCheckedmonthsFour: false,
        leakingCheckedmonthsSix: false,
        leakingCheckedfront: false,
        leakingCheckedback: false,
        leakingCheckedside: false,
        leakingCheckedcomments: "",
        waterChecked: false,
        waterResolved: false,
        waterCheckedmonthsOne: false,
        waterCheckedmonthsFour: false,
        waterCheckedmonthsSix: false,
        waterCheckedfront: false,
        waterCheckedback: false,
        waterCheckedside: false,
        waterCheckedcomments: "",
        squattersChecked: false,
        squattersResolved: false,
        squattersCheckedmonthsOne: false,
        squattersCheckedmonthsFour: false,
        squattersCheckedmonthsSix: false,
        squattersCheckedfront: false,
        squattersCheckedback: false,
        squattersCheckedside: false,
        squattersCheckedcomments: "",
        boardedChecked: false,
        boardedResolved: false,
        boardedCheckedmonthsOne: false,
        boardedCheckedmonthsFour: false,
        boardedCheckedmonthsSix: false,
        boardedCheckedfront: false,
        boardedCheckedback: false,
        boardedCheckedside: false,
        boardedCheckedcomments: "",
        rodentChecked: false,
        rodentResolved: false,
        rodentCheckedmonthsOne: false,
        rodentCheckedmonthsFour: false,
        rodentCheckedmonthsSix: false,
        rodentCheckedfront: false,
        rodentCheckedback: false,
        rodentCheckedside: false,
        rodentCheckedcomments: "",
        floodedChecked: false,
        floodedCResolved: false,
        floodedCheckedmonthsOne: false,
        floodedCheckedmonthsFour: false,
        floodedCheckedmonthsSix: false,
        floodedCheckedfront: false,
        floodedCheckedback: false,
        floodedCheckedside: false,
        floodedCheckedcomments: "",
        otherChecked: false,
        otherResolved: false,
        otherCheckedmonthsOne: false,
        otherCheckedmonthsFour: false,
        otherCheckedmonthsSix: false,
        otherCheckedfront: false,
        otherCheckedback: false,
        otherCheckedside: false,
        otherCheckedcomments: "",
        houseData: {},
        violations: []
      };
      tempImg.push(obj[i]);
    }
    this.setState({images: tempImg});
  }
  getImages(){
    fetch('/images', {
      method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
          var obj = {};
          for(var i = 0; i < data.length; i++){
            obj[i] = {
              id: i,
              url: data[i],
              openChecked: false,
              openResolved: false,
              openCheckedmonthsOne: false,
              openCheckedmonthsFour: false,
              openCheckedmonthsSix: false,
              openCheckedfront: false,
              openCheckedback: false,
              openCheckedside: false,
              openCheckedcomments: "",
              overgrowthChecked: false,
              overgrowthResolved: false,
              overgrowthCheckedmonthsOne: false,
              overgrowthCheckedmonthsFour: false,
              overgrowthCheckedmonthsSix: false,
              overgrowthCheckedfront: false,
              overgrowthCheckedback: false,
              overgrowthCheckedside: false,
              overgrowthCheckedcomments: "",
              junkVehicleChecked: false,
              junkVehicleResolved: false,
              junkVehicleCheckedmonthsOne: false,
              junkVehicleCheckedmonthsFour: false,
              junkVehicleCheckedmonthsSix: false,
              junkVehicleCheckedfront: false,
              junkVehicleCheckedback: false,
              junkVehicleCheckedside: false,
              junkVehicleCheckedcomments: "",
              junkChecked: false,
              junkResolved: false,
              junkCheckedmonthsOne: false,
              junkCheckedmonthsFour: false,
              junkCheckedmonthsSix: false,
              junkCheckedfront: false,
              junkCheckedback: false,
              junkCheckedside: false,
              junkCheckedcomments: "",
              vacantChecked: false,
              vacantResolved: false,
              vacantCheckedmonthsOne: false,
              vacantCheckedmonthsFour: false,
              vacantCheckedmonthsSix: false,
              vacantCheckedfront: false,
              vacantCheckedback: false,
              vacantCheckedside: false,
              vacantCheckedcomments: "",
              leakingChecked: false,
              leakingResolved: false,
              leakingCheckedmonthsOne: false,
              leakingCheckedmonthsFour: false,
              leakingCheckedmonthsSix: false,
              leakingCheckedfront: false,
              leakingCheckedback: false,
              leakingCheckedside: false,
              leakingCheckedcomments: "",
              waterChecked: false,
              waterResolved: false,
              waterCheckedmonthsOne: false,
              waterCheckedmonthsFour: false,
              waterCheckedmonthsSix: false,
              waterCheckedfront: false,
              waterCheckedback: false,
              waterCheckedside: false,
              waterCheckedcomments: "",
              squattersChecked: false,
              squattersResolved: false,
              squattersCheckedmonthsOne: false,
              squattersCheckedmonthsFour: false,
              squattersCheckedmonthsSix: false,
              squattersCheckedfront: false,
              squattersCheckedback: false,
              squattersCheckedside: false,
              squattersCheckedcomments: "",
              boardedChecked: false,
              boardedResolved: false,
              boardedCheckedmonthsOne: false,
              boardedCheckedmonthsFour: false,
              boardedCheckedmonthsSix: false,
              boardedCheckedfront: false,
              boardedCheckedback: false,
              boardedCheckedside: false,
              boardedCheckedcomments: "",
              rodentChecked: false,
              rodentResolved: false,
              rodentCheckedmonthsOne: false,
              rodentCheckedmonthsFour: false,
              rodentCheckedmonthsSix: false,
              rodentCheckedfront: false,
              rodentCheckedback: false,
              rodentCheckedside: false,
              rodentCheckedcomments: "",
              floodedChecked: false,
              floodedCResolved: false,
              floodedCheckedmonthsOne: false,
              floodedCheckedmonthsFour: false,
              floodedCheckedmonthsSix: false,
              floodedCheckedfront: false,
              floodedCheckedback: false,
              floodedCheckedside: false,
              floodedCheckedcomments: "",
              otherChecked: false,
              otherResolved: false,
              otherCheckedmonthsOne: false,
              otherCheckedmonthsFour: false,
              otherCheckedmonthsSix: false,
              otherCheckedfront: false,
              otherCheckedback: false,
              otherCheckedside: false,
              otherCheckedcomments: "",
              houseData: {},
              violations: []
            }
          }
          this.setState({images: obj});
        });
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
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      var obj = {};
      for(var i = 0; i < data.length; i++){
        obj[i] = {
          id: i,
          url: data[i],
          openChecked: false,
          openResolved: false,
          openCheckedmonthsOne: false,
          openCheckedmonthsFour: false,
          openCheckedmonthsSix: false,
          openCheckedfront: false,
          openCheckedback: false,
          openCheckedside: false,
          openCheckedcomments: "",
          overgrowthChecked: false,
          overgrowthResolved: false,
          overgrowthCheckedmonthsOne: false,
          overgrowthCheckedmonthsFour: false,
          overgrowthCheckedmonthsSix: false,
          overgrowthCheckedfront: false,
          overgrowthCheckedback: false,
          overgrowthCheckedside: false,
          overgrowthCheckedcomments: "",
          junkVehicleChecked: false,
          junkVehicleResolved: false,
          junkVehicleCheckedmonthsOne: false,
          junkVehicleCheckedmonthsFour: false,
          junkVehicleCheckedmonthsSix: false,
          junkVehicleCheckedfront: false,
          junkVehicleCheckedback: false,
          junkVehicleCheckedside: false,
          junkVehicleCheckedcomments: "",
          junkChecked: false,
          junkResolved: false,
          junkCheckedmonthsOne: false,
          junkCheckedmonthsFour: false,
          junkCheckedmonthsSix: false,
          junkCheckedfront: false,
          junkCheckedback: false,
          junkCheckedside: false,
          junkCheckedcomments: "",
          vacantChecked: false,
          vacantResolved: false,
          vacantCheckedmonthsOne: false,
          vacantCheckedmonthsFour: false,
          vacantCheckedmonthsSix: false,
          vacantCheckedfront: false,
          vacantCheckedback: false,
          vacantCheckedside: false,
          vacantCheckedcomments: "",
          leakingChecked: false,
          leakingResolved: false,
          leakingCheckedmonthsOne: false,
          leakingCheckedmonthsFour: false,
          leakingCheckedmonthsSix: false,
          leakingCheckedfront: false,
          leakingCheckedback: false,
          leakingCheckedside: false,
          leakingCheckedcomments: "",
          waterChecked: false,
          waterResolved: false,
          waterCheckedmonthsOne: false,
          waterCheckedmonthsFour: false,
          waterCheckedmonthsSix: false,
          waterCheckedfront: false,
          waterCheckedback: false,
          waterCheckedside: false,
          waterCheckedcomments: "",
          squattersChecked: false,
          squattersResolved: false,
          squattersCheckedmonthsOne: false,
          squattersCheckedmonthsFour: false,
          squattersCheckedmonthsSix: false,
          squattersCheckedfront: false,
          squattersCheckedback: false,
          squattersCheckedside: false,
          squattersCheckedcomments: "",
          boardedChecked: false,
          boardedResolved: false,
          boardedCheckedmonthsOne: false,
          boardedCheckedmonthsFour: false,
          boardedCheckedmonthsSix: false,
          boardedCheckedfront: false,
          boardedCheckedback: false,
          boardedCheckedside: false,
          boardedCheckedcomments: "",
          rodentChecked: false,
          rodentResolved: false,
          rodentCheckedmonthsOne: false,
          rodentCheckedmonthsFour: false,
          rodentCheckedmonthsSix: false,
          rodentCheckedfront: false,
          rodentCheckedback: false,
          rodentCheckedside: false,
          rodentCheckedcomments: "",
          floodedChecked: false,
          floodedCResolved: false,
          floodedCheckedmonthsOne: false,
          floodedCheckedmonthsFour: false,
          floodedCheckedmonthsSix: false,
          floodedCheckedfront: false,
          floodedCheckedback: false,
          floodedCheckedside: false,
          floodedCheckedcomments: "",
          otherChecked: false,
          otherResolved: false,
          otherCheckedmonthsOne: false,
          otherCheckedmonthsFour: false,
          otherCheckedmonthsSix: false,
          otherCheckedfront: false,
          otherCheckedback: false,
          otherCheckedside: false,
          otherCheckedcomments: "",
          houseData: {},
          violations: []
        }
      }
      this.setState({images: obj});
    });
  }
  componentDidMount() {
    fetch('/data', {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.setState({test: data});
    });
    // fetch('/images', {
    //   method: 'GET'
    // })
    // .then(res => res.json())
    // .then(data => {
    //   var obj = {};
    //   for(var i = 0; i < data.length; i++){
    //     obj[i] = {
    //       id: i,
    //       url: data[i],
    //       openChecked: false,
    //       openResolved: false,
    //       openCheckedmonthsOne: false,
    //       openCheckedmonthsFour: false,
    //       openCheckedmonthsSix: false,
    //       openCheckedfront: false,
    //       openCheckedback: false,
    //       openCheckedside: false,
    //       openCheckedcomments: "",
    //       overgrowthChecked: false,
    //       overgrowthResolved: false,
    //       overgrowthCheckedmonthsOne: false,
    //       overgrowthCheckedmonthsFour: false,
    //       overgrowthCheckedmonthsSix: false,
    //       overgrowthCheckedfront: false,
    //       overgrowthCheckedback: false,
    //       overgrowthCheckedside: false,
    //       overgrowthCheckedcomments: "",
    //       junkVehicleChecked: false,
    //       junkVehicleResolved: false,
    //       junkVehicleCheckedmonthsOne: false,
    //       junkVehicleCheckedmonthsFour: false,
    //       junkVehicleCheckedmonthsSix: false,
    //       junkVehicleCheckedfront: false,
    //       junkVehicleCheckedback: false,
    //       junkVehicleCheckedside: false,
    //       junkVehicleCheckedcomments: "",
    //       junkChecked: false,
    //       junkResolved: false,
    //       junkCheckedmonthsOne: false,
    //       junkCheckedmonthsFour: false,
    //       junkCheckedmonthsSix: false,
    //       junkCheckedfront: false,
    //       junkCheckedback: false,
    //       junkCheckedside: false,
    //       junkCheckedcomments: "",
    //       vacantChecked: false,
    //       vacantResolved: false,
    //       vacantCheckedmonthsOne: false,
    //       vacantCheckedmonthsFour: false,
    //       vacantCheckedmonthsSix: false,
    //       vacantCheckedfront: false,
    //       vacantCheckedback: false,
    //       vacantCheckedside: false,
    //       vacantCheckedcomments: "",
    //       leakingChecked: false,
    //       leakingResolved: false,
    //       leakingCheckedmonthsOne: false,
    //       leakingCheckedmonthsFour: false,
    //       leakingCheckedmonthsSix: false,
    //       leakingCheckedfront: false,
    //       leakingCheckedback: false,
    //       leakingCheckedside: false,
    //       leakingCheckedcomments: "",
    //       waterChecked: false,
    //       waterResolved: false,
    //       waterCheckedmonthsOne: false,
    //       waterCheckedmonthsFour: false,
    //       waterCheckedmonthsSix: false,
    //       waterCheckedfront: false,
    //       waterCheckedback: false,
    //       waterCheckedside: false,
    //       waterCheckedcomments: "",
    //       squattersChecked: false,
    //       squattersResolved: false,
    //       squattersCheckedmonthsOne: false,
    //       squattersCheckedmonthsFour: false,
    //       squattersCheckedmonthsSix: false,
    //       squattersCheckedfront: false,
    //       squattersCheckedback: false,
    //       squattersCheckedside: false,
    //       squattersCheckedcomments: "",
    //       boardedChecked: false,
    //       boardedResolved: false,
    //       boardedCheckedmonthsOne: false,
    //       boardedCheckedmonthsFour: false,
    //       boardedCheckedmonthsSix: false,
    //       boardedCheckedfront: false,
    //       boardedCheckedback: false,
    //       boardedCheckedside: false,
    //       boardedCheckedcomments: "",
    //       rodentChecked: false,
    //       rodentResolved: false,
    //       rodentCheckedmonthsOne: false,
    //       rodentCheckedmonthsFour: false,
    //       rodentCheckedmonthsSix: false,
    //       rodentCheckedfront: false,
    //       rodentCheckedback: false,
    //       rodentCheckedside: false,
    //       rodentCheckedcomments: "",
    //       floodedChecked: false,
    //       floodedCResolved: false,
    //       floodedCheckedmonthsOne: false,
    //       floodedCheckedmonthsFour: false,
    //       floodedCheckedmonthsSix: false,
    //       floodedCheckedfront: false,
    //       floodedCheckedback: false,
    //       floodedCheckedside: false,
    //       floodedCheckedcomments: "",
    //       otherChecked: false,
    //       otherResolved: false,
    //       otherCheckedmonthsOne: false,
    //       otherCheckedmonthsFour: false,
    //       otherCheckedmonthsSix: false,
    //       otherCheckedfront: false,
    //       otherCheckedback: false,
    //       otherCheckedside: false,
    //       otherCheckedcomments: "",
    //       houseData: {},
    //       violations: []
    //     }
    //   }
    //   this.setState({images: obj});
    // });
  }

  addNewEntry(){
    var tempImg = this.state.images;
    var l = Object.keys(this.state.images).length;
    var obj = {
      id: l,
      url: "/img/placeholder.jpg",
      openChecked: false,
      openResolved: false,
      openCheckedmonthsOne: false,
      openCheckedmonthsFour: false,
      openCheckedmonthsSix: false,
      openCheckedfront: false,
      openCheckedback: false,
      openCheckedside: false,
      openCheckedcomments: "",
      overgrowthChecked: false,
      overgrowthResolved: false,
      overgrowthCheckedmonthsOne: false,
      overgrowthCheckedmonthsFour: false,
      overgrowthCheckedmonthsSix: false,
      overgrowthCheckedfront: false,
      overgrowthCheckedback: false,
      overgrowthCheckedside: false,
      overgrowthCheckedcomments: "",
      junkVehicleChecked: false,
      junkVehicleResolved: false,
      junkVehicleCheckedmonthsOne: false,
      junkVehicleCheckedmonthsFour: false,
      junkVehicleCheckedmonthsSix: false,
      junkVehicleCheckedfront: false,
      junkVehicleCheckedback: false,
      junkVehicleCheckedside: false,
      junkVehicleCheckedcomments: "",
      junkChecked: false,
      junkResolved: false,
      junkCheckedmonthsOne: false,
      junkCheckedmonthsFour: false,
      junkCheckedmonthsSix: false,
      junkCheckedfront: false,
      junkCheckedback: false,
      junkCheckedside: false,
      junkCheckedcomments: "",
      vacantChecked: false,
      vacantResolved: false,
      vacantCheckedmonthsOne: false,
      vacantCheckedmonthsFour: false,
      vacantCheckedmonthsSix: false,
      vacantCheckedfront: false,
      vacantCheckedback: false,
      vacantCheckedside: false,
      vacantCheckedcomments: "",
      leakingChecked: false,
      leakingResolved: false,
      leakingCheckedmonthsOne: false,
      leakingCheckedmonthsFour: false,
      leakingCheckedmonthsSix: false,
      leakingCheckedfront: false,
      leakingCheckedback: false,
      leakingCheckedside: false,
      leakingCheckedcomments: "",
      waterChecked: false,
      waterResolved: false,
      waterCheckedmonthsOne: false,
      waterCheckedmonthsFour: false,
      waterCheckedmonthsSix: false,
      waterCheckedfront: false,
      waterCheckedback: false,
      waterCheckedside: false,
      waterCheckedcomments: "",
      squattersChecked: false,
      squattersResolved: false,
      squattersCheckedmonthsOne: false,
      squattersCheckedmonthsFour: false,
      squattersCheckedmonthsSix: false,
      squattersCheckedfront: false,
      squattersCheckedback: false,
      squattersCheckedside: false,
      squattersCheckedcomments: "",
      boardedChecked: false,
      boardedResolved: false,
      boardedCheckedmonthsOne: false,
      boardedCheckedmonthsFour: false,
      boardedCheckedmonthsSix: false,
      boardedCheckedfront: false,
      boardedCheckedback: false,
      boardedCheckedside: false,
      boardedCheckedcomments: "",
      rodentChecked: false,
      rodentResolved: false,
      rodentCheckedmonthsOne: false,
      rodentCheckedmonthsFour: false,
      rodentCheckedmonthsSix: false,
      rodentCheckedfront: false,
      rodentCheckedback: false,
      rodentCheckedside: false,
      rodentCheckedcomments: "",
      floodedChecked: false,
      floodedCResolved: false,
      floodedCheckedmonthsOne: false,
      floodedCheckedmonthsFour: false,
      floodedCheckedmonthsSix: false,
      floodedCheckedfront: false,
      floodedCheckedback: false,
      floodedCheckedside: false,
      floodedCheckedcomments: "",
      otherChecked: false,
      otherResolved: false,
      otherCheckedmonthsOne: false,
      otherCheckedmonthsFour: false,
      otherCheckedmonthsSix: false,
      otherCheckedfront: false,
      otherCheckedback: false,
      otherCheckedside: false,
      otherCheckedcomments: "",
      houseData: {},
      violations: [],
      isPlaceholder: true
    };
    tempImg[l] = obj;
    console.log(tempImg);
    this.setState({images: tempImg});
    this.selectImage(this.state.images[obj.id]);
  }

  deleteImage(obj){
    var tempData = this.state.images;

    console.log(tempData);
    fetch('/deleteImg', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: obj.url
      })
    }).then(function(res){

          console.log(res);
        }
    );

    delete tempData[obj.id];
    var first = tempData[Object.keys(tempData)[0]];
    console.log(first);
    if(first != undefined){
      this.setState({images: tempData, currId: first.id});
      this.selectImage(first);
    }
    else{
      this.setState({images: tempData, currId: null});
    }
  }

  selectImage(obj){
    this.setState({
      currId: obj.id,
      isResolved: obj.isResolved,
      openChecked: obj.openChecked,
      openResolved: obj.openResolved,
      openCheckedmonthsOne: obj.openCheckedmonthsOne,
      openCheckedmonthsFour: obj.openCheckedmonthsFour,
      openCheckedmonthsSix: obj.openCheckedmonthsSix,
      openCheckedfront: obj.openCheckedfront,
      openCheckedback: obj.openCheckedback,
      openCheckedside: obj.openCheckedside,
      openCheckedcomments: obj.openCheckedcomments,
      overgrowthChecked: obj.overgrowthChecked,
      overgrowthResolved: obj.overgrowthResolved,
      overgrowthCheckedmonthsOne: obj.overgrowthCheckedmonthsOne,
      overgrowthCheckedmonthsFour: obj.overgrowthCheckedmonthsFour,
      overgrowthCheckedmonthsSix: obj.overgrowthCheckedmonthsSix,
      overgrowthCheckedfront: obj.overgrowthCheckedfront,
      overgrowthCheckedback: obj.overgrowthCheckedback,
      overgrowthCheckedside: obj.overgrowthCheckedside,
      overgrowthCheckedcomments: obj.overgrowthCheckedcomments,
      junkVehicleChecked: obj.junkVehicleChecked,
      junkVehicleResolved: obj.junkVehicleResolved,
      junkVehicleCheckedmonthsOne: obj.junkVehicleCheckedmonthsOne,
      junkVehicleCheckedmonthsFour: obj.junkVehicleCheckedmonthsFour,
      junkVehicleCheckedmonthsSix: obj.junkVehicleCheckedmonthsSix,
      junkVehicleCheckedfront: obj.junkVehicleCheckedfront,
      junkVehicleCheckedback: obj.junkVehicleCheckedback,
      junkVehicleCheckedside: obj.junkVehicleCheckedside,
      junkVehicleCheckedcomments: obj.junkVehicleCheckedcomments,
      junkChecked: obj.junkChecked,
      junkResolved: obj.junkResolved,
      junkCheckedmonthsOne: obj.junkCheckedmonthsOne,
      junkCheckedmonthsFour: obj.junkCheckedmonthsFour,
      junkCheckedmonthsSix: obj.junkCheckedmonthsSix,
      junkCheckedfront: obj.junkCheckedfront,
      junkCheckedback: obj.junkCheckedback,
      junkCheckedside: obj.junkCheckedside,
      junkCheckedcomments: obj.junkCheckedcomments,
      leakingChecked: obj.leakingChecked,
      leakingResolved: obj.leakingResolved,
      leakingCheckedmonthsOne: obj.leakingCheckedmonthsOne,
      leakingCheckedmonthsFour: obj.leakingCheckedmonthsFour,
      leakingCheckedmonthsSix: obj.leakingCheckedmonthsSix,
      leakingCheckedfront: obj.leakingCheckedfront,
      leakingCheckedback: obj.leakingCheckedback,
      leakingCheckedside: obj.leakingCheckedside,
      leakingCheckedcomments: obj.leakingCheckedcomments,
      waterChecked: obj.waterChecked,
      waterResolved: obj.waterResolved,
      waterCheckedmonthsOne: obj.waterCheckedmonthsOne,
      waterCheckedmonthsFour: obj.waterCheckedmonthsFour,
      waterCheckedmonthsSix: obj.waterCheckedmonthsSix,
      waterCheckedfront: obj.waterCheckedfront,
      waterCheckedback: obj.waterCheckedback,
      waterCheckedside: obj.waterCheckedside,
      waterCheckedcomments: obj.waterCheckedcomments,
      squattersChecked: obj.squattersChecked,
      squattersResolved: obj.squattersResolved,
      squattersCheckedmonthsOne: obj.squattersCheckedmonthsOne,
      squattersCheckedmonthsFour: obj.squattersCheckedmonthsFour,
      squattersCheckedmonthsSix: obj.squattersCheckedmonthsSix,
      squattersCheckedfront: obj.squattersCheckedfront,
      squattersCheckedback: obj.squattersCheckedback,
      squattersCheckedside: obj.squattersCheckedside,
      squattersCheckedcomments: obj.squattersCheckedcomments,
      boardedChecked: obj.boardedChecked,
      boardedResolved: obj.boardedResolved,
      boardedCheckedmonthsOne: obj.boardedCheckedmonthsOne,
      boardedCheckedmonthsFour: obj.boardedCheckedmonthsFour,
      boardedCheckedmonthsSix: obj.boardedCheckedmonthsSix,
      boardedCheckedfront: obj.boardedCheckedfront,
      boardedCheckedback: obj.boardedCheckedback,
      boardedCheckedside: obj.boardedCheckedside,
      boardedCheckedcomments: obj.boardedCheckedcomments,
      rodentChecked: obj.rodentChecked,
      rodentResolved: obj.rodentResolved,
      rodentCheckedmonthsOne: obj.rodentCheckedmonthsOne,
      rodentCheckedmonthsFour: obj.rodentCheckedmonthsFour,
      rodentCheckedmonthsSix: obj.rodentCheckedmonthsSix,
      rodentCheckedfront: obj.rodentCheckedfront,
      rodentCheckedback: obj.rodentCheckedback,
      rodentCheckedside: obj.rodentCheckedside,
      rodentCheckedcomments: obj.rodentCheckedcomments,
      floodedChecked: obj.floodedChecked,
      floodedResolved: obj.floodedResolved,
      floodedCheckedmonthsOne: obj.floodedCheckedmonthsOne,
      floodedCheckedmonthsFour: obj.floodedCheckedmonthsFour,
      floodedCheckedmonthsSix: obj.floodedCheckedmonthsSix,
      floodedCheckedfront: obj.floodedCheckedfront,
      floodedCheckedback: obj.floodedCheckedback,
      floodedCheckedside: obj.floodedCheckedside,
      floodedCheckedcomments: obj.floodedCheckedcomments,
      otherChecked: obj.otherChecked,
      otherResolved: obj.otherResolved,
      otherCheckedmonthsOne: obj.otherCheckedmonthsOne,
      otherCheckedmonthsFour: obj.otherCheckedmonthsFour,
      otherCheckedmonthsSix: obj.otherCheckedmonthsSix,
      otherCheckedfront: obj.otherCheckedfront,
      otherCheckedback: obj.otherCheckedback,
      otherCheckedside: obj.otherCheckedside,
      otherCheckedcomments: obj.otherCheckedcomments,
      currImg: obj.url
    },function(){
      this.resetDropdown();
    });
    console.log(this.state.images[obj.id]);
  }

  resolvedCallback(event){
    var id  = this.state.currId;
    this.setState({ [event.target.id] : !this.state[event.target.id] });
    this.state.images[id][event.target.id] = !this.state.images[id][event.target.id];
  }

  commentCallback(event){
    var id  = this.state.currId;
    this.setState({ [event.target.id] : event.target.value});
    this.state.images[id][event.target.id] = event.target.value;
  }

  updateViolations(v, c){
    var id  = this.state.currId;
    this.setState({ [c]: !this.state[c] });
    this.state.images[id][c] = !this.state.images[id][c];
    var result = this.state.images[id].violations.find((n) => {
     return n === v;
    });
    if(result == null){
      this.state.images[id].violations.push(v);
      this.state.images[id][c] = true;
    }
    else{
      var index = this.state.images[id].violations.indexOf(v);
      this.state.images[id][c] = false;
      this.state.images[id].violations.splice(index, 1);
    }
  }
  saveViolations(){
    for(var i=0; i< Object.keys(this.state.images).length; i++){
      var postData = {houseData: {}, violationData: {}, url: "", concatAddress: ""};
      let newViolations = this.reconstructViolations(this.state.images[i]);
      postData.houseData = this.state.images[i].houseData;
      postData.url = this.state.images[i].url;
      postData.concatAddress = this.state.images[i].houseData.streetNumber+" "+this.state.images[i].houseData.streetName;
      postData.concatAddress = postData.concatAddress.replace(/ /g,"_");
      Object.keys(newViolations[0]).forEach(function(key, idx) {
        if(Object.keys(newViolations[0][key]).length){
          fetch('/addViolations', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              concatAddress: postData.concatAddress,
              url: postData.url,
              houseData: postData.houseData,
              violationData: newViolations[0][key]
            })
          }).then(function(res){
                console.log(res);
              }
          );
        }
      });
    }
  }

  reconstructViolations(img){
    var newViolations = [];
    var obj = {open: {}, overgrowth: {}, squatters: {}, leaking: {}, water: {}, boarded: {}, rodent: {}, flooded: {}, trash: {}, junkVehicle: {}, other: {}};
    var v = img.violations;
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
        if(img.openResolved) obj.open.isResolved = true;
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
        if(img.overgrowthResolved) obj.overgrowth.isResolved = true;
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
        if(img.squattersResolved) obj.squatters.isResolved = true;
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
        if(img.leakingResolved) obj.leaking.isResolved = true;
      }
      if(v[i].includes("No Power/Water")) {
        obj.water.name = "No Power/Water";
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
        if(img.waterResolved) obj.water.isResolved = true;
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
        if(img.boardedResolved) obj.boarded.isResolved = true;
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
        if(img.rodentResolved) obj.rodent.isResolved = true;
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
        if(img.floodedResolved) obj.flooded.isResolved = true;
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
        if(img.junkResolved) obj.trash.isResolved = true;
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
        if(img.junkVehicleResolved) obj.junkVehicle.isResolved = true;
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
        if(img.otherResolved) obj.other.isResolved = true;
      }
    }
    if(img.openCheckedcomments.length) obj.open.comments = img.openCheckedcomments;
    if(img.overgrowthCheckedcomments.length) obj.overgrowth.comments = img.overgrowthCheckedcomments;
    if(img.squattersCheckedcomments.length) obj.squatters.comments = img.squattersCheckedcomments;
    if(img.leakingCheckedcomments.length) obj.leaking.comments = img.leakingCheckedcomments;
    if(img.waterCheckedcomments.length) obj.water.comments = img.waterCheckedcomments;
    if(img.boardedCheckedcomments.length) obj.boarded.comments = img.boardedCheckedcomments;
    if(img.rodentCheckedcomments.length) obj.rodent.comments = img.rodentCheckedcomments;
    if(img.floodedCheckedcomments.length) obj.flooded.comments = img.floodedCheckedcomments;
    if(img.junkCheckedcomments.length) obj.trash.comments = img.junkCheckedcomments;
    if(img.junkVehicleCheckedcomments.length) obj.junkVehicle.comments = img.junkVehicleCheckedcomments;
    if(img.otherCheckedcomments.length) obj.other.comments = img.otherCheckedcomments;

    newViolations.push(obj);
    return newViolations;
  }

  onChange = (e) => {
    this.setState({
      files: e.target.files
    });
  }

  handleMyFormSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("userPhoto", this.state.files);

    axios.post('/upload', formData)
    .then(response => {
      console.log(response.data.files);
    })
    .catch(error => {
      //console.log(error.response);
    });

  }
  onSubmit = (e) =>{
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
          console.log(response.data.files);
          //var temp = this.state.images[this.state.currId].url;
          var newUrl = "/uploads/"+response.data.files[0];
          console.log(this.state.images[this.state.currId].url);
          var temp = this.state.images;
          temp[this.state.currId].url = newUrl;
          this.setState({ images : temp, currImg: newUrl});
          console.log(this.state.images[this.state.currId].url);
          //this.createNewImages(response.data.files);
          //this.state.handler(response.data.files);
        })
        .catch(error => {
          console.log(error.response);
        });
    //this.uploadNow(formData);
  };
  uploadNow(data){
    fetch('/upload',{
      method: 'post',
      body: data
    }).then(response => {
      console.log(response.body);
    })
    .then(data => {
      console.log(data)
    })
  }

  render() {
    const today = new Date();
    if (this.state.test !== undefined) {
      return (
          <div className="App">
            <div className="section">
              <div className="container">
                <div className="row">
                  <div className="col s12 l2">
                    <h5><b>1. Select A Photo</b></h5>
                  </div>
                  <div className="col s12 l8">
                    <h5><b>2. Add Violation(s)</b></h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 l2 viewImg-col">
                    <div className="row">
                      <div className="col s12">
                        <div className="row">
                          { Object.keys(this.state.images).map((element, i) =>
                          <div className="col s12 img-col" key={element}>
                              <a href="javascript:void(0)" onClick={() => this.selectImage(this.state.images[element])}>
                                <div className="card">
                                  <div className="card-image">
                                    <img src={this.state.images[element].url} width="20%"/>
                                  </div>
                                </div>
                              </a>
                              <a className="trash" onClick={() => this.deleteImage(this.state.images[element])} href="javascript:void(0)"><i className="material-icons left white red-text">delete</i></a>
                          </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col s12">
                            <a className="btn btn-large green darken-1 is-w100" onClick={() => this.addNewEntry()}>Add Entry</a>
                          </div>
                          <div className="col s12">
                            <h5 className="center-align">
                              or
                            </h5>
                          </div>
                          <div className="col s12">
                          <form onSubmit={this.onSubmit}>
                            <input
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
                          <div>
                            <p className='hint center-align'>Supported files: jpg, jpeg, png.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.currId != null ? (
                  <div className="col s12 l10 border-left-light">
                    <div className="row image">

                      <div className="col s12 m8">
                        <ReactMaterialSelect ref="localSelect" label="Select An Address" resetLabel="None" defaultValue="None" onChange={this.localSelectCallback.bind(this)}>
                          {this.state.test.map((element) =>
                              <option dataValue={JSON.stringify(element)} key={element}>{element.streetNumber} {element.streetName}</option>
                          )}
                        </ReactMaterialSelect>
                        <p></p>
                        <img src={this.state.currImg} width="50%"/>
                        <form onSubmit={this.onSubmit}>
                          <input
                              type="file"
                              name="userPhoto"
                              onChange={this.onChange}
                              accept='image/*'
                              multiple
                              id="child"
                          />
                          <button className="btn green darken-1" type="submit">Upload Photo</button>
                        </form>
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
                      <div className="col s12 m2">
                        <p className="colHeader">Select Code Violation(s)</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-struct" checked={this.state.openChecked}
                                 onChange={() => this.updateViolations("Open/Vacant", "openChecked")}/>
                          <label htmlFor="open-struct">Open/Vacan t</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth" checked={this.state.overgrowthChecked}
                                 onChange={() => this.updateViolations("Overgrown", "overgrowthChecked")}/>
                          <label htmlFor="overgrowth">Overgrown</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters" checked={this.state.squattersChecked}
                                 onChange={() => this.updateViolations("Housing Squatters", "squattersChecked")}/>
                          <label htmlFor="squatters">Housing Squatters</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking" checked={this.state.leakingChecked}
                                 onChange={() => this.updateViolations("Damaged/Leaking", "leakingChecked")}/>
                          <label htmlFor="leaking">Damaged/Leaking</label>
                        </p>
                        <p>
                          <input type="checkbox" id="no-water" checked={this.state.waterChecked}
                                 onChange={() => this.updateViolations("No Power/Water", "waterChecked")}/>
                          <label htmlFor="no-water">No Power/Water</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded" checked={this.state.boardedChecked}
                                 onChange={() => this.updateViolations("Boarded Up", "boardedChecked")}/>
                          <label htmlFor="boarded">Boarded Up</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent" checked={this.state.rodentChecked}
                                 onChange={() => this.updateViolations("Rodent Infested", "rodentChecked")}/>
                          <label htmlFor="rodent">Rodent Infested</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded" checked={this.state.floodedChecked}
                                 onChange={() => this.updateViolations("Flooded", "floodedChecked")}/>
                          <label htmlFor="flooded">Flooded</label>
                        </p>
                        <p>
                          <input type="checkbox" id="trash" checked={this.state.junkChecked}
                                 onChange={() => this.updateViolations("Excessive Trash", "junkChecked")}/>
                          <label htmlFor="trash">Excessive Trash</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-vehicle" checked={this.state.junkVehicleChecked}
                                 onChange={() => this.updateViolations("Junk Vehicle", "junkVehicleChecked")}/>
                          <label htmlFor="junk-vehicle">Junk Vehicle/Tires</label>
                        </p>

                        <p>
                          <input type="checkbox" id="other" checked={this.state.otherChecked}
                                 onChange={() => this.updateViolations("Other", "otherChecked")}/>
                          <label htmlFor="other">Other</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className="colHeader"># Months</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-months-one" checked={this.state.openCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Open/Vacant 1-3", "openCheckedmonthsOne")}/>
                          <label htmlFor="open-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="open-months-four" checked={this.state.openCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Open/Vacant 4-6", "openCheckedmonthsFour")}/>
                          <label htmlFor="open-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="open-months-six" checked={this.state.openCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Open/Vacant 6+", "openCheckedmonthsSix")}/>
                          <label htmlFor="open-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-months-one" checked={this.state.overgrowthCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Overgrown 1-3", "overgrowthCheckedmonthsOne")}/>
                          <label htmlFor="overgrowth-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="overgrowth-months-four" checked={this.state.overgrowthCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Overgrown 4-6", "overgrowthCheckedmonthsFour")}/>
                          <label htmlFor="overgrowth-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="overgrowth-months-six" checked={this.state.overgrowthCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Overgrown 6+", "overgrowthCheckedmonthsSix")}/>
                          <label htmlFor="overgrowth-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-months-one" checked={this.state.squattersCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Housing Squatters 1-3", "squattersCheckedmonthsOne")}/>
                          <label htmlFor="squatters-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="squatters-months-four" checked={this.state.squattersCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Housing Squatters 4-6", "squattersCheckedmonthsFour")}/>
                          <label htmlFor="squatters-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="squatters-months-six" checked={this.state.squattersCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Housing Squatters 6+", "squattersCheckedmonthsSix")}/>
                          <label htmlFor="squatters-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-months-one" checked={this.state.leakingCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Damaged/Leaking 1-3", "leakingCheckedmonthsOne")}/>
                          <label htmlFor="leaking-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="leaking-months-four" checked={this.state.leakingCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Damaged/Leaking 4-6", "leakingCheckedmonthsFour")}/>
                          <label htmlFor="leaking-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="leaking-months-six" checked={this.state.leakingCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Damaged/Leaking 6+", "leakingCheckedmonthsSix")}/>
                          <label htmlFor="leaking-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-months-one" checked={this.state.waterCheckedmonthsOne}
                                 onChange={() => this.updateViolations("No Power/Water 1-3", "waterCheckedmonthsOne")}/>
                          <label htmlFor="water-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="water-months-four" checked={this.state.waterCheckedmonthsFour}
                                 onChange={() => this.updateViolations("No Power/Water 4-6", "waterCheckedmonthsFour")}/>
                          <label htmlFor="water-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="water-months-six" checked={this.state.waterCheckedmonthsSix}
                                 onChange={() => this.updateViolations("No Power/Water 6+", "waterCheckedmonthsSix")}/>
                          <label htmlFor="water-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-months-one" checked={this.state.boardedCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Boarded Up 1-3", "boardedCheckedmonthsOne")}/>
                          <label htmlFor="boarded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="boarded-months-four" checked={this.state.boardedCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Boarded Up 4-6", "boardedCheckedmonthsFour")}/>
                          <label htmlFor="boarded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="boarded-months-six" checked={this.state.boardedCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Boarded Up 6+", "boardedCheckedmonthsSix")}/>
                          <label htmlFor="boarded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-months-one" checked={this.state.rodentCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Rodent Infested 1-3", "rodentCheckedmonthsOne")}/>
                          <label htmlFor="rodent-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="rodent-months-four" checked={this.state.rodentCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Rodent Infested 4-6", "rodentCheckedmonthsFour")}/>
                          <label htmlFor="rodent-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="rodent-months-six" checked={this.state.rodentCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Rodent Infested 6+", "rodentCheckedmonthsSix")}/>
                          <label htmlFor="rodent-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-months-one" checked={this.state.floodedCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Flooded 1-3", "floodedCheckedmonthsOne")}/>
                          <label htmlFor="flooded-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="flooded-months-four" checked={this.state.floodedCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Flooded 4-6", "floodedCheckedmonthsFour")}/>
                          <label htmlFor="flooded-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="flooded-months-six" checked={this.state.floodedCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Flooded 6+", "floodedCheckedmonthsSix")}/>
                          <label htmlFor="flooded-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-months-one" checked={this.state.junkCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Excessive Trash 1-3", "junkCheckedmonthsOne")}/>
                          <label htmlFor="junk-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="junk-months-four" checked={this.state.junkCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Excessive Trash 4-6", "junkCheckedmonthsFour")}/>
                          <label htmlFor="junk-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junk-months-six" checked={this.state.junkCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Excessive Trash 6+", "junkCheckedmonthsSix")}/>
                          <label htmlFor="junk-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-months-one" checked={this.state.junkVehicleCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Junk Vehicle 1-3", "junkVehicleCheckedmonthsOne")}/>
                          <label htmlFor="junkVehicle-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="junkVehicle-months-four" checked={this.state.junkVehicleCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Junk Vehicle 4-6", "junkVehicleCheckedmonthsFour")}/>
                          <label htmlFor="junkVehicle-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="junkVehicle-months-six" checked={this.state.junkVehicleCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Junk Vehicle 6+", "junkVehicleCheckedmonthsSix")}/>
                          <label htmlFor="junkVehicle-months-six" className="monthsLabel">6+</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-months-one" checked={this.state.otherCheckedmonthsOne}
                                 onChange={() => this.updateViolations("Other 1-3", "otherCheckedmonthsOne")}/>
                          <label htmlFor="other-months-one" className="monthsLabel">1-3</label>
                          <input type="checkbox" id="other-months-four" checked={this.state.otherCheckedmonthsFour}
                                 onChange={() => this.updateViolations("Other 4-6", "otherCheckedmonthsFour")}/>
                          <label htmlFor="other-months-four" className="monthsLabel">4-6</label>
                          <input type="checkbox" id="other-months-six" checked={this.state.otherCheckedmonthsSix}
                                 onChange={() => this.updateViolations("Other 6+", "otherCheckedmonthsSix")}/>
                          <label htmlFor="other-months-six" className="monthsLabel">6+</label>
                        </p>
                        </form>
                      </div>
                      <div className="col s12 m3">
                        <p className="colHeader">Location On Property</p>
                        <form action="#">
                        <p>
                          <input type="checkbox" id="open-front" checked={this.state.openCheckedfront}
                                 onChange={() => this.updateViolations("Open/Vacant front", "openCheckedfront")}/>
                          <label htmlFor="open-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="open-back" checked={this.state.openCheckedback}
                                 onChange={() => this.updateViolations("Open/Vacant back", "openCheckedback")}/>
                          <label htmlFor="open-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="open-side" checked={this.state.openCheckedside}
                                 onChange={() => this.updateViolations("Open/Vacant side", "openCheckedside")}/>
                          <label htmlFor="open-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="overgrowth-front" checked={this.state.overgrowthCheckedfront}
                                 onChange={() => this.updateViolations("Overgrown front", "overgrowthCheckedfront")}/>
                          <label htmlFor="overgrowth-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="overgrowth-back" checked={this.state.overgrowthCheckedback}
                                 onChange={() => this.updateViolations("Overgrown back", "overgrowthCheckedback")}/>
                          <label htmlFor="overgrowth-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="overgrowth-side" checked={this.state.overgrowthCheckedside}
                                 onChange={() => this.updateViolations("Overgrown side", "overgrowthCheckedside")}/>
                          <label htmlFor="overgrowth-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="squatters-front" checked={this.state.squattersCheckedfront}
                                 onChange={() => this.updateViolations("Housing Squatters front", "squattersCheckedfront")}/>
                          <label htmlFor="squatters-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="squatters-back" checked={this.state.squattersCheckedback}
                                 onChange={() => this.updateViolations("Housing Squatters back", "squattersCheckedback")}/>
                          <label htmlFor="squatters-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="squatters-side" checked={this.state.squattersCheckedside}
                                 onChange={() => this.updateViolations("Housing Squatters side", "squattersCheckedside")}/>
                          <label htmlFor="squatters-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="leaking-front" checked={this.state.leakingCheckedfront}
                                 onChange={() => this.updateViolations("Damaged/Leaking front", "leakingCheckedfront")}/>
                          <label htmlFor="leaking-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="leaking-back" checked={this.state.leakingCheckedback}
                                 onChange={() => this.updateViolations("Damaged/Leaking back", "leakingCheckedback")}/>
                          <label htmlFor="leaking-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="leaking-side" checked={this.state.leakingCheckedside}
                                 onChange={() => this.updateViolations("Damaged/Leaking side", "leakingCheckedside")}/>
                          <label htmlFor="leaking-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="water-front" checked={this.state.waterCheckedfront}
                                 onChange={() => this.updateViolations("No Power/Water front", "waterCheckedfront")}/>
                          <label htmlFor="water-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="water-back" checked={this.state.waterCheckedback}
                                 onChange={() => this.updateViolations("No Power/Water back", "waterCheckedback")}/>
                          <label htmlFor="water-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="water-side" checked={this.state.waterCheckedside}
                                 onChange={() => this.updateViolations("No Power/Water side", "waterCheckedside")}/>
                          <label htmlFor="water-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="boarded-front" checked={this.state.boardedCheckedfront}
                                 onChange={() => this.updateViolations("Boarded Up front", "boardedCheckedfront")}/>
                          <label htmlFor="boarded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="boarded-back" checked={this.state.boardedCheckedback}
                                 onChange={() => this.updateViolations("Boarded Up back", "boardedCheckedback")}/>
                          <label htmlFor="boarded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="boarded-side" checked={this.state.boardedCheckedside}
                                 onChange={() => this.updateViolations("Boarded Up side", "boardedCheckedside")}/>
                          <label htmlFor="boarded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="rodent-front" checked={this.state.rodentCheckedfront}
                                 onChange={() => this.updateViolations("Rodent Infested front", "rodentCheckedfront")}/>
                          <label htmlFor="rodent-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="rodent-back" checked={this.state.rodentCheckedback}
                                 onChange={() => this.updateViolations("Rodent Infested back", "rodentCheckedback")}/>
                          <label htmlFor="rodent-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="rodent-side" checked={this.state.rodentCheckedside}
                                 onChange={() => this.updateViolations("Rodent Infested side", "rodentCheckedside")}/>
                          <label htmlFor="rodent-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="flooded-front" checked={this.state.floodedCheckedfront}
                                 onChange={() => this.updateViolations("Flooded front", "floodedCheckedfront")}/>
                          <label htmlFor="flooded-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="flooded-back" checked={this.state.floodedCheckedback}
                                 onChange={() => this.updateViolations("Flooded back", "floodedCheckedback")}/>
                          <label htmlFor="flooded-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="flooded-side" checked={this.state.floodedCheckedside}
                                 onChange={() => this.updateViolations("Flooded side", "floodedCheckedside")}/>
                          <label htmlFor="flooded-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junk-front" checked={this.state.junkCheckedfront}
                                 onChange={() => this.updateViolations("Excessive Trash front", "junkCheckedfront")}/>
                          <label htmlFor="junk-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junk-back" checked={this.state.junkCheckedback}
                                 onChange={() => this.updateViolations("Excessive Trash back", "junkCheckedback")}/>
                          <label htmlFor="junk-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="junk-side" checked={this.state.junkCheckedside}
                                 onChange={() => this.updateViolations("Excessive Trash side", "junkCheckedside")}/>
                          <label htmlFor="junk-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="junkVehicle-front" checked={this.state.junkVehicleCheckedfront}
                                 onChange={() => this.updateViolations("Junk Vehicle front", "junkVehicleCheckedfront")}/>
                          <label htmlFor="junkVehicle-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="junkVehicle-back" checked={this.state.junkVehicleCheckedback}
                                 onChange={() => this.updateViolations("Junk Vehicle back", "junkVehicleCheckedback")}/>
                          <label htmlFor="junkVehicle-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="junkVehicle-side" checked={this.state.junkVehicleCheckedside}
                                 onChange={() => this.updateViolations("Junk Vehicle side", "junkVehicleCheckedside")}/>
                          <label htmlFor="junkVehicle-side" className="monthsLabel">Side</label>
                        </p>
                        <p>
                          <input type="checkbox" id="other-front" checked={this.state.otherCheckedfront}
                                 onChange={() => this.updateViolations("Other front", "otherCheckedfront")}/>
                          <label htmlFor="other-front" className="monthsLabel">Front</label>
                          <input type="checkbox" id="other-back" checked={this.state.otherCheckedback}
                                 onChange={() => this.updateViolations("Other back", "otherCheckedback")}/>
                          <label htmlFor="other-back" className="monthsLabel">Back</label>
                          <input type="checkbox" id="other-side" checked={this.state.otherCheckedside}
                                 onChange={() => this.updateViolations("Other side", "otherCheckedside")}/>
                          <label htmlFor="other-side" className="monthsLabel">Side</label>
                        </p>
                          </form>
                      </div>
                      <div className="col s12 m2">
                        <p className="colHeader">Comments</p>
                        <form action="#">
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="openCheckedcomments" type="text" className="Open/Vacant" onChange={this.commentCallback.bind(this)} value={this.state.openCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="overgrowthCheckedcomments" type="text" className="Overgrown" onChange={this.commentCallback.bind(this)} value={this.state.overgrowthCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="squattersCheckedcomments" type="text" className="Housing Squatters" onChange={this.commentCallback.bind(this)} value={this.state.squattersCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="leakingCheckedcomments" type="text" className="Damaged/Leaking" onChange={this.commentCallback.bind(this)} value={this.state.leakingCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="waterCheckedcomments" type="text" className="NoPower/Water" onChange={this.commentCallback.bind(this)} value={this.state.waterCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="boardedCheckedcomments" type="text" className="Boarded Up" onChange={this.commentCallback.bind(this)} value={this.state.boardedCheckedcomments} />
                          </div>
                        </div>
                          <div className="row comment">
                            <div className="input-field col s12">
                              <input placeholder="Comments" id="rodentCheckedcomments" type="text" className="Rodent Infested" onChange={this.commentCallback.bind(this)} value={this.state.rodentCheckedcomments} />
                            </div>
                          </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="floodedCheckedcomments" type="text" className="Flooded" onChange={this.commentCallback.bind(this)} value={this.state.floodedCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="junkCheckedcomments" type="text" className="Excessive Trash" onChange={this.commentCallback.bind(this)} value={this.state.junkCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="junkVehicleCheckedcomments" type="text" className="Junk Vehicle" onChange={this.commentCallback.bind(this)} value={this.state.junkVehicleCheckedcomments} />
                          </div>
                        </div>
                        <div className="row comment">
                          <div className="input-field col s12">
                            <input placeholder="Comments" id="otherCheckedcomments" type="text" className="Other" onChange={this.commentCallback.bind(this)} value={this.state.otherCheckedcomments} />
                          </div>
                        </div>
                          </form>
                      </div>
                      <div className="col s12 m2 resCol">
                        <p className="colHeader">Is Resolved?</p>
                        <form action="#">
                          <p>
                            <input type="checkbox" id="openResolved" checked={this.state.openResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="openResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="overgrowthResolved" checked={this.state.overgrowthResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="overgrowthResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="squattersResolved" checked={this.state.squattersResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="squattersResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="leakingResolved" checked={this.state.leakingResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="leakingResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="waterResolved" checked={this.state.waterResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="waterResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="boardedResolved" checked={this.state.boardedResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="boardedResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="rodentResolved" checked={this.state.rodentResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="rodentResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="floodedResolved" checked={this.state.floodedResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="floodedResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junkResolved" checked={this.state.junkResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="junkResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="junkVehicleResolved" checked={this.state.junkVehicleResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="junkVehicleResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                          <p>
                            <input type="checkbox" id="otherResolved" checked={this.state.otherResolved}
                                   onChange={this.resolvedCallback.bind(this)}/>
                            <label htmlFor="otherResolved" className="monthsLabel">&nbsp;</label>
                          </p>
                        </form>
                      </div>
                      {/*<div className="col s12 formCol">
                        <br></br>
                        <a className="btn" onClick={() => this.saveViolations()}>Save All House Data</a>
                      </div>*/}
                    </div>
                  </div>
                  ) :
                        <div className="col s12 l8 null">
                          <h3 className="grey-text lighten-2 null-state">Choose An Image, Assign An Address, Add Violations</h3>
                        </div>
                  }
                  <div className="col s12 formCol align-right">
                    <br></br>
                    <p>After you have set the appropriate data for each image, hit the save button below.</p>
                    <a className="btn btn-large blue darken-1" onClick={() => this.saveViolations()}>Save All House Data</a>
                  </div>
                </div>
              </div>
            </div>
            )}
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
