var NH = NH || {};
NH.data = NH.data || {};

(function(data){

	var apiUrl = "http://api.yelp.com/business_review_search?ywsid=DcNSRt7CdNB57H2UJ3kpHg&category=healthmarkets&location=";

	data.getHealthyMarkets = function(locationName){

		$.ajax({

			type: "GET",
			url: apiUrl + locationName,
			dataType: "jsonp",
			success: function(response){
				alert("success: " + response);
			},
			error: function(){
				alert("something went wrong!");
			}

		});

	};

})(NH.data);