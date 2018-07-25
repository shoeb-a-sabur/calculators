var teeCalculator = (function ($) {
    var advancedPalValues = [
        { description: 'Juleøl, sterkøl', value: 0.6 },
        { description: 'Øl, pils', value: 0.36 },
        { description: 'Lettøl', value: 0.2 },
        { description: 'Rødvin, hvitvin (svakvin)', value: 0.91 },
        { description: 'Hetvin (sterkvin)', value: 1.46 },
        { description: 'Likør', value: 2.5 },
        { description: 'Brennevin; gin, vodka, whisky', value: 3.5 }
    ];

    var units = [4, 7.5, 12, 33, 50, 75, 100];
    var defaults = [3, 4, 3, 2, 1, 0, 0];

    var initializeAvancedCalculator = function () {

	    $.each(advancedPalValues, function (index, item) {
		    var html = $('#alcoholUnitBase').clone();
		    $(html).attr('id', '');
		    $(html).find('label:first').html(item.description);
		    $(html).find('input[type=text]:first').attr('name', 'advancedActivityNumber_' + index);
		    var select = $(html).find('select:first');
		    $(select).attr('name', 'advancedActivityUnit_' + index);
		    for ( var i = 0; i < units.length; i++ ) {
			    var option = '<option value="' + units[i] + '" ' + (i == defaults[index] ? 'selected' : '') + '>' + units[i] + ' cl</option>';
			    $(select).append(option);
		    }
		    $(html).find('input[type=hidden]:first').attr('name', 'advancedActivityIndex_' + index);
		    $(html).find('input[type=hidden]:first').attr('value', item.value);
		    $('#alcoholUnits').append(html);
		    $(html).removeClass('hidden');
	    });
	    $('#alcoholUnitBase').remove();
    }

    var get = function(item){
        return item.val();
    }

    var getNum = function(item){
        return parseFloat(item.val().replace(/,/, '.'));
    }

    var validate = function(item){
        if (isNaN(getNum(item))) {
            item.parent().addClass('invalid');
            return true;
        } else
            item.parent().removeClass('invalid');
        return;
    }

    var validateAdvancedCalculator = function () {
        var hasError = false;
        hasError = validate($('[name=weight]')) || hasError;
        hasError = validate($('[name=time]')) || hasError;

        var hasValues = false;
        $('#alcoholUnits input:visible').each(function () {
            if ($(this).val() != '') {
                var hour = parseFloat($(this).val().replace(/,/, '.'));

                if (isNaN(hour)) {
                    hasError = true;
                    $(this).addClass('invalid');
                }
                hasValues = true;
            }
        });
        if(!hasValues){
            $('#advanced-form input:visible').addClass("invalid");
            hasError = true;
        }

        return hasError;
    }

    var calculate = function () {
        $(".resultBox.bad").addClass('hide');
        $(".resultBox.good").addClass('hide');
        $(".title.result").removeClass('hide');
        
        var weight = getNum($('[name=weight]'));
        var time = getNum($('[name=time]'));
        var genderIndex = 0.6;

        var vol = 0;
        $("[name^=advancedActivityNumber_]").each(function () {
            var number = parseFloat($(this).val().replace(/,/, '.'));
            if( !isNaN(number) ) {
                var index = advancedPalValues[$(this).attr("name").split("_")[1]].value;
                var unit = $("[name^='advancedActivityUnit_" + $(this).attr("name").split("_")[1] + "']").val();
                vol += ((number * unit) * index);
            }
        });

        var result = (vol / (weight * genderIndex)) - (0.15 * time);
        if(result < 0) result = 0;

        var resultContainer;
        if(result > 0.2){
            resultContainer = $(".resultBox.bad");
        }else {
            resultContainer = $(".resultBox.good");
        }
        resultContainer.find(".result").text(result.toFixed(2).toString().replace('.', ','));
        resultContainer.removeClass("hide");
    }

    return {
        initCalculator: function(){
	        initializeAvancedCalculator();

            $('#js-calculate-advanced-result').on('click', function (e) {
                e.preventDefault();
                if (!validateAdvancedCalculator()) {
                    $("[name=type]").val("advanced");
                    //$("form#calculate").submit();
                    calculate();
                }
            });
        },
        calculate: function(){
            calculate();
        }
    }
} (jQuery));

jQuery(document).ready(function() {
    // Height fix
    sendMessage('breastfeed-intoxication', document.body.scrollHeight);
});
