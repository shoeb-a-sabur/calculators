function selectGender(gender) {
	var add, remove;
	if (gender == 'female') {
		add = $(".genderOption.genderFemale");
		remove = $(".genderOption.genderMale");
	}
	else {
		add = $(".genderOption.genderMale");
		remove = $(".genderOption.genderFemale");
	}

	add.addClass("selected");
	remove.removeClass("selected");
}

function validate() {
	$("#hips").parent().css("border-color", "");
	$("#waist").parent().css("border-color", "");

	var result = true;

	if ($("#hips").val() == '' || isNaN(parseFloat($("#hips").val().replace(",", ".")))) {
		$("#hips").parent().css("border-color", "red");
		result = false;
	}

	if ($("#waist").val() == '' || isNaN(parseFloat($("#waist").val().replace(",", ".")))) {
		$("#waist").parent().css("border-color", "red");
		result = false;
	}

	$(".error").css("display", result ? "none" : "block");

	return result;
}

function addClickEventListeners () {
	$(".genderOption.genderFemale").click(function() {
		selectGender('female');
	});

	$(".genderOption.genderMale").click(function() {
		selectGender('male');
	});

	$("#hip-waist-ratio-calculator-submit").click(function() {
		if (!validate())
			return;

		var hips = parseFloat($("#hips").val().replace(",", "."));
		var waist = parseFloat($("#waist").val().replace(",", "."));

		var ratio = waist / hips;
		var gender = $(".genderOption.genderFemale").hasClass("selected") ? "female" : "male";

		$('.rdata').hide();
        showResult(ratio, gender);
	});
}

function showResult (ratio, gender) {
	$("#ratio").text(Number(ratio).toFixed(2));

	var threshold = 0;

	if (gender == 'male') {
		threshold = 1;
		$('.genderText').text('Menn');
	}
	else {
		threshold = 0.8;
        $('.genderText').text('Kvinner');
	}

	$("#bound").text(Number(threshold).toFixed(1));
	$("#bound2").text(Number(threshold).toFixed(1));

	if (ratio < threshold) {
		$("#result-paereform").show();
		$("#paereform-explanation").show();
	}
	else {
		$("#result-epleform").show();
		$("#epleform-explanation").show();
	}

	$('.title.result').show();
    $('.resultWrapper').show();
}
