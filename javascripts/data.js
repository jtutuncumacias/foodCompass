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

    var yelpCategories = [];

    var Restaurants = [];

    data.setCategory = function(category){
      yelpCategories = [];
      yelpCategories.push(category);      

    }
    
    var showRestaurantSearchResults = function(){


      var results = $("#searchResults");

      var newHtml = "";

      for(var i = 0; i < Restaurants.length; i++){

        newHtml = newHtml + '<a href = "' + Restaurants[i]["url"] + '"> ' + Restaurants[i]["name"] + "</a>";        

      }
      results.html(newHtml);
    };

    data.getYelpDataForLocation = function (t_lat, b_lat, t_lon, b_lon) {
        var categoryFilter = '&category=' + yelpCategories.join(',');
        var thisApiCall = apiUrl + categoryFilter;
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

    data.getRestaurants = function (t_lat, b_lat, t_lon, b_lon) {
        var deferreds = [];
        Restaurants = [];

        var content = data.getYelpDataForLocation(t_lat, b_lat, t_lon, b_lon);
        content.done(function (response) {
                // get data out of response

            var collectHealthyMarket = function(data) {};

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
                            Restaurants.push(geocoding);

                             var myLatlng = new google.maps.LatLng(geocoding.location.lat, geocoding.location.lng);
                             var map = googleMap;

                             var information = "<p>" +
                                "<b><a href='" + geocoding.url + "'>" + geocoding.name + "</a></b><br/>" +
                                geocoding.address1 + " " + geocoding.state + ", " + geocoding.city +
                                "<br/>" +
                                "Telephone: " + geocoding.phone + "<br/>" + 
                                "<b><a href=''>Redirect Route</a></b>"
                                "</p>";

                              var infowindow = new google.maps.InfoWindow({
                                  content: information
                              });

                              var iconBase = 'images/';
                             var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                icon: iconBase + 'FCpin.png',
                                //title: information,
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
            $.when.apply($, deferreds).done(showRestaurantSearchResults);
        });  
    };
})(NH.data);