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
    var googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(googleMap);

 
  }

  google.maps.event.addDomListener(window, 'load', initialize);
