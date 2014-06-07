var NH = NH || {};
NH.data = NH.data || {};

(function(data){

	var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg&category=healthmarkets&location=";

	data.getYelpDataForLocation = function(locationName){
		//var deferred = $.Deferred();
		return $.ajax({

			type: "GET",
			url: apiUrl + locationName,
			dataType: "jsonp"
		});
		//return deferred.promise();
	};

	data.getHealthyMarkets = function(locationName){

		var data = getYelpDataForLocation(locationName);

		var healthyMarkets = [];

		data.done(function(response){
			// get data out of response

			var blah = response;

			for (var i = 0; i < response.businesses.length;){
				healthyMarkets = response.businesses;
			}


		});

	};

	$(function(){

		$(".search-NYC-test").click(function(){

			var def = NH.data.getHealthyMarkets("NYC");



			
			def.done(function(response){
				// get data out of response

				var blah = response;


			});

		});

	});

})(NH.data);