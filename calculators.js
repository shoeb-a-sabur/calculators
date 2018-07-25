function getScriptParams() {
    var scripts = document.getElementsByTagName('script');
    var lastScript = scripts[scripts.length-1];
    var scriptName = lastScript;
    var url = scriptName.getAttribute('src').replace(/[^/]*$/, '');

    return {
        calculator : scriptName.getAttribute('data-calculator'),
        attach_to : (scriptName.getAttribute('data-attach-to') != null) ? scriptName.getAttribute('data-attach-to') : 'calculator-root',
        url : url,
    };
}

function addCalculator(passed_data) {
    var container_calc = document.getElementById(passed_data.attach_to);
    var file_src = passed_data.url + passed_data.calculator + '/index.html';
    var holder = document.createElement('iframe');
    holder.src = file_src;
    holder.style.width = '100%';
    holder.style.border = '0';

    var added_iframe = container_calc.appendChild(holder);

    window.addEventListener("message", function(event) {
        if( passed_data.calculator == event.data.calculator ) {
            added_iframe.style.height = (event.data.height + 30) + 'px';
        }
    }, false);
}

{
    let script_data = getScriptParams();
    document.addEventListener('DOMContentLoaded', function() {addCalculator(script_data);}, false);
}


