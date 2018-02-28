$(document).ready(function() {
  // Map Variables
  var cachedData = "";
  // D3 Variables
  var w = 500;
  var h = 500;
  var r = 250;
  var color = d3.scale.category20c();

  function AddMarkers() {
    var map = new google.maps.Map(document.getElementById("map"), {
      "zoom": 16,
      "center": {"lat": 33.770512, "lng": -84.413504}
    });
    var sampledData = cachedData.results[0].sheets;
    for (var i = 0; i < sampledData.length; i++) {
      var infractionsData = [];
      for (var k = 0; k < sampledData[i].codeviolations.length; k++) {
        infractionsData[k] = sampledData[i].codeviolations[k].codeviolation;
      }
      console.log(infractionsData);
      var marker = new google.maps.Marker({
        "position": {"lat": sampledData[i].lat, "lng": sampledData[i].long},
        "map": map,
        "infractions": infractionsData,
        "title": sampledData[i].fulladdress
      });
      marker.addListener("click", function() {
        map.setCenter(marker.getPosition());
        console.log(marker);
        /*
        if (marker.infractions.length > 0) {
          console.log(marker.infractions);
          $("#infraction").text("");
          for (var l = 0; l < marker.infractions.length; l++) {
            console.log(marker.infractions[l]);
            $("#infraction").append(marker.infractions[l]);
          }
        }
        */
      });
    }
    console.log(google.maps);
  }
  function CountInfractions(toCount, infractionName) {
    var value = 0;
    for (var i = 0; i < toCount.length; i++) {
      for (var j = 0; j < toCount[i].codeviolations.length; j++) {
        if (toCount[i].codeviolations[j].codeviolation === infractionName) {
          value++;
        }
      }
    }
    return value;
  }

  function DrawGraph() {
    var sampledData = cachedData.results[0].sheets;
    var data = [
      {"label": "Open & Vacent Structure", "value": CountInfractions(sampledData, "Open & Vacent Structure")}, 
      {"label": "Overgrowth", "value": CountInfractions(sampledData, "Overgrowth")}, 
      {"label": "Junk vehicle", "value": CountInfractions(sampledData, "Junk vehicle")},
      {"label": "Junk, debris, trash", "value": CountInfractions(sampledData, "Junk, debris, trash")},
      {"label": "Vacent Lot", "value": CountInfractions(sampledData, "Vacent Lot")},
      {"label": "Leaking/Inoperable Plumbing", "value": CountInfractions(sampledData, "Leaking/Inoperable Plumbing")},
      {"label": "No Water", "value": CountInfractions(sampledData, "No Water")},
      {"label": "No Heat", "value": CountInfractions(sampledData, "No Heat")},
      {"label": "Junk Tires", "value": CountInfractions(sampledData, "Junk Tires")}
    ];
    //console.log(data);
    var vis = d3.select("body")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array
    
    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });        //get the label from our original data array    
  }
 
  $.post("/", function(data, status) {
    console.log(data);
    cachedData = data;
    AddMarkers();
    DrawGraph();
  });
});