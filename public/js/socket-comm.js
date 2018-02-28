/**
 * Created by Brendan on 2/21/2018.
 */
var socket = io.connect("/");

/*Initializing the connection with the server via websockets */
socket.on("connect", function () {
    //Iterates through the sheets array for individual houses
    //Hardcoded for 1 "block", hence results[0] is hardcoded
    for(i=0; i < data.results[0].sheets.length; i++){
        //Iterates through the code violations of each individual house
        for(j=0; j < data.results[0].sheets[i].codeviolations.length; j++){
            addViolation(data.results[0].sheets[i].codeviolations[j], data.results[0].sheets[i].id);
        }
    }
});

//Legacy example code
socket.on("message",function(message){
    console.log("Message from the server arrived");
    message = JSON.parse(message);
    console.log(message); /*converting the data into JS object */
    $('#content').append('<div >'+message.data+'</div>'); /*appending the data on the page using Jquery */
});

// B/c looking at objects in the browser console is easier
socket.on("console", function (data) {
    data = JSON.parse(data);
    console.log(data);
});

//Legacy example code
$(function(){
    $('#submit').click(function(){
        var data = {
            message:$('#message').val(),
            author:'Somebody'
        };
        socket.send(JSON.stringify(data));
        $('#message').val('');
    });
});

/*  Strictly for the front-end
    Creates a materialize collection item for a new code violation and appends it to the collection <ul>
    I added the sheetId as a class to the <ul> as a possible way to dynamically know where to put data on the front-end
    --variable vData: a codeviolation object
    --variable id: the sheetId that corresponds with the house. 
*/
function addViolation(vData, id) {
    var violationCollectionItem = '<li class="collection-item avatar"><i class="material-icons circle">report_problem</i><span class="title">'+vData.codeviolation+'</span><p>'+vData.timestamp+'</p></li>';
    $('.collection.'+id).append(violationCollectionItem);
}

/*  Strictly for front-end
    Triggered when "Add Code Violation" button is clicked
    Un-hides the code violation select drop-down
    --variable id: related to sheetId to know which house to display the drop-down under
 */
function showViolation(id){
    $('#'+id+'> .selectRow').removeClass("hide");
    $('.addViolation').addClass("disabled");
}

/* Triggered when a violation is selected and saved
   I use grep to search for a sheet id that matches the id passed from the front-end
   I then create a new codeviolation object and push that into the current array of codeviolations
   The new codeviolation is also emitted to the server via socket (where it would theoretically be inserted into the Spreadsheet
 */
function saveViolation(sheetId, id) {
    $.grep(data.results[0].sheets, function (n) {
        if(n.id == sheetId){
            var newViolationObj = {"timestamp": getTimestamp(), "codeviolation": $('select.'+sheetId).val(), "codenumber" : 5};
            n.codeviolations.push(newViolationObj);
            addViolation(newViolationObj, n.id);
            socket.emit('newViolation', JSON.stringify({id: n.id, newData: newViolationObj}));
        }
    });

    //Reset form elements
    resetForm(sheetId, id);
}

//Resets select drop-down, hides the HTML element, and re-enables the 'Add Code Violation' button
function resetForm(sheetId, id){
    //Reset Select
    $('select.'+sheetId).find('option[value="default"]').prop('selected', true);
    $('select.'+sheetId).material_select();
    $('#'+id+'> .selectRow').addClass("hide");
    $('.addViolation').removeClass("disabled");
}

//Utility to get timestamp is EST
function getTimestamp(){
    var localTime = new Date(); //get your local time
    var utcTime = localTime.getUTCHours(); // find UTC hours
    var estTime = new Date(); // create a new date object for the EST time
    estTime.setHours(utcTime-5); // adjust it for EST hours.
    return estTime;
}