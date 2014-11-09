var directionsService = new google.maps.DirectionsService();
var geolocatedDirections = null;
var CURRENT_LOCATION = "Current Location";

var getDirections = function(biking){
  var start = $(".start").val();
  if (geolocatedDirections && start == CURRENT_LOCATION) {
    start = geolocatedDirections.coords.latitude +","+ geolocatedDirections.coords.longitude;
  }
  var end = $(".end").val();
  
  
  // Copied from https://developers.google.com/maps/documentation/javascript/directions
  var waypoints = [];
  var request = {
    origin:start,
    destination:end,
    waypoints: waypoints,

    travelMode: biking
      ? google.maps.TravelMode.BICYCLING      
      : google.maps.TravelMode.DRIVING 

  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      
    }
    else{
      alert("Something went wrong.  Please try again.");
    }
  });
};
var updateStartLoc = function(position){
  $(".start").val(CURRENT_LOCATION);
  geolocatedDirections = position;
};
var findCurrentLoc = function(){
 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateStartLoc);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
};

var updatedDirections = function(){
  deletemarkerList();
  var result = directionsDisplay.getDirections();
  var resultLeg = result.routes[0].legs[0];
  console.log(resultLeg);
  console.log(resultLeg.start_location);
  var t_lat = Math.max(resultLeg.start_location.k, resultLeg.end_location.k);
  var b_lat = Math.min(resultLeg.start_location.k, resultLeg.end_location.k);
  
  var t_lon = Math.max(resultLeg.start_location.B, resultLeg.end_location.B);
  var b_lon = Math.min(resultLeg.start_location.B, resultLeg.end_location.B);
  
  NH.data.setCategory($('#category_filter').val());

  var def = NH.data.getHealthyMarkets(t_lat, b_lat, t_lon, b_lon);
}

var email = function(){
  var receiver = $(".email").val();
  if (receiver) {
    var subject = encodeURIComponent("Your foodCompass Page");
    var body = encodeURIComponent("github.io/foodCompass/index.html");
    var link = 'mailto:' + receiver + '?subject=' + subject + '&body=' + body;

    console.log(link);
    //alert(link);
    window.location.href = link;    
  }
  else {
    alert("Need valid email address")
  }
}

$('#findRouteBike').click(function(){
  getDirections(true);
});

$("#findroute").click(function(){
  getDirections(false);
});
$('#geolocate-button').click(findCurrentLoc);
$('#email').click(email)
