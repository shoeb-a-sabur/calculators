function validate() {
	//$("#height").parent().css("border-color", "");
	var result = true;
	if ($("#height").val() == '' || isNaN(parseFloat($("#height").val().replace(",", ".")))) {
		$("#height").parent().css("border-color", "red");
		result = false;
	}
	$(".error").css("display", result ? "none" : "block");
	return result;
}

function setSubmitEventListener () {
	$("#ideal-weight-calculator-submit").click(function() {
		if (!validate())
			return;

		var height = parseFloat($("#height").val().replace(",", ".")) / 100;

		var lowerResult = 18.5 * height * height;
		var upperResult = 24.9 * height * height;
		var idealResult = (lowerResult + upperResult) / 2;

		showResult(idealResult, lowerResult, upperResult);
	});
}

function showResult (result, lower, upper) {
	$("#result-kg").text(Number(result).toFixed(1));
	$("#lower-result").text(Number(lower).toFixed(1));
	$("#upper-result").text(Number(upper).toFixed(1));
	$('.applicationWrapper .resultWrapper').show();
    // Height fix
    sendMessage('ideal-weight', document.body.scrollHeight);
}

$(document).ready(function() {
    // Height fix
    sendMessage('ideal-weight', document.body.scrollHeight);
});

