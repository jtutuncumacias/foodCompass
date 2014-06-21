var directionsService = new google.maps.DirectionsService();
var geolocatedDirections = null;
var CURRENT_LOCATION = "Current Location";

var getDirections = function(){
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

    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      deletemarkerList();
      var resultLeg = result.routes[0].legs[0];
      console.log(resultLeg);
      console.log(resultLeg.start_location);
      var t_lat = Math.max(resultLeg.start_location.k, resultLeg.end_location.k);
      var b_lat = Math.min(resultLeg.start_location.k, resultLeg.end_location.k);
      
      var t_lon = Math.max(resultLeg.start_location.A, resultLeg.end_location.A);
      var b_lon = Math.min(resultLeg.start_location.A, resultLeg.end_location.A);
      
      var def = NH.data.getHealthyMarkets(t_lat, b_lat, t_lon, b_lon);
    }
    else{
      alert ("Something went wrong.  Please try again.");
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
var email = function(){
  var receiver = $(".email").val();
window.location = 'mailto:' + receiver + '?subject=Your+tip+on+mailto+links&body=Thanks+for+this+tip'

}

$("#findroute").click(getDirections);
$('#geolocate-button').click(findCurrentLoc);
$('#email').click(email)