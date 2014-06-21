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
  });
  
  
  
};

$("#findroute").click(getDirections);