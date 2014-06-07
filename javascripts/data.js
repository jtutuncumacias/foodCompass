var NH = NH || {};
NH.data = NH.data || {};

(function (data) {

    var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg&category=healthmarkets";

    var healthyMarkets = [];

    data.getYelpDataForLocation = function (lat, lon) {
        //var deferred = $.Deferred();
        var thisApiCall = apiUrl;
        thisApiCall += "&lat=" + lat;
        thisApiCall += "&lon=" + lon;
<<<<<<< HEAD
        return $.ajax({

            type: "GET",
            url: apiUrl,
=======

        return $.ajax({

            type: "GET",
            url: thisApiCall,
>>>>>>> FETCH_HEAD
            dataType: "jsonp"
        });
        //return deferred.promise();
    };

    data.getHealthyMarkets = function (lat, lon) {
	    var deferreds = [];

        var content = data.getYelpDataForLocation(lat, lon);
        content.done(function (response) {
                // get data out of response

            var collectHealthyMarket = function(data) {

            };

            var urls = [];

            for (var i = 0; i < response.businesses.length; i++) {
                var geocoding = response.businesses[i];
                var address = geocoding.address1 + " " + geocoding.address2 + " " + geocoding.city + " " + geocoding.state + " " + geocoding.country;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA8maz9AiKnD81wnL1h4fGv03Bz85v4ysI";

                var deferred = $.get(url);

                deferred.then(function(data) {
					geocoding.location = data.results[0].geometry.location;
					healthyMarkets.push(geocoding);

					 var myLatlng = new google.maps.LatLng(geocoding.location.lat, geocoding.location.lng);
					 var map = googleMap;

					 var marker = new google.maps.Marker({
					 	position: myLatlng,
					 	map: map,
					 	title: geocoding.address
					 });
                });
                deferreds.push(deferred);
            };
        });
    };

})(NH.data);