(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e){function t(e,t){e.styleSheet.cssText=t.replace(/:checked/g,"."+o)}function n(t){t.checked&&c(t),e(t).on("propertychange._polychecked",function(e){"checked"===e.originalEvent.propertyName&&c(this)}).data(h,1)}function c(t){e(t).toggleClass(o,t.checked).parent().addClass(i).removeClass(i)}function a(){for(var t=0;t<s.length;t++){var c=s[t];"checkbox"!==c.type&&"radio"!==c.type||e.data(c,h)||n(c)}}var o="poly-checked",i="poly-just-changed",h="isPolyChecked",s=document.getElementsByTagName("input");e("style").each(function(){t(this,this.innerHTML)}),e("link[rel=stylesheet]").each(function(){var n=this;e.get(this.href,function(e){t(n,e)})}),e(function(){a(),setInterval(a,200)})}(jQuery);
},{}]},{},[1]);