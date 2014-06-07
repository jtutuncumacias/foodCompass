var directionsService = new google.maps.DirectionsService();

var getDirections = function(){
  var start = $(".start").val();
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
      
      var resultLeg = result.routes[0].legs[0];
      var lat = (resultLeg.start_location.k + resultLeg.end_location.k) / 2.0
      var lon = (resultLeg.start_location.A + resultLeg.end_location.A) / 2.0
      
      var def = NH.data.getHealthyMarkets(lat, lon);
      
      
    }
  });
  
  
  
};

$("#findroute").click(getDirections);