/**
 * Created by Brendan on 4/9/2018.
 */
import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class Form2 extends Component {
    constructor(props) {
        super(props);
        this.localSelectCallback = this.localSelectCallback.bind(this);
        this.commentCallback = this.commentCallback.bind(this);
        this.resolvedCallback = this.resolvedCallback.bind(this);
        this.textFieldCallback = this.textFieldCallback.bind(this);
        this.checkboxCallback = this.checkboxCallback.bind(this);
    }
    state = {
        images: [],
        files: [],
        test: undefined,
        currId: null,
        houseData: {},
        violations: [],
        singleDwelling: false,
        multiDwelling: false,
        isApt: false,
        isCommercial: false,
        owner: '',
        livesThere: false,
        notLivesThere: false,
        openChecked: false,
        openCheckedmonthsOne: false,
        openCheckedmonthsFour: false,
        openCheckedmonthsSix: false,
        openCheckedfront: false,
        openCheckedback: false,
        openCheckedside: false,
        openCheckedcomments: '',
        overgrowthChecked: false,
        overgrowthCheckedmonthsOne: false,
        overgrowthCheckedmonthsFour: false,
        overgrowthCheckedmonthsSix: false,
        overgrowthCheckedfront: false,
        overgrowthCheckedback: false,
        overgrowthCheckedside: false,
        overgrowthCheckedcomments: '',
        junkVehicleChecked: false,
        junkVehicleCheckedmonthsOne: false,
        junkVehicleCheckedmonthsFour: false,
        junkVehicleCheckedmonthsSix: false,
        junkVehicleCheckedfront: false,
        junkVehicleCheckedback: false,
        junkVehicleCheckedside: false,
        junkVehicleCheckedcomments: '',
        junkChecked: false,
        junkCheckedmonthsOne: false,
        junkCheckedmonthsFour: false,
        junkCheckedmonthsSix: false,
        junkCheckedfront: false,
        junkCheckedback: false,
        junkCheckedside: false,
        junkCheckedcomments: '',
        leakingChecked: false,
        leakingCheckedmonthsOne: false,
        leakingCheckedmonthsFour: false,
        leakingCheckedmonthsSix: false,
        leakingCheckedfront: false,
        leakingCheckedback: false,
        leakingCheckedside: false,
        leakingCheckedcomments: '',
        waterChecked: false,
        waterCheckedmonthsOne: false,
        waterCheckedmonthsFour: false,
        waterCheckedmonthsSix: false,
        waterCheckedfront: false,
        waterCheckedback: false,
        waterCheckedside: false,
        waterCheckedcomments: '',
        squattersChecked: false,
        squattersCheckedmonthsOne: false,
        squattersCheckedmonthsFour: false,
        squattersCheckedmonthsSix: false,
        squattersCheckedfront: false,
        squattersCheckedback: false,
        squattersCheckedside: false,
        squattersCheckedcomments: '',
        boardedChecked: false,
        boardedCheckedmonthsOne: false,
        boardedCheckedmonthsFour: false,
        boardedCheckedmonthsSix: false,
        boardedCheckedfront: false,
        boardedCheckedback: false,
        boardedCheckedside: false,
        boardedCheckedcomments: '',
        rodentChecked: false,
        rodentCheckedmonthsOne: false,
        rodentCheckedmonthsFour: false,
        rodentCheckedmonthsSix: false,
        rodentCheckedfront: false,
        rodentCheckedback: false,
        rodentCheckedside: false,
        rodentCheckedcomments: '',
        floodedChecked: false,
        floodedCheckedmonthsOne: false,
        floodedCheckedmonthsFour: false,
        floodedCheckedmonthsSix: false,
        floodedCheckedfront: false,
        floodedCheckedback: false,
        floodedCheckedside: false,
        floodedCheckedcomments: '',
        otherChecked: false,
        otherCheckedmonthsOne: false,
        otherCheckedmonthsFour: false,
        otherCheckedmonthsSix: false,
        otherCheckedfront: false,
        otherCheckedback: false,
        otherCheckedside: false,
        otherCheckedcomments: ''
    };

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

    localSelectCallback(selected){
        /*
         * Handles the Address Selector drop-down
         * Populates state.houseData with address data
         * */
        try{
            this.setState({houseData : JSON.parse(selected.value)});
            console.log("House Data");
            console.log(this.state.houseData);
        }catch(e){}
    }

    resetDropdown(){
        /*
         * Resets Address dropdown (might be deprecated)
         * */
        if(this.refs.localSelect != null){
            this.refs.localSelect.handleSetSelect("Select An Address", "None");
        }
    }

    deleteImage(img){
        var tempData = this.state.images;
        fetch('/deleteImg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: img
            })
        }).then(function(res){});
        var index = tempData.indexOf(img);
        if (index !== -1) tempData.splice(index, 1);
        this.setState({images: tempData});
    }

    resolvedCallback(event){
        /*
        * Handles each 'Is Resolved?' checkbox
        * Flips the checked state and actual bool state value
        * */
        this.setState({ [event.target.id] : !this.state[event.target.id] });
        this.state[event.target.id] = !this.state[event.target.id];
    }

    commentCallback(event){
        /*
         * Handles each Comment field as user types
         * I use the html id as the state object value (probably a better way)
         * */
        this.setState({ [event.target.id] : event.target.value});
        this.state[event.target.id] = event.target.value;
    }

    textFieldCallback(event){
        /*
         * Handles each text input field as user types
         * I use the html id as the state object value (probably a better way)
         * */
        this.setState({ [event.target.id] : event.target.value});
    }

    checkboxCallback(event){
        /* Handles each checkbox */
        this.setState({ [event.target.id] : !this.state[event.target.id]});
    }

    updateViolations(v, c){
        /*
        * Adds a new violation when user checks an assc. checkbox
        * Will also remove violation when box is unchecked
        * @param v - violation plain text string (i.e. "Open/Vacant")
        * @param c - violation checkbox value (i.e. "openChecked")
        * */
        this.setState({ [c]: !this.state[c] });
        // this.state.images[id][c] = !this.state.images[id][c];
        var result = this.state.violations.find((n) => {
            return n === v;
        });
        if(result == null){
            this.state.violations.push(v);
            this.state[c] = true;
        }
        else{
            var index = this.state.violations.indexOf(v);
            this.state.images[c] = false;
            this.state.violations.splice(index, 1);
        }
    }

    saveViolations(){
        /*
        * TODO: Finish this when I get the form set up
        * */
        var postData = {houseData: {}, violationData: {}, url: "", concatAddress: ""};
        postData.houseData = this.state.houseData;
        postData.concatAddress = this.state.houseData.streetNumber+" "+this.state.houseData.streetName;
        postData.concatAddress = postData.concatAddress.replace(/ /g,"_");
        let newViolations = this.reconstructViolations();
        let propertyData = this.constructPropertyInfo();
        var images = this.state.images;
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
                        images: images,
                        propertyData: propertyData,
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

    reconstructViolations(){
        var newViolations = [];
        var obj = {open: {}, overgrowth: {}, squatters: {}, leaking: {}, water: {}, boarded: {}, rodent: {}, flooded: {}, trash: {}, junkVehicle: {}, other: {}};
        var v = this.state.violations;
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
                if(this.state.openResolved) obj.open.isResolved = true;
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
                if(this.state.overgrowthResolved) obj.overgrowth.isResolved = true;
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
                if(this.state.squattersResolved) obj.squatters.isResolved = true;
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
                if(this.state.leakingResolved) obj.leaking.isResolved = true;
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
                if(this.state.waterResolved) obj.water.isResolved = true;
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
                if(this.state.boardedResolved) obj.boarded.isResolved = true;
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
                if(this.state.rodentResolved) obj.rodent.isResolved = true;
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
                if(this.state.floodedResolved) obj.flooded.isResolved = true;
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
                if(this.state.junkResolved) obj.trash.isResolved = true;
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
                if(this.state.junkVehicleResolved) obj.junkVehicle.isResolved = true;
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
                if(this.state.otherResolved) obj.other.isResolved = true;
            }
        }
        if(this.state.openCheckedcomments.length) obj.open.comments = this.state.openCheckedcomments;
        if(this.state.overgrowthCheckedcomments.length) obj.overgrowth.comments = this.state.overgrowthCheckedcomments;
        if(this.state.squattersCheckedcomments.length) obj.squatters.comments = this.state.squattersCheckedcomments;
        if(this.state.leakingCheckedcomments.length) obj.leaking.comments = this.state.leakingCheckedcomments;
        if(this.state.waterCheckedcomments.length) obj.water.comments = this.state.waterCheckedcomments;
        if(this.state.boardedCheckedcomments.length) obj.boarded.comments = this.state.boardedCheckedcomments;
        if(this.state.rodentCheckedcomments.length) obj.rodent.comments = this.state.rodentCheckedcomments;
        if(this.state.floodedCheckedcomments.length) obj.flooded.comments = this.state.floodedCheckedcomments;
        if(this.state.junkCheckedcomments.length) obj.trash.comments = this.state.junkCheckedcomments;
        if(this.state.junkVehicleCheckedcomments.length) obj.junkVehicle.comments = this.state.junkVehicleCheckedcomments;
        if(this.state.otherCheckedcomments.length) obj.other.comments = this.state.otherCheckedcomments;

        newViolations.push(obj);
        return newViolations;
    }

    constructPropertyInfo(){
        var obj = {};
        if(this.state.singleDwelling) obj.singleDwelling = true;
        if(this.state.multiDwelling) obj.multiDwelling = true;
        if(this.state.isApt) obj.isApt = true;
        if(this.state.isCommercial) obj.isCommercial = true;
        if(this.state.livesThere) obj.livesThere = true;
        if(this.state.notLivesThere) obj.notLivesThere = true;
        if(this.state.owner.length) obj.owner = this.state.owner;
        return obj;
    }

    onChange = (e) => {
        this.setState({
            files: e.target.files
        });
    }

    onSubmitt = (e) =>{

        let formData = new FormData();
        //let testFormData = new FormData(e.target);
        let inputElement = document.querySelector('#child');
        console.log(inputElement);
        for (let index = 0; index < inputElement.files.length; index++) {
            formData.append('userPhoto', inputElement.files[index], 'chris2.jpg'); // APPEND WORKS?!
        }
        axios.post('/upload', formData)
            .then(response => {
                console.log(response.data.files);
                var temp = this.state.images;
                for(var i=0; i < response.data.files.length; i++){
                    var newUrl = "/uploads/"+response.data.files[i];
                    temp.push(newUrl);
                }
                this.setState({ images : temp });
            })
            .catch(error => {
                console.log(error.response);
        });
        this.setState({ files: []});
        e.preventDefault();
    };

    render(){
        const styles = {
            button: {
                margin: 12
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0
            }
        };
        if(this.state.test !== undefined){
            return(
                <div className="section no-pad">
                    <div className="container">
                        <div className="row no-margin-bottom">
                            <div className="col s12">
                                <h4 className="sec-header"><b>Photos</b></h4>
                                <div className="row">
                                        <div className="col s12 blue-grey lighten-5 color-row">
                                        <div className="row no-margin-bottom">
                                            <div className="col s12 m3 border-right-light">
                                                <h6><b>Upload New Photo(s)</b></h6>

                                                <form className="uploadForm" >
                                                    <MuiThemeProvider>
                                                        <RaisedButton
                                                            label="Choose Photo(s)"
                                                            labelPosition="before"
                                                            className="green darken-1 white-text"
                                                            containerElement="label"
                                                        >
                                                            <input type="file"
                                                                   name="userPhoto"
                                                                   accept='image/*'
                                                                   onChange={this.onChange}
                                                                   multiple
                                                                   id="child"
                                                                   style={styles.exampleImageInput} />
                                                        </RaisedButton>
                                                    </MuiThemeProvider>
                                                    {/*<input
                                                        type="file"
                                                        name="userPhoto"
                                                        accept='image/*'
                                                        multiple
                                                        id="child"
                                                        className="green-text"
                                                    />*/}
                                                    <button className="btn green darken-1 uploadBtn" onClick={this.onSubmitt} disabled={this.state.files.length == 0}>Upload Photo(s)</button>
                                                </form>
                                            </div>
                                            <div className="col s12 m9">
                                                { this.state.images.length > 0 ? (
                                                     this.state.images.map((element, i) =>
                                                        <div className="col s3 img-col" key={element}>
                                                            <a href="javascript:void(0)">
                                                                <div className="card">
                                                                    <div className="card-image">
                                                                        <img src={this.state.images[i]} width="150px"/>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a className="trash" onClick={() => this.deleteImage(this.state.images[i])} href="javascript:void(0)"><i className="material-icons left white red-text">delete</i></a>
                                                        </div>
                                                     )
                                                ) : (
                                                    <h6><b>My Photos</b></h6>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row no-margin-bottom">
                            <div className="col s12">
                                <h4 className="sec-header"><b>Property Information</b></h4>
                                <div className="row">
                                    <div className="col s12 blue-grey lighten-5 color-row">
                                        <div className="row no-margin-bottom">
                                            <div className="col s12 m4">
                                                <h6><b>Address</b></h6>
                                                <ReactMaterialSelect ref="localSelect" label="Select An Address" resetLabel="None" defaultValue="None" onChange={this.localSelectCallback.bind(this)}>
                                                    {this.state.test.map((element) =>
                                                        <option dataValue={JSON.stringify(element)} key={element}>{element.streetNumber} {element.streetName}</option>
                                                    )}
                                                </ReactMaterialSelect>
                                            </div>
                                            <div className="col s12 m4">
                                                <h6><b>Building Details</b></h6>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="singleDwelling" checked={this.state.singleDwelling}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="singleDwelling" className="">Single Family Dwelling</label>
                                                </p>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="multiDwelling" checked={this.state.multiDwelling}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="multiDwelling" className="">Multifamily Family Dwelling</label>
                                                </p>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="isApt" checked={this.state.isApt}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="isApt" className="">Apartment</label>
                                                </p>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="isCommercial" checked={this.state.isCommercial}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="isCommercial" className="">Commercial</label>
                                                </p>
                                            </div>
                                            <div className="col s12 m4">
                                                <h6><b>Property Owner (if known)</b></h6>
                                                <div className="input-field col s12">
                                                    <input placeholder="Owner Name" id="owner" type="text" className="owner" onChange={this.textFieldCallback.bind(this)} value={this.state.owner} />
                                                </div>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="livesThere" checked={this.state.livesThere}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="livesThere" className="">Owner Lives There</label>
                                                </p>
                                                <p className="no-margin">
                                                    <input type="checkbox" id="notLivesThere" checked={this.state.notLivesThere}
                                                           onChange={this.checkboxCallback.bind(this)}/>
                                                    <label htmlFor="notLivesThere" className="">Owner Doesn't Live There</label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <h4 className="sec-header"><b>Violation Information</b></h4>
                                <div className="row">
                                    <div className="col s12 blue-grey lighten-5 color-row">
                                        <div className="row no-margin-bottom">
                                            <div className="col s12 m2">
                                                <h6><b>Violation</b></h6>
                                                <p>
                                                    <input type="checkbox" id="open-struct" checked={this.state.openChecked}
                                                           onChange={() => this.updateViolations("Open/Vacant", "openChecked")}/>
                                                    <label htmlFor="open-struct">Open/Vacant</label>
                                                </p>
                                                <p>
                                                    <input type="checkbox" id="overgrowth" checked={this.state.overgrowthChecked}
                                                           onChange={() => this.updateViolations("Overgrown", "overgrowthChecked")}/>
                                                    <label htmlFor="overgrowth">Overgrown</label>
                                                </p>
                                                <p>
                                                    <input type="checkbox" id="squatters" checked={this.state.squattersChecked}
                                                           onChange={() => this.updateViolations("Housing Squatters", "squattersChecked")}/>
                                                    <label htmlFor="squatters">Squatters</label>
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
                                            </div>
                                            <div className="col s12 m3">
                                                <h6><b># Months</b></h6>
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
                                            </div>
                                            <div className="col s12 m3">
                                                <h6><b>Location On Property</b></h6>
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
                                            </div>
                                            <div className="col s12 m2">
                                                <h6 id="commentHeader"><b>Comment</b></h6>
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
                                            </div>
                                            <div className="col s12 m2 resCol">
                                                <h6><b>Is Resolved?</b></h6>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 formCol align-right">
                                <br></br>
                                <a className="btn btn-large blue darken-1" onClick={() => this.saveViolations()}>Submit House Data</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
              <div className="section no-pad loading-sec green darken-1">
                  <div className="container">
                      <div className="row">
                          <div className="col s12 center">
                              <h3 className="white-text">Loading Data</h3>
                          </div>
                      </div>
                  </div>
              </div>
            );
        }
    }
}

export default Form2;