function nextFormPage () {
	var controlButtons = $('#control-buttons');
	var currentPage = controlButtons.data('current-page');
	var nextPage = 'two';

	if ( currentPage == 'one') {
		nextPage = 'two'
		$('.prevButton', controlButtons).show();
	}
	else if ( currentPage == 'two' ) {
		nextPage = 'three'
	}
	else if ( currentPage == 'three') {
        calculateChildHeight();
        nextPage = 'one';
        $('.prevButton', controlButtons).hide();
	}

	$('#page_'+currentPage).hide();
	$('#page_'+nextPage).show();
	controlButtons.data('current-page', nextPage);

    sendMessage('child-height', document.body.scrollHeight);
}

function previousFormPage () {
	var controlButtons = $('#control-buttons');
	var currentPage = controlButtons.data('current-page');
	var previousPage = 'one';

	if ( currentPage == 'one') {
		return false;
	}
	else if ( currentPage == 'two' ) {
		previousPage = 'one';
		$('.prevButton', controlButtons).hide();
	}
	else if ( currentPage == 'three') {
		previousPage = 'two';
	}

	$('#page_'+currentPage).hide();
	$('#page_'+previousPage).show();
	controlButtons.data('current-page', previousPage);
}

function calculateChildHeight() {
    var sum = ($('[name="momsHeight"]').val() * 1) + ($('[name="dadsHeight"]').val() * 1);

    if( $('#gender').val() == 'male' ) {
        $('#child-intro').text($('#childsName').val() + ' Gutten din ');
        sum += 13;
    }
    else {
        $('#child-intro').text($('#childsName').val() + ' Jenta di ');
        sum -= 13;
    }

    $('.resultPage .genderIcon').addClass($('#gender').val());
    var child_height = sum / 2;
    $('#child-height').text(child_height);

    if( $('#childsName').val() == '' ) {
        $('.nameGuideLink').show();
    }

    $('.form-wrapper').hide();
    $('.resultWrapper').show();
}

$(document).ready(function(){
	$('#control-buttons .nextButton').click(function() {
		nextFormPage();
	});
	$('#control-buttons .prevButton').click(function() {
		previousFormPage();
	});

	$('.genderFemale').click();

	// Height fix
    sendMessage('child-height', document.body.scrollHeight);
});
