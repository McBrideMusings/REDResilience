/**
 * Created by Brendan on 4/9/2018.
 */
import React, { Component } from 'react';
import ReactMaterialSelect from 'react-material-select'
import 'react-material-select/lib/css/reactMaterialSelect.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Lightbox from "react-image-lightbox";
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.localSelectCallback = this.localSelectCallback.bind(this);
        this.commentCallback = this.commentCallback.bind(this);
        this.resolvedCallback = this.resolvedCallback.bind(this);
        this.textFieldCallback = this.textFieldCallback.bind(this);
        this.checkboxCallback = this.checkboxCallback.bind(this);
        this.passwordCallback = this.passwordCallback.bind(this);
        this.saveViolations = this.saveViolations.bind(this);
        this.initState = {
            hasSaved: false,
            pwVerified: false,
            password: '',
            progressDisplay: false,
            locDesc: '',
            lightboxOpen: false,
            lightboxIndex: 0,
            modalOpen: false,
            pwModalOpen: false,
            noAddressModalOpen: false,
            noViolationsModalOpen: false,
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
            openResolved: false,
            openCheckedcomments: '',
            overgrowthChecked: false,
            overgrowthResolved: false,
            overgrowthCheckedmonthsOne: false,
            overgrowthCheckedmonthsFour: false,
            overgrowthCheckedmonthsSix: false,
            overgrowthCheckedfront: false,
            overgrowthCheckedback: false,
            overgrowthCheckedside: false,
            overgrowthCheckedcomments: '',
            junkVehicleChecked: false,
            junkVehicleResolved: false,
            junkVehicleCheckedmonthsOne: false,
            junkVehicleCheckedmonthsFour: false,
            junkVehicleCheckedmonthsSix: false,
            junkVehicleCheckedfront: false,
            junkVehicleCheckedback: false,
            junkVehicleCheckedside: false,
            junkVehicleCheckedcomments: '',
            trashChecked: false,
            trashResolved: false,
            trashCheckedmonthsOne: false,
            trashCheckedmonthsFour: false,
            trashCheckedmonthsSix: false,
            trashCheckedfront: false,
            trashCheckedback: false,
            trashCheckedside: false,
            trashCheckedcomments: '',
            leakingChecked: false,
            leakingResolved: false,
            leakingCheckedmonthsOne: false,
            leakingCheckedmonthsFour: false,
            leakingCheckedmonthsSix: false,
            leakingCheckedfront: false,
            leakingCheckedback: false,
            leakingCheckedside: false,
            leakingCheckedcomments: '',
            waterChecked: false,
            waterResolved: false,
            waterCheckedmonthsOne: false,
            waterCheckedmonthsFour: false,
            waterCheckedmonthsSix: false,
            waterCheckedfront: false,
            waterCheckedback: false,
            waterCheckedside: false,
            waterCheckedcomments: '',
            squattersChecked: false,
            squattersResolved: false,
            squattersCheckedmonthsOne: false,
            squattersCheckedmonthsFour: false,
            squattersCheckedmonthsSix: false,
            squattersCheckedfront: false,
            squattersCheckedback: false,
            squattersCheckedside: false,
            squattersCheckedcomments: '',
            boardedChecked: false,
            boardedResolved: false,
            boardedCheckedmonthsOne: false,
            boardedCheckedmonthsFour: false,
            boardedCheckedmonthsSix: false,
            boardedCheckedfront: false,
            boardedCheckedback: false,
            boardedCheckedside: false,
            boardedCheckedcomments: '',
            rodentChecked: false,
            rodentResolved: false,
            rodentCheckedmonthsOne: false,
            rodentCheckedmonthsFour: false,
            rodentCheckedmonthsSix: false,
            rodentCheckedfront: false,
            rodentCheckedback: false,
            rodentCheckedside: false,
            rodentCheckedcomments: '',
            floodedChecked: false,
            floodedResolved: false,
            floodedCheckedmonthsOne: false,
            floodedCheckedmonthsFour: false,
            floodedCheckedmonthsSix: false,
            floodedCheckedfront: false,
            floodedCheckedback: false,
            floodedCheckedside: false,
            floodedCheckedcomments: '',
            otherChecked: false,
            otherResolved: false,
            otherCheckedmonthsOne: false,
            otherCheckedmonthsFour: false,
            otherCheckedmonthsSix: false,
            otherCheckedfront: false,
            otherCheckedback: false,
            otherCheckedside: false,
            otherCheckedcomments: ''
        };
        this.state = this.initState;
    }

    componentDidMount() {
        /*
        * Retrieves address data from Spreadsheet to populate dropdown
        * Checks sessionStorage var to see if user has already typed in correct PW during this session
        * If they have, don't show the PW modal
        * */
        fetch('/data', {
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({test: data});
            if(sessionStorage.getItem("hasPW")){
               this.setState({pwVerified: true, pwModalOpen: false});
            }
            else{
                this.setState({pwModalOpen: true});
            }
        });
    }

    refreshPage(){
        window.location.reload();
    }

    resetForm = () => {
        /*
        * Resets all form states if user clicks "Create Another Code Violation"
        * The setState() obj should always mirror the one in the constructor
        * */
        this.state.violations = [];
        this.setState({
            hasSaved: false,
            pwVerified: false,
            password: '',
            progressDisplay: false,
            locDesc: '',
            lightboxOpen: false,
            lightboxIndex: 0,
            modalOpen: false,
            noAddressModalOpen: false,
            noViolationsModalOpen: false,
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
            openResolved: false,
            openCheckedcomments: '',
            overgrowthChecked: false,
            overgrowthResolved: false,
            overgrowthCheckedmonthsOne: false,
            overgrowthCheckedmonthsFour: false,
            overgrowthCheckedmonthsSix: false,
            overgrowthCheckedfront: false,
            overgrowthCheckedback: false,
            overgrowthCheckedside: false,
            overgrowthCheckedcomments: '',
            junkVehicleChecked: false,
            junkVehicleResolved: false,
            junkVehicleCheckedmonthsOne: false,
            junkVehicleCheckedmonthsFour: false,
            junkVehicleCheckedmonthsSix: false,
            junkVehicleCheckedfront: false,
            junkVehicleCheckedback: false,
            junkVehicleCheckedside: false,
            junkVehicleCheckedcomments: '',
            trashChecked: false,
            trashResolved: false,
            trashCheckedmonthsOne: false,
            trashCheckedmonthsFour: false,
            trashCheckedmonthsSix: false,
            trashCheckedfront: false,
            trashCheckedback: false,
            trashCheckedside: false,
            trashCheckedcomments: '',
            leakingChecked: false,
            leakingResolved: false,
            leakingCheckedmonthsOne: false,
            leakingCheckedmonthsFour: false,
            leakingCheckedmonthsSix: false,
            leakingCheckedfront: false,
            leakingCheckedback: false,
            leakingCheckedside: false,
            leakingCheckedcomments: '',
            waterChecked: false,
            waterResolved: false,
            waterCheckedmonthsOne: false,
            waterCheckedmonthsFour: false,
            waterCheckedmonthsSix: false,
            waterCheckedfront: false,
            waterCheckedback: false,
            waterCheckedside: false,
            waterCheckedcomments: '',
            squattersChecked: false,
            squattersResolved: false,
            squattersCheckedmonthsOne: false,
            squattersCheckedmonthsFour: false,
            squattersCheckedmonthsSix: false,
            squattersCheckedfront: false,
            squattersCheckedback: false,
            squattersCheckedside: false,
            squattersCheckedcomments: '',
            boardedChecked: false,
            boardedResolved: false,
            boardedCheckedmonthsOne: false,
            boardedCheckedmonthsFour: false,
            boardedCheckedmonthsSix: false,
            boardedCheckedfront: false,
            boardedCheckedback: false,
            boardedCheckedside: false,
            boardedCheckedcomments: '',
            rodentChecked: false,
            rodentResolved: false,
            rodentCheckedmonthsOne: false,
            rodentCheckedmonthsFour: false,
            rodentCheckedmonthsSix: false,
            rodentCheckedfront: false,
            rodentCheckedback: false,
            rodentCheckedside: false,
            rodentCheckedcomments: '',
            floodedChecked: false,
            floodedResolved: false,
            floodedCheckedmonthsOne: false,
            floodedCheckedmonthsFour: false,
            floodedCheckedmonthsSix: false,
            floodedCheckedfront: false,
            floodedCheckedback: false,
            floodedCheckedside: false,
            floodedCheckedcomments: '',
            otherChecked: false,
            otherResolved: false,
            otherCheckedmonthsOne: false,
            otherCheckedmonthsFour: false,
            otherCheckedmonthsSix: false,
            otherCheckedfront: false,
            otherCheckedback: false,
            otherCheckedside: false,
            otherCheckedcomments: ''
        });
        this.componentDidMount();
    }

    localSelectCallback(selected){
        /*
         * Handles the Address Selector drop-down
         * Populates state.houseData with address data
         * */
        try{
            this.setState({houseData : JSON.parse(selected.value)}, () => {
                this.setState({locDesc: ''});
            });
        }catch(e){}
    }

    handleOpen = () => {
        /*
        * Listens to "Save All Data" button and checks state values to see if requires data is missing
        * Check 1: House dropdown selected OR custom address text exists
        * Check 2: At least 1 violation has been selected
        * Else: Display "Are You Sure?" modal
        * */
        if(!Object.keys(this.state.houseData).length && this.state.locDesc == ''){
            this.setState({noAddressModalOpen: true});
        }
        else if(this.state.violations.length == 0){
            this.setState({noViolationsModalOpen: true});
        }
        else{
            this.setState({modalOpen: true});
        }

    };

    handleClose = () => {
        /*
        * Hides 'Are you sure?' modal
        * */
        this.setState({modalOpen: false});
    };

    handleAddressClose = () => {
        /*
         * Hides 'Missing Address' modal
         * */
        this.setState({noAddressModalOpen: false});
    };

    handleViolationsClose = () => {
        /*
         * Hides 'Missing Violations' modal
         * */
        this.setState({noViolationsModalOpen: false});
    };

    handleSave= () => {
        this.saveViolations();
        this.setState({modalOpen: false});
    };

    handlePWSubmit = () =>{
        /*
        * Sends user's password to server for verification
        * If OK: hides modal, sets sessionStorage var
        * Else: pop alert and do nothing
        * */
        const pw = this.state.password;
        this.setState({password: ''});
        fetch('/password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: pw
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === "OK"){
                this.setState({
                    pwVerified: true,
                    pwModalOpen: false,
                    password: ''
                });
                sessionStorage.setItem("hasPW", true);
            }
            else{
                alert("Incorrect Password");
            }
        });
    };
    openLightBox = (i) => {
        this.setState({lightboxIndex: i, lightboxOpen: true});
    };

    closeLightBox = () => {
        this.setState({lightboxOpen: false});
    };

    resetDropdown(){
        /*
         * Resets Address dropdown (might be deprecated)
         * */
        if(this.refs.localSelect != null){
            this.refs.localSelect.handleSetSelect("Select An Address", "None");
        }
    }

    deleteImage(img){
        /*
        * DEPRECATED
        * Deletes a single image from the uploads folder
        * */
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

    deleteAllUploads(images){
        /*
        * After user submits a completed form and pictures are uploaded to drive, we delete their images in the local /uploads folder
        * */
        console.log(images);
        fetch('/deleteAllImg', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: images
            })
        }).then(function(res){});
    }

    resolvedCallback(event){
        /*
         * TODO: Remove and replace all isResolved checkbox callbacks to 'checkboxCallback()'
         * */
        const id = event.target.id;
        this.setState({ [event.target.id] : !this.state[event.target.id] }, () => this.violationCheck(id));
    }

    commentCallback(event){
        /*
         * TODO: Remove and replace all comment field callbacks to 'textFieldCallback()'
         * */
        const id = event.target.id;
        this.setState({ [event.target.id] : event.target.value}, () => this.violationCheck(id));
    }

    passwordCallback(event){
        /*
        * Updates state.password as user types it in to text field
        * */
        this.setState({ password : event.target.value});
    }

    textFieldCallback(event){
        /*
         * Handles each text input field as user types
         * I use the html id as the state object value (probably a better way)
         * */
        const id = event.target.id;
        this.setState({ [event.target.id] : event.target.value}, () => this.violationCheck(id));
        if(id === "locDesc" && Object.keys(this.state.houseData).length > 0){
            this.setState({houseData: {}});
            this.resetDropdown();
        }
    }

    checkboxCallback(event){
        /* Handles each checkbox */
        const id = event.target.id;
        this.setState({ [event.target.id] : !this.state[event.target.id] }, () => this.violationCheck(id));
    }

    updateViolations(v, c){
        /*
        * Adds a new violation when user checks an assc. checkbox
        * Will also remove violation when box is unchecked
        * @param v - violation plain text string (i.e. "Open/Vacant")
        * @param c - violation checkbox value (i.e. "openChecked")
        * */
        this.setState({ [c]: !this.state[c] });
        var result = this.state.violations.find((n) => {
            return n === v;
        });
        if(result == null && !this.state[c]){
            this.state.violations.push(v);
            this.state[c] = true;
            this.violationCheck(c);
        }
        else{
            var index = this.state.violations.indexOf(v);
            this.state[c] = false;
            this.state.violations.splice(index, 1);
            this.violationCheck(c);
            this.violationResetCheck(v, c);
        }
    }

    violationCheck(c){
        /*
        * Checks the parent violation box (e.g. "Open/Vacant") if user checks a child (e.g. 1-3 months) beforehand
        * Will only check parent if it is not already "checked"
        * If checked, violation is pushed to array as if the user checked it themselves
        * */
        if(c.includes("open") && !this.state.openChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({openChecked: true });
            this.state.violations.push("Open/Vacant");
        }
        if(c.includes("overgrowth") && !this.state.overgrowthChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({overgrowthChecked: true });
            this.state.violations.push("Overgrown");
        }
        if(c.includes("squatters") && !this.state.squattersChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({squattersChecked: true });
            this.state.violations.push("Housing Squatters");
        }
        if(c.includes("leaking") && !this.state.leakingChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({leakingChecked: true });
            this.state.violations.push("Damaged/Leaking");
        }
        if(c.includes("water") && !this.state.waterChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({waterChecked: true });
            this.state.violations.push("No Power/Water");
        }
        if(c.includes("boarded") && !this.state.boardedChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({boardedChecked: true });
            this.state.violations.push("Boarded Up");
        }
        if(c.includes("rodent") && !this.state.rodentChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({rodentChecked: true });
            this.state.violations.push("Rodent Infested");
        }
        if(c.includes("flooded") && !this.state.floodedChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({floodedChecked: true });
            this.state.violations.push("Flooded");
        }
        if(c.includes("trash") && !this.state.trashChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({trashChecked: true });
            this.state.violations.push("Excessive Trash");
        }
        if(c.includes("junkVehicle") && !this.state.junkVehicleChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({junkVehicle: true });
            this.state.violations.push("Junk Vehicle");
        }
        if(c.includes("other") && !this.state.otherChecked && (this.state[c] == true || this.state[c].length > 0)){
            this.setState({otherChecked: true });
            this.state.violations.push("Other");
        }
    }

    violationResetCheck(v, c){
        /*
        * If user un-checks parent checkbox on a violation row, all child checkboxes (and text field) are cleared
        * */
        if(c == "openChecked"){
            this.setState({
                openChecked: false,
                openCheckedmonthsOne: false,
                openCheckedmonthsFour: false,
                openCheckedmonthsSix: false,
                openCheckedfront: false,
                openCheckedback: false,
                openCheckedside: false,
                openResolved: false,
                openCheckedcomments: ''
            });
        }
        if(c == "overgrowthChecked"){
            this.setState({
                overgrowthChecked: false,
                overgrowthResolved: false,
                overgrowthCheckedmonthsOne: false,
                overgrowthCheckedmonthsFour: false,
                overgrowthCheckedmonthsSix: false,
                overgrowthCheckedfront: false,
                overgrowthCheckedback: false,
                overgrowthCheckedside: false,
                overgrowthCheckedcomments: ''
            });
        }
        if(c == "junkVehicleChecked"){
            this.setState({
                junkVehicleChecked: false,
                junkVehicleResolved: false,
                junkVehicleCheckedmonthsOne: false,
                junkVehicleCheckedmonthsFour: false,
                junkVehicleCheckedmonthsSix: false,
                junkVehicleCheckedfront: false,
                junkVehicleCheckedback: false,
                junkVehicleCheckedside: false,
                junkVehicleCheckedcomments: ''
            });
        }
        if(c == "trashChecked"){
            this.setState({
                trashChecked: false,
                trashResolved: false,
                trashCheckedmonthsOne: false,
                trashCheckedmonthsFour: false,
                trashCheckedmonthsSix: false,
                trashCheckedfront: false,
                trashCheckedback: false,
                trashCheckedside: false,
                trashCheckedcomments: ''
            });
        }
        if(c == "leakingChecked"){
            this.setState({
                leakingChecked: false,
                leakingResolved: false,
                leakingCheckedmonthsOne: false,
                leakingCheckedmonthsFour: false,
                leakingCheckedmonthsSix: false,
                leakingCheckedfront: false,
                leakingCheckedback: false,
                leakingCheckedside: false,
                leakingCheckedcomments: ''
            });
        }
        if(c == "waterChecked"){
            this.setState({
                waterChecked: false,
                waterResolved: false,
                waterCheckedmonthsOne: false,
                waterCheckedmonthsFour: false,
                waterCheckedmonthsSix: false,
                waterCheckedfront: false,
                waterCheckedback: false,
                waterCheckedside: false,
                waterCheckedcomments: ''
            });
        }
        if(c == "squattersChecked"){
            this.setState({
                squattersChecked: false,
                squattersResolved: false,
                squattersCheckedmonthsOne: false,
                squattersCheckedmonthsFour: false,
                squattersCheckedmonthsSix: false,
                squattersCheckedfront: false,
                squattersCheckedback: false,
                squattersCheckedside: false,
                squattersCheckedcomments: ''
            });
        }
        if(c == "boardedChecked"){
            this.setState({
                boardedChecked: false,
                boardedResolved: false,
                boardedCheckedmonthsOne: false,
                boardedCheckedmonthsFour: false,
                boardedCheckedmonthsSix: false,
                boardedCheckedfront: false,
                boardedCheckedback: false,
                boardedCheckedside: false,
                boardedCheckedcomments: ''
            });
        }
        if(c == "rodentChecked"){
            this.setState({
                rodentChecked: false,
                rodentResolved: false,
                rodentCheckedmonthsOne: false,
                rodentCheckedmonthsFour: false,
                rodentCheckedmonthsSix: false,
                rodentCheckedfront: false,
                rodentCheckedback: false,
                rodentCheckedside: false,
                rodentCheckedcomments: ''
            });
        }
        if(c == "floodedChecked"){
            this.setState({
                floodedChecked: false,
                floodedResolved: false,
                floodedCheckedmonthsOne: false,
                floodedCheckedmonthsFour: false,
                floodedCheckedmonthsSix: false,
                floodedCheckedfront: false,
                floodedCheckedback: false,
                floodedCheckedside: false,
                floodedCheckedcomments: ''
            });
        }
        if(c == "otherChecked"){
            this.setState({
                otherChecked: false,
                otherResolved: false,
                otherCheckedmonthsOne: false,
                otherCheckedmonthsFour: false,
                otherCheckedmonthsSix: false,
                otherCheckedfront: false,
                otherCheckedback: false,
                otherCheckedside: false,
                otherCheckedcomments: ''
            });
        }
        let violations = [];
        for(var i=0; i < this.state.violations.length; i++){
            if(!this.state.violations[i].includes(v)){
                violations.push(this.state.violations[i]);
            }
        }
        this.state.violations = violations;

    }

    saveViolations(){
        /*
        * Called when user saves/uploads all form data
        * Server-dependent objects are constructed and sent in the POST body
        * */
        this.setState({progressDisplay: true});
        let postData = {houseData: {}, violationData: {}, url: "", concatAddress: ""};
        if(Object.keys(this.state.houseData).length){
            /*
            * Constructs a concat address string for Drive image labeling on the serverside
            * Removes all spaces and replaces them with '_'
            * */
            postData.houseData = this.state.houseData;
            postData.concatAddress = this.state.houseData.streetNumber+" "+this.state.houseData.streetName;
            postData.concatAddress = postData.concatAddress.replace(/ /g,"_");
        }
        else if(this.state.locDesc !== ''){
            /*
            * Handles case for Custom address description instead of dropdown
            * */
            postData.concatAddress = this.state.locDesc.replace(/ /g,"_");
        }
        let newViolations = this.reconstructViolations();
        let propertyData = this.constructPropertyInfo();
        let images = this.state.images;
        let myImages = this.state.images;
        var promises = [];
        Object.keys(newViolations[0]).forEach((key, idx) => {
            /*
             * Send 1 POST request per violation
             * */
            if (Object.keys(newViolations[0][key]).length){
                /*
                 * Only send a request if a violation obj is not empty (thus indicating checkboxes were selected and violation information exists)
                 * For example: { open: {}, overgrowth { monthsOne: true, isResolved: true}, ... } -- a request would not be sent for 'open' since the obj is empty. A request would be sent for 'overgrowth' since 'monthsOne' & 'isResolved' are true...due to the fact the user selected those checkboxes on the Overgrowth row
                 * */
                promises.push(
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
                    })
                );
            }
        });
        /*
        * Only resolve after all violation promises are finished
        * Display confirmation page
        * Delete all images in the /uploads folder
        * */
        Promise.all(promises)
        .then(() => {
            this.setState({hasSaved: true, progressDisplay: false});
            this.deleteAllUploads(myImages);
        })
    }

    reconstructViolations(){
        /*
        * Violation data is not yet consolidated and only exists as state bools/strings (for comments)
        * A new object is created with sub-objects each representing 1 possible violation type
        * Based on form input, values are added to each sub-object
        * For example, if a user only selects "Open/Vacant" and "1-3 months" on the form, this function will return:
        * {open: { monthsOne: true }, overgrowth: {}, squatters: {}, leaking: {}, water: {}, boarded: {}, rodent: {}, flooded: {}, trash: {}, junkVehicle: {}, other: {}}
        * The saveViolation() logic will know to only send 1 violation to the server since 'open' is the only sub-object that is not empty
        *
        * There is probably a better way to do this...
        * */
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
                if(this.state.trashResolved) obj.trash.isResolved = true;
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
        if(this.state.trashCheckedcomments.length) obj.trash.comments = this.state.trashCheckedcomments;
        if(this.state.junkVehicleCheckedcomments.length) obj.junkVehicle.comments = this.state.junkVehicleCheckedcomments;
        if(this.state.otherCheckedcomments.length) obj.other.comments = this.state.otherCheckedcomments;

        newViolations.push(obj);
        return newViolations;
    }

    constructPropertyInfo(){
        /*
        * returns a consolidated object containing the Property Info form input
        * */
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
        /*
        * Called when user is done selecting photos the file uploader.
        * Manually gets the file references from the input field and images get placed in the /uploads folder
        * Images are then displayed on the form
        * */
        this.setState({
            files: e.target.files
        });
        let formData = new FormData();
        let inputElement = document.querySelector('#child');
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

    // onSubmit = (e) =>{
    //     let formData = new FormData();
    //     let inputElement = document.querySelector('#child');
    //     for (let index = 0; index < inputElement.files.length; index++) {
    //         formData.append('userPhoto', inputElement.files[index], 'chris2.jpg'); // APPEND WORKS?!
    //     }
    //     axios.post('/upload', formData)
    //         .then(response => {
    //             console.log(response.data.files);
    //             var temp = this.state.images;
    //             for(var i=0; i < response.data.files.length; i++){
    //                 var newUrl = "/uploads/"+response.data.files[i];
    //                 temp.push(newUrl);
    //             }
    //             this.setState({ images : temp });
    //         })
    //         .catch(error => {
    //             console.log(error.response);
    //     });
    //     this.setState({ files: []});
    //     e.preventDefault();
    // };

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
            },
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            gridList: {
                display: 'flex',
                flexWrap: 'nowrap',
                overflowX: 'auto'
            }
        };
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleSave}
            />
        ];
        if(this.state.test !== undefined){
            return( // Link on 758
                <MuiThemeProvider>
                { this.state.hasSaved ? (
                    <div className="section no-pad loading-sec">
                        <div className="container">
                            <div className="row">
                                <div className="col s12 center">
                                    <h3 className="green-text darken-1">Your data has been submitted!</h3>
                                    <br></br>
                                    <h5>Would you like to create new entry?</h5>
                                    <div>
                                        <a className="btn btn-large white black-text" onClick={this.refreshPage} >No, Return Home</a>
                                        <a className="btn btn-large blue" onClick={this.resetForm}>Yes, Create New</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                <div className="section x-pad">
                    <div className="container">
                        <div className="row no-margin-bottom">
                            <div className="col s12">
                                <h4 className="sec-header photo-header"><b>Photos</b></h4>
                                <form className="inlineForm">
                                    <MuiThemeProvider>
                                        <RaisedButton
                                            label="Upload Photo(s)"
                                            backgroundColor="#25AB50"
                                            labelColor="white"
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
                                                   className="green darken-1 white-text"
                                                   style={styles.exampleImageInput} />
                                        </RaisedButton>
                                    </MuiThemeProvider>
                                </form>
                                <div className="row">
                                        <div className="col s12 blue-grey lighten-5 color-row">
                                        <div className="row no-margin-bottom">
                                            <div className="col s12">
                                                { this.state.images.length > 0 ? (
                                                     this.state.images.map((element, i) =>
                                                        <div className="col s3 img-col" key={element}>
                                                            <a href="javascript:void(0)" onClick={() => this.openLightBox(i)}>
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
                                                    <h5 className="center grey-text">Photos Will Appear Here</h5>
                                                )}
                                                {this.state.lightboxOpen && (
                                                    <Lightbox
                                                        mainSrc={this.state.images[this.state.lightboxIndex]}
                                                        onCloseRequest={() => this.setState({ lightboxOpen: false })}
                                                    />
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
                                                <ReactMaterialSelect className="addressSelect" ref="localSelect" label="Select An Address" resetLabel="None" defaultValue="None" onChange={this.localSelectCallback.bind(this)}>
                                                    {this.state.test.map((element) =>
                                                        <option dataValue={JSON.stringify(element)} key={element}>{element.streetNumber} {element.streetName}</option>
                                                    )}
                                                </ReactMaterialSelect>
                                                <p className="no-margin"><b>OR describe the location</b></p>
                                                <div className="input-field col s12">
                                                    <input placeholder="Location Description" id="locDesc" type="text" className="locDesc" onChange={this.textFieldCallback.bind(this)} value={this.state.locDesc} />
                                                </div>
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
                                                    <input type="checkbox" id="trash" checked={this.state.trashChecked}
                                                           onChange={() => this.updateViolations("Excessive Trash", "trashChecked")}/>
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
                                                    <input type="checkbox" id="trash-months-one" checked={this.state.trashCheckedmonthsOne}
                                                           onChange={() => this.updateViolations("Excessive Trash 1-3", "trashCheckedmonthsOne")}/>
                                                    <label htmlFor="trash-months-one" className="monthsLabel">1-3</label>
                                                    <input type="checkbox" id="trash-months-four" checked={this.state.trashCheckedmonthsFour}
                                                           onChange={() => this.updateViolations("Excessive Trash 4-6", "trashCheckedmonthsFour")}/>
                                                    <label htmlFor="trash-months-four" className="monthsLabel">4-6</label>
                                                    <input type="checkbox" id="trash-months-six" checked={this.state.trashCheckedmonthsSix}
                                                           onChange={() => this.updateViolations("Excessive Trash 6+", "trashCheckedmonthsSix")}/>
                                                    <label htmlFor="trash-months-six" className="monthsLabel">6+</label>
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
                                                    <input type="checkbox" id="trash-front" checked={this.state.trashCheckedfront}
                                                           onChange={() => this.updateViolations("Excessive Trash front", "trashCheckedfront")}/>
                                                    <label htmlFor="trash-front" className="monthsLabel">Front</label>
                                                    <input type="checkbox" id="trash-back" checked={this.state.trashCheckedback}
                                                           onChange={() => this.updateViolations("Excessive Trash back", "trashCheckedback")}/>
                                                    <label htmlFor="trash-back" className="monthsLabel">Back</label>
                                                    <input type="checkbox" id="trash-side" checked={this.state.trashCheckedside}
                                                           onChange={() => this.updateViolations("Excessive Trash side", "trashCheckedside")}/>
                                                    <label htmlFor="trash-side" className="monthsLabel">Side</label>
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
                                                        <input placeholder="Comments" id="trashCheckedcomments" type="text" className="Excessive Trash" onChange={this.commentCallback.bind(this)} value={this.state.trashCheckedcomments} />
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
                                                    <input type="checkbox" id="trashResolved" checked={this.state.trashResolved}
                                                           onChange={this.resolvedCallback.bind(this)}/>
                                                    <label htmlFor="trashResolved" className="monthsLabel">&nbsp;</label>
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
                                <a className="btn btn-large blue darken-1" disabled={!this.state.pwVerified} onClick={() => this.handleOpen()}>Submit House Data</a>
                                <Dialog
                                    title="Are You Sure?"
                                    actions={actions}
                                    modal={true}
                                    open={this.state.modalOpen}
                                >
                                    Please review your information before submitting.
                                </Dialog>
                                <Dialog
                                    modal={true}
                                    open={this.state.progressDisplay}
                                    titleClassName="titleCont"
                                    contentClassName="contentCont"
                                    bodyClassName="bodyCont"
                                    style={
                                       {backgroundColor: 'rgba(0,0,0,0)'}
                                    }
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        textAlign: 'center'
                                    }}
                                    bodyStyle={{
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        textAlign: 'center'
                                    }}
                                    titleStyle={{
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        textAlign: 'center'
                                    }}
                                    actionsContainerStyle={{
                                        backgroundColor: 'rgba(0,0,0,0)',
                                        textAlign: 'center'
                                    }}
                                >
                                    <CircularProgress size={150} thickness={15} color="#25AB50" />
                                </Dialog>
                                <Dialog
                                    title="Enter Password"
                                    actions={[<FlatButton
                                                label="Cancel"
                                                primary={false}
                                                onClick={() => this.refreshPage()}
                                            />, <FlatButton
                                                label="Submit"
                                                primary={true}
                                                onClick={() => this.handlePWSubmit()}
                                            />]
                                            }
                                    modal={true}
                                    open={this.state.pwModalOpen}
                                >
                                    To fill out the form, please provide the password given to you by the BlockByBlock team.
                                    <form className="pwForm">
                                        <div className="input-field col s12">
                                            <input placeholder="Password" id="password" type="password" className="password" onChange={this.passwordCallback.bind(this)} value={this.state.password} />
                                        </div>
                                    </form>
                                </Dialog>
                                <Dialog
                                    title="Missing Data!"
                                    actions={<FlatButton
                                                label="Ok"
                                                primary={false}
                                                onClick={this.handleAddressClose}
                                            />}
                                    modal={false}
                                    open={this.state.noAddressModalOpen}
                                    onRequestClose={this.handleAddressClose}
                                >
                                    Please enter an address or location description to submit.
                                </Dialog>
                                <Dialog
                                    title="Missing Data!"
                                    actions={<FlatButton
                                                label="Ok"
                                                primary={false}
                                                onClick={this.handleViolationsClose}
                                            />}
                                    modal={false}
                                    open={this.state.noViolationsModalOpen}
                                    onRequestClose={this.handleViolationsClose}
                                >
                                    Please select at least one violation before submitting.
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
                ) }
                </MuiThemeProvider>
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

export default Form;