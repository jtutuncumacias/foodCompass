var NH = NH || {};
NH.data = NH.data || {};

(function (data) {

    var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg&category=healthmarkets&location=";

    var healthyMarkets = [];

    data.getYelpDataForLocation = function (locationName) {
        //var deferred = $.Deferred();
        return $.ajax({
            type: "GET",
            url: apiUrl + locationName,
            dataType: "jsonp"
        });
        //return deferred.promise();
    };
    

    data.getHealthyMarkets = function (locationName) {
	    var deferreds = [];

        var content = data.getYelpDataForLocation(locationName);
        content.done(function (response) {
            // get data out of response
            var urls = [];

            for (var i = 0; i < response.businesses.length; i++) {
                var geocoding = response.businesses[i];
                var address = geocoding.address1 + " " + geocoding.address2 + " " + geocoding.city + " " + geocoding.state + " " + geocoding.country;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA8maz9AiKnD81wnL1h4fGv03Bz85v4ysI";

                var deferred = $.get(url);
                deferred.then(
                    (function(geocoding) {
                        return function (data) {
                            geocoding.location = data.results[0].geometry.location;
                            healthyMarkets.push(geocoding);

                             var myLatlng = new google.maps.LatLng(geocoding.location.lat, geocoding.location.lng);
                             var map = googleMap;

                             var information = geocoding.name + ", " + geocoding.address1 + " " + geocoding.phone;


                              var infowindow = new google.maps.InfoWindow({
                                  content: information
                              });


                             var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: information,
                             });

                              google.maps.event.addListener(marker, 'mouseout', function() {
                                infowindow.close();
                              });

                              google.maps.event.addListener(marker, 'click', function() {
                                infowindow.open(map,marker);
                              });
                        };
                    })(geocoding)
                );
                deferreds.push(deferred);
            };
        });
    };

    $(function () {

        $("#findroute").click(function () {

            var def = NH.data.getHealthyMarkets("NYC");

        });

    });

})(NH.data);