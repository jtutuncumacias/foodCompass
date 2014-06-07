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
    }
  });
  
};

$("#findroute").click(getDirections);