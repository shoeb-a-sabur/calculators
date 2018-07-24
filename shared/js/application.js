/**
 * Created by Øyvind on 22.08.2014.
 */
$.fn.scrollTo = function( target, options, callback ){
	if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
	var settings = $.extend({
		scrollTarget  : target,
		offsetTop     : 50,
		duration      : 500,
		easing        : 'swing'
	}, options);
	return this.each(function(){
		var scrollPane = $(this);
		var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
		var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
		scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
			if (typeof callback == 'function') { callback.call(this); }
		});
	});
}

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
	$('#gender').val(gender);
}

function addClickEventListeners () {
	$(".genderOption.genderFemale").click(function() {
		selectGender('female');
	});

	$(".genderOption.genderMale").click(function() {
		selectGender('male');
	});
	$('#scroll-to-body').click(function(e){
		$('body').scrollTo('.bodyField:first');
		e.preventDefault();
		return false;
	});
}

$(document).ready(function(){
	addClickEventListeners();
});
