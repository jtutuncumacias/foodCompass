
var rendererOptions = {
  draggable: true
};
var start = $(".start").val();
var end = $(".end").val();

var googleMap;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();




  function initialize() {
    var myLatlng = new google.maps.LatLng(40.663312, -73.951046);
    var mapOptions = {
      zoom: 10,
      center: myLatlng,
      streetViewControl: false,
      mapTypeControl: false,
      panControl: false
    }
    googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);


    directionsDisplay.setMap(googleMap);


    google.maps.event.addListener(directionsDisplay, 'directions_changed', updatedDirections);

 
  }

  google.maps.event.addDomListener(window, 'load', initialize);
//THIS IS THE ONE QUESTION I WANT ANSWERED: HOW DO YOU GET A LOCATION OF A MARKER [MOST PREFERABLY ORIGIN AND DESTINATION]?