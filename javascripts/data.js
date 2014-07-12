var NH = NH || {};
NH.data = NH.data || {};

 var markerlist = [];
 function deletemarkerList(){
    for(i = 0; i < markerlist.length; i++){
        markerlist[i].setMap(null);
    }
 }

(function (data) {

    var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg";

    var healthyMarkets = [];

    
    var showHealthyMarketSearchResults = function(){


      var results = $("#searchResults");

      var newHtml = "";

      for(var i = 0; i < healthyMarkets.length; i++){

        newHtml = newHtml + '<a href = "' + healthyMarkets[i]["url"] + '"> ' + healthyMarkets[i]["name"] + "</a>";        

      }


      results.html(newHtml);
    };




    data.getYelpDataForLocation = function (t_lat, b_lat, t_lon, b_lon) {
        var thisApiCall = apiUrl;
        thisApiCall += "&tl_lat=" + t_lat;
        thisApiCall += "&tl_long=" + t_lon;
        thisApiCall += "&br_lat=" + b_lat;
        thisApiCall += "&br_long=" + b_lon;

        return $.ajax({
            type: "GET",
            url: thisApiCall,
            dataType: "jsonp"
        });
        //return deferred.promise();
    };

    data.getHealthyMarkets = function (t_lat, b_lat, t_lon, b_lon) {
        var deferreds = [];
        healthyMarkets = [];

        var content = data.getYelpDataForLocation(t_lat, b_lat, t_lon, b_lon);
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

                 deferred.then(
                    (function(geocoding) {
                        return function (data) {
                            geocoding.location = data.results[0].geometry.location;
                            healthyMarkets.push(geocoding);

                             var myLatlng = new google.maps.LatLng(geocoding.location.lat, geocoding.location.lng);
                             var map = googleMap;

                             var information = "<p>" +
                                "<b><a href='" + geocoding.url + "'>" + geocoding.name + "<ga></b><br/>" +
                                geocoding.address1 + " " + geocoding.state + ", " + geocoding.city +
                                "<br/>" +
                                "Telephone: " + geocoding.phone + "</p>";

                              var infowindow = new google.maps.InfoWindow({
                                  content: information
                              });


                             var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: information,
                                animation: google.maps.Animation.DROP
                             });
                             markerlist.push(marker);

                             //google.maps.event.addListener(marker, 'mouseout', function() {
                             //  infowindow.close();
                             //});

                             google.maps.event.addListener(marker, 'click', function() {
                               infowindow.open(map,marker);
                             });
                        };
                    })(geocoding)
                );
                deferreds.push(deferred);
            };

            $.when.apply($, deferreds).done(showHealthyMarketSearchResults);

        });
        
    };


})(NH.data);
