var NH = NH || {};
NH.data = NH.data || {};

(function(data){

	var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg&category=healthmarkets&location=";

	data.getHealthyMarkets = function(locationName){

		var deferred = $.Deferred();

		$.ajax({

			type: "GET",
			url: apiUrl + locationName,
			dataType: "jsonp",
			success: function(response){
				deferred.resolveWith(response);
			}
		});

		return deferred.promise();
	};

	$(function(){

		$(".search-NYC-test").click(function(){

			var def = NH.data.getHealthyMarkets("NYC");

			

			def.done(function(response){
				// get data out of response
			});

		});

	});

})(NH.data);