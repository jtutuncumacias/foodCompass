var switchInputs = function() {
	var start = $(".start").val();
	var end = $(".end").val();
	$(".start").val(end);
	$(".end").val(start);
};

$("#switchInputsButton").click(switchInputs);