/* || static/js/core/admin.js || */
$(document).ready(function(){	
	// Tabs
	$("ul.tabs li").click(function() {
		return showTab($(this).find("a").attr("href"));
	});
	
	if (typeof defaultOpenTab == 'undefined'){
		$(".tab_content").hide();
		$("ul.tabs li:first-child").addClass("active").show();
		$(".block").find(".tab_content:first").show();
	} else {
		showTab(defaultOpenTab);
	}

	// Sidebar Tabs
	$("ul.composite li").click(function() {
		return showSidebarTab($(this).find("a").attr("href"));
	});
	
	if (typeof defaultOpenTab == 'undefined'){
		$(".side_content").hide();
		$("ul.composite li:first-child").addClass("active").show();
		$(".block").find(".side_content:first").show();
	} else {
		showSidebarTab(defaultOpenTab);
	}

	// Block search
	$('.block .block_head form .text').bind('click', function() { $(this).attr('value', ''); });
	
	// Messages
	$('.message').hide().append('<span class="close" title="Dismiss"></span>').fadeIn('slow');
	$('.message .close').hover(
		function() { $(this).addClass('hover'); },
		function() { $(this).removeClass('hover'); }
	);
		
	$('.message .close').click(function() {
		$(this).parent().fadeOut('slow', function() { $(this).remove(); });
	});
	
	// IE6 PNG fix
	//$(document).pngFix();
	
	if (typeof jQuery.ui != undefined){
		
		
	}
	
	// associate any confirm links with a confirm dialog
	$('.confirm-link').click(function(){
		var callback = $(this).attr('callback');
		if (callback == undefined || callback == ""){
			callback = "go";
		}
		showConfirmDialog($(this).attr('confirm-msg'),eval(callback),$(this).attr('link'));
		return false;
	});
	
	$('.input-link').click(function(){
		var callback = $(this).attr('callback');
		if (callback == undefined || callback == ""){
			callback = "go";
		}
		showInputDialog($(this).attr('input-msg'),eval(callback),$(this).attr('link'));
		return false;
	});

	if( $(".home-testimonial-list").length == 1 ){
		$('.user-logged-out .home-testimonial-list').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			dots: true,
			arrows: false,
			responsive: [
			{
			breakpoint: 769,
			settings: {
				dots: true,
				arrows: false,
			}
			}
		]
		});
	}
    
	if( $(".home-services-slider").length == 1 ){
    	$('.user-logged-out .home-services-slider').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: false,
			dots: true,
			arrows: false,
			responsive: [
				{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: true,
				arrows: false,
			}
			},
			{
			breakpoint: 769,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: false,
			}
			}
		]
		});
	}
	if( $(".home-testimonial-slider").length == 1 ){
		$('.user-logged-out .home-testimonial-slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			dots: true,
			arrows: false,
			responsive: [
			{
			breakpoint: 1023,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
			},
			{
			breakpoint: 941,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
			}
		]
		});
	}
	 // Function to adjust the right position of the toggle-password icon
	 function adjustToggleIconPosition() {
        $(".password-container").each(function() {
            let containerWidth = $(this).outerWidth(); // Width of the password container
            let inputWidth = $(this).find(".passwordField").outerWidth(); // Width of the input field
            
            // Calculate the difference and add 10px padding
            let rightPosition = (containerWidth - inputWidth) + 10;
            
            // Adjust the position of the eye icon based on the calculation
            $(this).find(".toggle-password").css({
                'right': rightPosition + 'px'
            });
        });
    }

    // Call the function when the page loads
    adjustToggleIconPosition();

    // Call the function whenever the window is resized
    $(window).resize(function() {
        adjustToggleIconPosition();
    });

    // Toggle password visibility on click
    $(".toggle-password").click(function() {
        let input = $(this).siblings(".passwordField"); // Target the password input
        if (input.attr("type") === "password") {
            input.attr("type", "text");
            $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            input.attr("type", "password");
            $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });
	if( $(".with-nav").length == 1 ){
        var nav = $('.with-nav');
        var navTop = nav.offset().top;
    
        $(window).scroll(function() {
            if ($(window).scrollTop() > navTop) {
                nav.addClass('is-stuck');
            } else {
                nav.removeClass('is-stuck');
            }
        });
     }
	 if ($('.new-blog-page-type').length) {

		if ($(".featured-articles-slider li").length > 0) {
			$(".featured-articles-slider").bxSlider({
				auto:false,
				minSlides: 1,
				maxSlides: 1,
				moveSlides:1,
				infiniteLoop: false,
				pager:false,
				controls: true,
				touchEnabled:false,
				hideControlOnEnd:true,
				adaptiveHeight: true,
				wrapperClass: 'bx-wrapper featured-articles-slider-wrapper margin-0 padding-0'
			});
		}
		else {
			$(".featured-articles-section").hide();
		}

		 // Get the current URL path
		 const currentPath = window.location.pathname;

		 let isAnyFilterActive = false; // Track if any filter is active
 
		 // Loop through each filter link
		 $('.articles-filter-container ul li a').each(function () {
			const filterPath = $(this).attr('href'); // Get href of the filter link
		
			// Check if the href matches the current path
			if (filterPath === currentPath) {
				// Add 'active' class to the parent <li>
				$(this).parent().addClass('active');
				// Add 'button' class to the <a> element
				$(this).addClass('button');
				isAnyFilterActive = true; // Mark a filter as active
			} else {
				// Remove 'active' class if not matching
				$(this).parent().removeClass('active');
				// Remove 'button' class from the <a> element
				$(this).removeClass('button');
			}
		}); 
 
		 // If no filters are active, set "All" as active
		 if (!isAnyFilterActive) {
			 $('.articles-filter-container ul li a.all-blogs').parent().addClass('active');
			 $('.articles-filter-container ul li a.all-blogs').addClass('button');
		 }
	}
});



// var onloadCallback = function() {
// 	captchaTester = grecaptcha.render('wwcaptcha', {
// 		'sitekey' : PS.recaptchaSiteKey,
// 	});
// };

function go(link){
	window.location = link;
}

function showSuccessDialog(msg){
	$("#dialog-success").dialog({
        modal: true,
        bgiframe: true,
        autoOpen: false });
	$("#dialog-success p").html(msg);
	$('#dialog-success').dialog('option', 'buttons', { 
	    "Ok": function() { $(this).dialog("close"); }
	});
	$('#dialog-success').dialog('open');
}

function showWarningDialog(msg){
	showMessage("ps-warning",msg);
}

function showConfirmDialog(msg,callback,data){
	alertify.set({ 
		labels	: {
			ok 		: 'Yes',
			cancel 	: 'No'
		}
	});
	alertify.set({buttonFocus: "none"});
	alertify.set({ buttonReverse: true });
	alertify.confirm(msg, function (r) {
    if (r) {
       callback.call(data,data);
    } 
	});
}

function showInputDialog(msg,callback,data){
	alertify.set({buttonFocus: "none"});
	alertify.set({ buttonReverse: true });
	alertify.prompt(msg, function (e, str) {
    // str is the input text
    if (e) {
			var dataarr =[];
			dataarr[1] = data;
			dataarr[2] = str;
			callback.call(data,dataarr);
    } 
	}, "");
}

function showSuccessMsg(msg){
	alertify.alert(msg);
}

function showErrorMsg(msg){
	alertify.alert("Error: " + msg);
}

function showLoadingAnim(){
	$(".follow").show();
	$("body").mousemove(function(e){
	      $('.follow').css('top', (e.pageY+10)).css('left', (e.pageX+10));
	});
}

function hideLoadingAnim(){
	$(".follow").hide();
	$("body").unbind('mousemove');
}

function showSidebarTab(linkId){
	var link = $('a[href='+linkId+']');
	var tab = $(link).parent();
	$(tab).parent().find('li').removeClass("active");
	$(tab).addClass("active");
	$(tab).parents('.block').find(".side_content").hide();

	var activeTab = $(tab).find("a").attr("href");
	$(activeTab).show();
	return false;
}

function showTab(linkId){
	var link = $('a[href='+linkId+']');
	var tab = $(link).parent();
	$(tab).parent().find('li').removeClass("active");
	$(tab).addClass("active");
	$(tab).parents('.block').find(".tab_content").hide();

	var activeTab = $(tab).find("a").attr("href");
	$(activeTab).show();
	return false;
}

/* || static/js/core/apprise-1.5.full.js || */

/* || static/js/core/common.js || */

function showClientMessage(){
	var facadeUrl = "/api/ajaxfacade.cfc?jsoncallback=?";
	$.getJSON(facadeUrl,
	{
			method: "getClientMessage",
			_cf_nodebug: "true"
	},
	function(data) {
			if (data.MESSAGE.length > 0 && data.CLASSSTRING.length > 0){
				showMessage(data.CLASSSTRING,data.MESSAGE);
			}
	});
}

var timer = null;
var pointer=0;
var smShow = function() {
	$('#status-msg').show();
}

var smFadeOut = function(){
 $('#status-msg').fadeOut();
}

var smFadeIn = function(){
    $('#status-msg').fadeIn();
}

var showMessage = function(classname,text) {
	clearTimeout(timer);
	$('#status-msg').find('div.style').removeClass().addClass('ps-' + String(classname) + ' style');
	$('#msg-container').find('div').html(text);
	smShow();
	timer = setTimeout(smFadeOut,'8000');	
}

function lib_bwcheck(){ //Browsercheck (needed)
 	var appVer = navigator.appVersion.toLowerCase();
	
	this.ver=navigator.appVersion;
	this.agent=navigator.userAgent;
	this.dom=document.getElementById?1:0;
	// *** BROWSER VERSION ***

	this.is_minor = parseFloat(appVer);
	this.is_major = parseInt(is_minor);

	// Note: On IE, start of appVersion return 3 or 4
	// which supposedly is the version of Netscape it is compatible with.
	// So we look for the real version further on in the string

	var iePos  = appVer.indexOf('msie');
	if (iePos !=-1) {
	   this.is_minor = parseFloat(appVer.substring(iePos+5,appVer.indexOf(';',iePos)));
	   this.is_major = parseInt(is_minor);
	}
	this.opera5=(navigator.userAgent.indexOf("Opera")>-1 && document.getElementById)?1:0;
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0; 
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
	this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
	this.ie=this.ie4||this.ie5||this.ie6;
	this.mac=this.agent.indexOf("Mac")>-1;
	this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5);
	return this
}
var bw=lib_bwcheck.call(window);
window.onerror=null; // Generic Error Trapping
function openWin(url,width,height) {
  options = "menubar=no,scrollbars=no,resizable=yes,width=" + width + ",height=" + height;
  var newWindow = window.open(url, "ClientWindow", options);
}

function openImageWin(url,width,height) {
  options = "menubar=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height;
  var newWindow = window.open(url, "ClientWindow", options);
}

function openHelpWin(url) {
  options = "menubar=no,scrollbars=yes,resizable=yes,width=300,height=300";
  var newWindow = window.open(url, "HelpWindow", options);
}

function openLink(url) {
  var newWindow = window.open(url, "none");
}

function confirmAction(msg,url,name,value){
	var currUrl = "";
	var dt = new Date();
	// Added a random counter to prevent browser caching the delete link.
	var ms = dt.getMilliseconds();
  if(confirm(msg)){
		if (bw.ie5 == true && bw.is_minor < 5.5)
			currUrl = url + "&" + name + "=" + escape(value);
		else
			currUrl = url + "&" + name + "=" + value;
		location.href=currUrl + "&ord=" + ms;
  }
}

// Function to find the index in an array of the first entry 
// with a specific value.
// It is used to get the index of a column in the column list.
if(typeof(Array.prototype.findIdx) !== 'function') {
	Array.prototype.findIdx = function(value){
		for (var i=0; i < this.length; i++) {
			if (this[i] == value) {
				return i;
			}
		}
	}
}

//Simple JavaScript Templating
//John Resig - http://ejohn.org/ - MIT Licensed
(function(){
	var cache = {};
	
	this.tmpl = function tmpl(str, data){
	 // Figure out if we're getting a template, or if we need to
	 // load the template - and be sure to cache the result.
	 var fn = !/\W/.test(str) ?
	   cache[str] = cache[str] ||
	     tmpl(document.getElementById(str).innerHTML) :
	   
	   // Generate a reusable function that will serve as a template
	   // generator (and which will be cached).
	   new Function("obj",
	     "var p=[],print=function(){p.push.apply(p,arguments);};" +
	     
	     // Introduce the data as local variables using with(){}
	     "with(obj){p.push('" +
	     
	     // Convert the template into pure JavaScript
	     str
	       .replace(/[\r\t\n]/g, " ")
	       .split("<%").join("\t")
	       .replace(/((^|%>)[^\t]*)'/g, "$1\r")
	       .replace(/\t=(.*?)%>/g, "',$1,'")
	       .split("\t").join("');")
	       .split("%>").join("p.push('")
	       .split("\r").join("\\'")
	   + "');}return p.join('');");
	 
	 // Provide some basic currying to the user
	 return data ? fn( data ) : fn;
	};
}).call(window);

function truncateVal(val){
	var dec = 2;
	var result = Math.round(val*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function handleize(val){
	var invalidCharsPattern = /[^A-Za-z0-9 -]/g;
	var multipleDashPattern = /-+/g;
	var spacePattern = / /g;
	
	var ret = val.replace(invalidCharsPattern, "-").toLowerCase();
	ret = ret.replace(spacePattern, "-");
	ret = ret.replace(multipleDashPattern, "-");
	return ret;
}

focus();

/* || static/js/core/common-themes.js || */
// PowerStores front-end JavaScript
// This file contains the PSJS plugins container
// and a few default plugins. 

;(function($, window, document, undefined){ 
	// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
	'use strict';
	
	// Shimming filter(), if not supported
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun /*, thisp */){
			"use strict";
			
			if (this == null) {
				throw new TypeError();
			}
			
			var t = Object(this), len = t.length >>> 0;
			if (typeof fun !== "function") {
				return;
			}
			
			var res = [], thisp = arguments[1];
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i]; // in case fun mutates this
					if (fun && fun.call(thisp, val, i, t)) {
						res.push(val);
					}
				}
			}
			
			return res;
		}
	}
	
	// Shim bind(), if not supported
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis){
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
			
			var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function(){
			}, fBound = function(){
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
			};
			
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			
			return fBound;
		};
	}
	
	// Shim .indexOf(), if not supported
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(searchElement /*, fromIndex */){
			"use strict";
			if (this == null) {
				throw new TypeError();
			}
			var t = Object(this);
			var len = t.length >>> 0;
			if (len === 0) {
				return -1;
			}
			var n = 0;
			if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) { // shortcut for verifying if it's NaN
					n = 0;
				}
				else 
					if (n != 0 && n != Infinity && n != -Infinity) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
					}
			}
			if (n >= len) {
				return -1;
			}
			var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
			for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
					return k;
				}
			}
			return -1;
		}
	}
	
	// Shim Object.create() (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill)
	if (typeof Object.create != 'function') {
		Object.create = (function() {
			var Temp = function() {};
			return function (prototype) {
				if (arguments.length > 1) {
					throw Error('Second argument not supported');
				}
				if(prototype !== Object(prototype) && prototype !== null) {
					throw TypeError('Argument must be an object or null');
				}
				if (prototype === null) { 
					throw Error('null [[Prototype]] not supported');
				}
				Temp.prototype = prototype;
				var result = new Temp();
				Temp.prototype = null;
				return result;		
			};
		})();
	}
	
	// Store reference to global namespace
	// Declare PS namespace if not already defined
	if (typeof(window.PS) === 'undefined') {
		window.PS = {};
		var PS = window.PS;
	} else {
		var PS = window.PS;
	}
	
	// Meta
	PS.name = "PowerStoresJS", PS.version = "0.0.1";
	
	PS.cache = {};
	
	PS.init = function(scope, libraries, method, options, response, nc) {
		var library_arr, args = [scope, method, options, response],
		responses = [],
		nc = nc || false;
		
		if (nc) {
			this.nc = nc;
		}
		
		// check rtl
		this.rtl = /rtl/i.test($('html').attr('dir'));
		
		// Set global scope (PS)
		this.scope = scope || this.scope;
		
		if(libraries && (typeof(libraries) === 'string')) {
			library_arr = libraries.split(' ');
			
			if(library_arr.length > 0) {
				for (var i = library_arr.length - 1; i >= 0; i--) {
					responses.push(this.init_lib(library_arr[i], args))
				}
			}
		}
		
		// If first element is callback, add to args
		if (typeof(libraries) === 'function') {
			args.unshift(libraries);
		}
		
		return this.response_obj(responses, args);
	}
	
	PS.response_obj = function(response_arr, args) {
		var len = args.length;
		for(var i = 0; i < len; i++) {
			if (typeof(args[i]) === 'function') {
				return args[i]({
					errors: response_arr.filter(function(s){
						if (typeof(s) === 'string') 
							return s;
					})
				});
			}
		}
		
		return response_arr;
	};

	PS.docReady = function(fn) {
		var stateCheck = setInterval(function () {
			if (document.readyState !== "complete") return;
			clearInterval(stateCheck);
			try { fn() } catch (e) { }
		}, 1);
	};
	
	// Inherit: Use to inherit methods in plugins
	PS.inherit = function(scope, methods) {
		var methods_arr = methods.split(' ');
		
		for(var i = methods_arr.length - 1; i >= 0; i--) {
			if(this.lib_methods.hasOwnProperty(methods_arr[i])) {
				this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
			}
		}	
	}
	
	// Initialize the plugins
	PS.init_lib = function(lib, args)  {
		return this.trap(function(){
				if(this.libs.hasOwnProperty(lib)) {
					this.patch(this.libs[lib]);
					return this.libs[lib].init.apply(this.libs[lib], args);
				} else {
					return function(){};
				}
			}.bind(this),lib);
	};
	
	// Trap errors in libs
	PS.trap = function(fun, lib) {
		if(!this.nc) {
			try {
				return fun();
			} catch (e) {
				return this.error({
					name: lib,
					message: 'could not be initialized',
					more: e.name + ' ' + e.message
				});
			}
		}
		
		return(fun);
	};
	
	PS.patch = function(lib){
		lib.scope = this.scope;
		lib.rtl = this.rtl;
	};
	
	// Placeholder for actual plugins
	PS.libs = {};
	
	// Error handler
	PS.error = function(error){
		return error.name + ' ' + error.message + '; ' + error.more;
	}
	
	// Generic delay function
	PS.delay = (function() {
		var timer = 0;
		return function(fun, delay){
			clearTimeout(timer);
			timer = setTimeout(fun, delay);
		};
	})();
	
	// Random string generator
	PS.random_str = function(length){
		var chars = '0123456789ABCEDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
		
		if (!length) {
			length.Math.floor(Math.random() * chars.length);
		}
		
		var str = '';
		for(var i = 0; i < length; i++) {
			str += chars[Math.floor(Math.random()  * chars.length)];
		}
		
		return str;
	}

	// Check whether object is function or not
	PS.is_function = function(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	};
	
	// methods that can be inherited in libraries
	PS.lib_methods =  {
		set_data: function(node, data) {
			var id = [this.name, +new Date(), PS.random_str(5)].join('-');
			// cache data for easy retrieval later
			PS.cache[id] = data;
			node.attr('data-' + this.name + '-id', id);
			return data;
		},
		
		// Returns data associated with a node
		get_data: function(node){
			// return the cached data
			return PS.cache[node.attr('data-' + this.name + '-id')];
		},
		
		remove_data: function(node) {
			if(node) {
				delete PS.cache[node.attr('data-' + this.name + '-id')];
				node.attr('data-' + this.name + '-id', '');
			} else {
				// Node isn't valid (select manually)
				$('[data-' + this.name + '-id').each(function(){
					delete PS.cache[$(this).attr('data-' + this.name + '-id')];
					$(this).attr('data-' + this.name + '-id', '');
				});
			}
		},
		
		// Parse any options passed in via data attributes
		data_options: function(el) {
			var opts = {}, ii, p,
				opts_arr = (el.attr('data-options') || ':').split(';'),
				opts_len = opts_arr.length;
				
			function isNumber(o) {
				return ! isNaN(o-0) && o !== null && o !== '' && o !== false && o !== true;
			}
			
			function trim(str) {
				if(typeof(str) === 'string') return $.trim(str);
				return str;
			}
			
			// Parse options
			for(ii = opts_len - 1; ii >= 0; ii--) {
				p = opts_arr[ii].split(':');
				
				if(/true/i.test(p[1])) p[1] = true;
				if(/false/i.test(p[1])) p[1] = false;
				if(isNumber(p[1])) p[1] = parseInt(p[1],10);
				
				if(p.length === 2 && p[0].length > 0) {
					opts[trim(p[0])] = trim(p[1]);
				}
			}
			
			return opts;
		},
		
		// The simpler template parser from Krasimir Tsonev
		// http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
		parse_template: function(html, options) {
			var re = /<%(.+?)%>/g, 
				reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g, 
				code = 'with(obj) { var r=[];\n', 
				cursor = 0, 
				result,
			  match;
			var add = function(line, js) {
				js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') : 
					(code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
				return add;
			}
			while(match = re.exec(html)) {
				add(html.slice(cursor, match.index))(match[1], true);
				cursor = match.index + match[0].length;
			}
			add(html.substr(cursor, html.length - cursor));
			code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
			try { result = new Function('obj', code).apply(options, [options]); }
			catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
			return result;
		},
		
		// Format currency numeral into nicer string
		format_currency: function(nStr) {
			nStr += '';
			var x = nStr.split('.');
			var x1 = x[0];
			var x2 = x.length > 1 ? '.' + x[1] : '';
			if (x2.length == 0) {
				x2 = '.00';
			}
			else 
				if (x2.length == 2) {
					x2 = '.' + x[1] + '0';
				}
				else {
					x2 = '.' + x[1];
				}
			var rgx = /(\d+)(\d{3})/;
			var z = 0;
			var len = String(x1).length;
			var num = parseInt((len / 2) - 1);
			
			while (rgx.test(x1)) {
				if (z > 0) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				else {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
					rgx = /(\d+)(\d{2})/;
				}
				z++;
				num--;
				if (num == 0) {
					break;
				}
			}
			return x1 + x2;
		}
	};
	
	// wrap PS with jQuery
	$.fn.PS = function(){
		var args = Array.prototype.slice.call(arguments, 0);
		
		return this.each(function(){
			PS.init.apply(PS, [this].concat(args));
			return this;
		});
	};
	

})(jQuery, this, this.document);


// Begin built-in plugins

// Utilities
;(function($, window, document, undefined){
	// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
	'use strict';
	
	PS.libs.Utils = {
		// Meta
		name: "Utils", version: "0.0.1",
		
		self: this,
		
		// Default settings
		settings: {
			"currency_symbol": "$",
			"cart_text_full": "<%item_count%>", // Text that should appear in the cart when it has items
			"cart_text_1_item": "<%item_count%>", // Handle pluralization
			"cart_text_empty": "<%item_count%>", // Text that should appear in the cart when it is empty
			"cart_text_container_selector": ".ps-cart-text-container", // Selector of the container in which the cart text would be injected
			"user_greeting_logged_in":"Welcome <%firstname%>", // Text to show in the header when user is logged in
			"user_greeting_logged_out":"<a href='<%login_url%>'>Login</a>&nbsp;|&nbsp;<a href='<%register_url%>'>Register</a>", // Text to show by default in header when the user is not logged in
			"user_greeting_container_selector":".ps-user-greeting-container" // Selector of the container in which the user greeting will be injected
		},
		
		// Initialization
		init: function(scope, method, options) {
			this.scope = scope || this.scope;
			PS.inherit(this, "set_data get_data remove_data data_options parse_template format_currency");
			
			if(typeof(method) === 'object') {
				$.extend(true, this.settings, method);
			} else {
				$.extend(true, this.settings, options);
			}
			
			if(typeof(method) !== 'string') {
				if(!this.settings.init) {
					this.events();
				}
				return this.settings.init;
			} else {
				return this[method].call(this, options);
			}
		},
		
		events: function() {
			// Stub out events for later
			// investigation
			//
			// Namespace events like this
			// <eventname>.psjs.<libname>
			var self = this;
			this.settings.init = true;
		},
		
		// Public methods
		init_cart_display: function(options) {
			var lib = this;
			var settings = lib.settings;
			var cartCount = "";
			var invalidateCache = new Date().getTime();
			
			$.ajax({
				'datatype':"json",
				'url':'/cart.js?' + invalidateCache,
				'success': function(result) {
					var result = JSON.parse(result);
					var cartCount = result.item_count;
					if(cartCount < 1) {
						$(settings.cart_text_container_selector).html(lib.parse_template(settings.cart_text_empty,{
							'item_count':result.item_count,
							'total_price': result.total_price,
							'total_weight' : result.total_weight
						})).fadeIn();
					} else if(cartCount > 1) {
						$(settings.cart_text_container_selector).html(lib.parse_template(settings.cart_text_full,{
							'item_count':result.item_count,
							'total_price': result.total_price,
							'total_weight' : result.total_weight
						})).fadeIn();
					} else {
						$(settings.cart_text_container_selector).html(lib.parse_template(settings.cart_text_1_item,{
							'item_count':result.item_count,
							'total_price': result.total_price,
							'total_weight' : result.total_weight
						})).fadeIn();
					}
				},
				error: function(message) {
					console.error(message);
				}
			});
			
			
		},
		
		init_user_greeting: function(options) {
			var		facadeUrl = "/api/ajaxfacade.cfc",
					lib = this,
					settings = lib.settings,
					loginUrl = '',
					registerUrl = '';
			// Multiple deferred
			$.when(
				$.ajax({
					type:"POST",
					url:facadeUrl,
					data: {
						method:'getLoginUrl',
						_cf_nodebug: "true"
					},
					success: function(result) {
						loginUrl = JSON.parse(result);
					},
					error: function(message) {
						console.error(message);
					}
				}),
				
				$.ajax({
					type:"POST",
					url: facadeUrl,
					data: {
						method: 'getRegistrationUrl',
						_cf_nodebug: "true",
					},
					success: function(result){
						registerUrl = JSON.parse(result);
					},
					error: function(message) {
						console.error(message);
					}
				})
				
			).then(function(){
				doInit();
			});
			
			var doInit = function(){
			
				$.ajax({
					type: "POST",
					url: facadeUrl,
					data: {
						method: "getCurrentUserDetails",
						_cf_nodebug: "true",
					},
					success: function(result){
						var result = JSON.parse(result);
						if (result.ISLOGGEDIN) {
							$(lib.settings.user_greeting_container_selector).html(lib.parse_template(lib.settings.user_greeting_logged_in, {
								'username': result.USERNAME,
								'lastname': result.LASTNAME,
								'firstname': result.FIRSTNAME,
								'login_url': loginUrl,
								'register_url': registerUrl
							}));
						}
						else {
							$(lib.settings.user_greeting_container_selector).html(lib.parse_template(lib.settings.user_greeting_logged_out,{
								'login_url':loginUrl,
								'register_url': registerUrl
							}));
						}
					},
					error: function(result){
						console.error(result);
					}
				});
				
			};
			
		}
		
	};
	
})(jQuery, this, this.document);

// Product page plugin
;(function($, window, document, undefined){
	// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
	'use strict';
	
	PS.libs.Product = {
		
		// Meta
		name: "Product", version: "0.0.1",
		
		self: this,
		
		// Default settings
		settings: {
			init: false,
			variant_selector_container:'.selectors',
			option_1_selector_identifier: '#variation_colours',
			variation_id_selector_identifier: "#variation_id",
			quantity_field_identifier: ".prod-quant",
			currency_symbol: '$',
			product_price_container: '.ps-product-price-container',
			product_compare_price_container: '.ps-product-compare-price-container',
			currency_symbol_prefix: '',
			currency_symbol_suffix: '',
			min_quantity: 1,
			max_quantity: null,
			validate_quantity: true,
			cart_btn_text: "Add to Cart",
			cart_btn_out_of_stock_text: "Out of Stock"
		},
		
		// Cache oft-used DOM elements.
		option_1_selector: null, // used to detect number of
		variation_id_selector: null, // product options at run-time
		quantity_field: null,
		add_to_cart_btn: null,
		product_form: null,
		has_option_2: false,
		
		// Initialization
		init: function(scope, method, options) {
			this.scope = scope || this.scope;
			PS.inherit(this, "set_data get_data remove_data data_options parse_template format_currency");
			
			if(typeof(method) === 'object') {
				$.extend(true, this.settings, method);
			} else if(typeof(options) !== 'undefined') {
				$.extend(true, this.settings, options);
			}
            
            // Reset previously cached elements (useful if plugin is to be initialised multiple times on a page; like in a quickview)
            this.reset_cached_elements();
			
			// Cache DOM elements
			this.cache_elements();
			
			this.add_to_cart_btn.val(this.settings.cart_btn_text);
			
			if(typeof(method) !== 'string') {
				if(!this.settings.init) {
					this.events();
				}
				return this.settings.init;
			} else {
				return this[method].call(this, options);
			}
			
		},
        
		reset_cached_elements: function() {
				this.option_1_selector = null;
				this.variation_id_selector = null;
				this.quantity_field = null;
				this.add_to_cart_btn = null;
				this.product_form = null;
				this.has_option_2 = false;
		},
		
		cache_elements: function() {
			// Check for option selector DOM elements.
			var option_1_selector = $(this.settings.option_1_selector_identifier);
			if(option_1_selector.length > 0) {
				this.option_1_selector = option_1_selector;
				this.has_option_2 = true;
			}
			
			// Check for option selector DOM elements.
			var variation_id_selector = $(this.settings.variation_id_selector_identifier);
			if(variation_id_selector.length > 0) {
				this.variation_id_selector = variation_id_selector;
			}
			
			// Check for the product variant form
			this.product_form = this.variation_id_selector.closest("form");
			
			// Check for the submit button
			this.add_to_cart_btn = this.product_form.find("input[type=submit]");
			
			// Check for quantity selector and cache it.
			var quantity_field = $(this.settings.quantity_field_identifier);
			if(quantity_field.length > 0) {
				this.quantity_field = quantity_field;
			}
		},
		
		
		events: function() {
			
			// Namespace events like this
			// <eventname>.psjs.<libname>
			var self = this; // cache PS as self and use that, because sometimes 'this' won't mean what you would expect it to
			$(self.scope)
			.off('.psjs.product')
			.on('changed-option1.psjs.product', function(e) {
				self.populate_option2_dropdown();
			}).on('update-price.psjs.product', function(e) {
				self.update_price();
			}).on('update-add-to-cart-btn', function(e) {
				var chosenOption = self.variation_id_selector.find("option:selected");
				if((chosenOption.attr('trackinventory') == '1') 
					&& (chosenOption.attr('inventorypolicy') == 'deny')
					&& (chosenOption.attr('stockquantity') < 1)) {
					self.disable_add_to_cart_btn(self.settings.cart_btn_out_of_stock_text);
				} else {
					self.enable_add_to_cart_btn(self.settings.cart_btn_text);
				}
			}).on('changed-option2.psjs.product', function(e) {
				// Since many of our themes are using chosen,
				// trigger the 'chosen:updated' event so those
				// dropdowns can be updated
				$(self.variation_id_selector).trigger("chosen:updated");
				// Finally, trigger the price updation routine
				// and update the cart button
				$(self.scope).trigger('update-price.psjs.product').trigger('update-add-to-cart-btn');
			});
			
			// Trigger the custom event on 
			// change of option_1 if it exists
			if(self.option_1_selector) {
				self.option_1_selector.change(function(){
					$(self.scope).trigger('changed-option1.psjs.product').trigger('update-add-to-cart-btn');
				}).change();
			}
			
			// Trigger the update-price.psjs.product event
			// when variation_id dropdown changes value
			$(self.variation_id_selector).on('change',function(){
				$(self.scope).trigger('update-price.psjs.product').trigger('update-add-to-cart-btn');
			}).change();
			
			this.settings.init = true;
			
		},
		
		populate_option2_dropdown: function() {
			var	productId = $('#productId').val(),
				option_1 = this.option_1_selector.val(),
				facadeUrl = "/api/ajaxfacade.cfc";
				
			var self = this;
			$.ajax({
				type: "POST",
				url: facadeUrl,
				data: {
					method: "getVariationByOption",
					productId: productId,
					option1: option_1,
					_cf_nodebug: "true"
				},
				success: function(res) {
					var res = JSON.parse(res);
					self.variation_id_selector.empty();
					for (var i = 0; i < res.length; i++) {
						$('<option>').attr({
							'value': res[i].VALUE,
							'sellingPrice': res[i].SELLINGPRICE,
							'compareAtPrice': res[i].COMPAREATPRICE,
							'trackInventory': res[i].TRACKINVENTORY,
							'inventoryPolicy': res[i].INVENTORYPOLICY,
							'stockQuantity': res[i].STOCKQUANTITY,
						}).text(res[i].OPTION2).appendTo(self.variation_id_selector);
					}
					
					$(self.scope).trigger('changed-option2.psjs.product');
				},
				error: function(message) {
					console.error(message);
				}
			});
		},
		
		update_price: function() {
			//Updates to the product price display should be through here
			var self = this;
			var currencyPrefix = self.settings.currency_symbol_prefix + self.settings.currency_symbol + self.settings.currency_symbol_suffix;
			var sellingPriceUnformatted = Number(self.variation_id_selector.find("option:selected").attr('sellingPrice'), 10);
			var sellingPrice = self.format_currency(sellingPriceUnformatted);
			var formattedSellingPrice = currencyPrefix + String(sellingPrice);
			var compareAtPriceUnformatted = Number(self.variation_id_selector.find("option:selected").attr('compareAtPrice'), 10);
			var compareAtPrice = self.format_currency(compareAtPriceUnformatted);
			var formattedCompareAtPrice = currencyPrefix + String(compareAtPrice);
			if (sellingPriceUnformatted >= 0) {
				if (compareAtPriceUnformatted > sellingPriceUnformatted) {
					$(self.settings.product_compare_price_container).html(formattedCompareAtPrice);
				}
				else {
					$(self.settings.product_compare_price_container).html('');
				}
				$(self.settings.product_price_container).html(formattedSellingPrice);
			}
		},
		
		disable_add_to_cart_btn: function() {
			if(arguments[0] != undefined) {
				this.add_to_cart_btn.val(arguments[0]).attr('disabled','disabled').addClass('disabled');
			} else {
				this.add_to_cart_btn.attr('disabled','disabled').addClass('disabled');
			}
			
		},
		
		enable_add_to_cart_btn: function() {
			if (arguments[0] != undefined) {
				this.add_to_cart_btn.val(arguments[0]).removeAttr('disabled').removeClass('disabled');
			} else {
				this.add_to_cart_btn.removeAttr('disabled').removeClass('disabled');
			}
		},
		
		validate_quantity: function() {
			// TODO
		}
		
	};
})(jQuery, this, this.document);

/* || static/js/admin-ui/admin.js || */
$(document).ready(function(){
    // $(document).ready() begin
	var facadeUrl = "/api/ajaxfacade.cfc?returnformat=JSON"; 
	showClientMessage();


	$('.admin-logged-in .slider-banner .ps-add-gallery-link').parents('.slider-banner')
		.prepend('<div class="grid-container"><div class="grid-x grid-padding-x grid-padding-y"><div class="cell">To show a slideshow here, please <a href="/?fuseaction=mediagallery.galleries">add a media gallery in the backend</a> and then select it here</div></div></div>');

	$('.admin-logged-in .blog-chooser .ps-add-blog-link').parents('.blog-chooser')
		.prepend('<div class="grid-container"><div class="grid-x grid-padding-x grid-padding-y"><div class="cell">Please <a href="/?fuseaction=blog.list">create a couple of blog posts</a> in the backend to be able to select a preview of them here</div></div></div>');


    PS.AdminUI.openPhotoEditor = function(blob) {
        $(document).PS("PhotoEditor", {
          inkBlob: blob,
          closeOnFirstSave: true,
          callback: function(InkBlob){
            var facadeUrl = "/api/ajaxfacade.cfc";
            $('.ps-admin-progressbar-message').html("Saving the edited file to the server...");
            $('.ps-admin-progressbar-overlay').html("100%").css("width", "100%");
            $('.ps-admin-progressbar-container').show();
            $.ajax({
              type: 'POST',
              url: facadeUrl,
              data: {
                method: 'aviaryupload',
                url: InkBlob.url,
                mimeType: InkBlob.mimetype,
                _cf_nodebug: true
              },
              success: function(result){
                result = JSON.parse(result);
                if (typeof(result.FILENAME) === 'undefined') {
                  throw ('Expected member filename in result not found');
                }
                else {
                  InkBlob.s3Filename = result.FILENAME;
                  //InkBlob.width = result.WIDTH;
                  //InkBlob.height = result.HEIGHT;
                  InkBlob.UUID = result.UUID;
                }
                var link = InkBlob.triggerAttributes.link.value;
                delete InkBlob.triggerAttributes;
                var popupLink = link + '&' + $.param(InkBlob);
                $.magnificPopup.open({
                  mainClass: 'ps-admin-popup',
                  items: {
                    src: popupLink
                  },
                  type: 'iframe',
                  closeOnContentClick: false,
                  closeOnBgClick: false,
                  enableEscapeKey: false
                });
                $('.ps-admin-progressbar-message').html("");
                $('.ps-admin-progressbar-overlay').html("").css("width", "0");
                $('.ps-admin-progressbar-container').hide();
              },
              error: function(message){
                if (typeof(window.trackJs) !== "undefined") {
                  window.trackJs.track(message);
                }
                console.error(message);
              }
            });
          }
        });
    }; // AdminUI.openPhotoEditor
    
    PS.AdminUI.confirmPhotoEdit = function(blob) {
      PS.AdminUI.openEditorPopup(blob);
        // // Look for optional second argument
        // if((typeof(arguments[1]) === "string") && (arguments[1].length != 0)) {
        //     var messageText =  arguments[1] + ".<br /> Do you want to edit the uploaded file in an image editor?";
        // } else {
        //     var messageText = "Do you want to edit the uploaded file in an image editor?";
        // }
        
        // apprise(messageText, {
        //   'verify': true
        // }, function(r){
        //   if (r) {
        //     // User chose to edit the uploaded file; Initialize Aviary
        //     PS.AdminUI.openPhotoEditor(blob);
        //   }
        //   else {
        //     // User chose not to edit; open image popup directly
        //     PS.AdminUI.openEditorPopup(blob);
        //   }
        // });
    }; //  AdminUI.confirmPhotoEdit
    
	PS.AdminUI.openEditorPopup = function(blob) {
	    var facadeUrl = "/api/ajaxfacade.cfc";
	    $('.ps-admin-progressbar-message').html("Saving your file to the server...");
	    $('.ps-admin-progressbar-overlay').html("100%").css("width", "100%");
	    $('.ps-admin-progressbar-container').show();
	    var data = {
	        mimeType: blob.mimetype,
	        _cf_nodebug: true,
	        url: blob.url
	    };

	    switch(blob.mimetype) {
	        case "image/jpeg":
	        case "image/png":
	            data.method = 'aviaryupload';
	            break;
	        default:
	            data.method = 'documentUpload';
	            data.filename = blob.filename;
	            data.clientFilename = data.filename;
	            break;
	    }
	    $.ajax({
	      type: 'POST',
	      url: facadeUrl,
	      data: data,
	      success: function(result){
	        result = JSON.parse(result);
	        if (typeof(result.FILENAME) === 'undefined') {
	          throw ('Expected member filename in result not found');
	        }
	        else {
	          blob.s3Filename = result.FILENAME;
	          blob.UUID = result.UUID;
	        }
	        var link = blob.triggerAttributes.link.value;
	        delete blob.triggerAttributes;
	        var popupLink = link + '&' + $.param(blob);
	        $.magnificPopup.open({
	          mainClass: 'ps-admin-popup',
	          items: {
	            src: popupLink
	          },
	          type: 'iframe',
	          closeOnContentClick: false,
	          closeOnBgClick: false,
	          enableEscapeKey: false
	        });
	        $('.ps-admin-progressbar-message').html("");
	        $('.ps-admin-progressbar-overlay').html("").css("width", "0");
	        $('.ps-admin-progressbar-container').hide();
	      },
	      error: function(message){
	        showMessage("ps-medium ps-error", message.status + ': ' + message.statusText);
	        if (typeof(window.trackJs) !== "undefined") {
	          window.trackJs.track(message);
	        }
	        console.error(message);
	      }
	    });
	}; // AdminUI.openEditorPopup 

	/**
	 * @inputElementId "ID of the input element in the parent frame whose value you wnat to set to the image URL"
	 */
	PS.AdminUI.openImageChooserPopup = function(type, inputElementId) {
		// var src = '/index.cfm?fuseaction=cms.fileTree&editorVersion=4&type=media&id=' + inputElementId + '&elementType=' + type.toLowerCase();
		var src = '/?fuseaction=cms.fileTree&absoluteUrl=false&useCDN=true&type=media&isAdmin=true&isNewsletter=false&editorVersion=4&id=' + inputElementId + '&elementType=' + type.toLowerCase();

		$.magnificPopup.open({
			items: {
			  src: src
			},
			type: 'iframe',
			modal: true,
			mainClass: 'ps-image-chooser-popup',
			showCloseBtn: true,
			closeBtnInside: true,
			enableEscapeKey: true,
			tClose: i18n.cancel,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>'
		  });
	}; // AdminUI.openImageChooserPopup

	PS.AdminUI.openNewsletterImageChooserPopup = function(type, inputElementId) {
		
		var src = '/?fuseaction=cms.fileTree&absoluteUrl=true&useCDN=false&type=media&isAdmin=true&isNewsletter=true&editorVersion=4&id=' + inputElementId + '&elementType=' + type.toLowerCase();

		$.magnificPopup.open({
			items: {
			  src: src
			},
			type: 'iframe',
			modal: true,
			mainClass: 'ps-image-chooser-popup',
			showCloseBtn: true,
			closeBtnInside: true,
			enableEscapeKey: true,
			tClose: i18n.cancel,
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>'
		  });
	}; // AdminUI.openImageChooserPopup
	
	PS.AdminUI.findExtensionFromMimeType = function(mimeType) {
		var result = "";
		switch(mimeType) {
			case "image/gif":
				result = "gif";
				break;
			case "image/jpeg":
				result = "jpg";
				break;
			case "image/png":
				result = "png";
				break;
			case "application/pdf":
				result = "pdf";
				break;
			case "application/excel":
			case "application/x-excel":
			case "application/x-msexcel":
			case "application/vnd.ms-excel":
				result = "xls";
				break;
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				result = "xlsx";
				break;
			case "application/powerpoint":
			case "application/vnd.ms-powerpoint":
				result = "ppt";
				break;
			case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
				result = "pptx";
				break;
			case "application/msword":
				result = "doc";
				break;
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				result = "docx";
				break;
			default:
				result = "";
				break;
		}
		return result;
	}; // AdminUI.findExtensionFromMimeType
	
	PS.AdminUI.findDocIconFromMimeType = function(mimeType) {
		var result = "";
		switch(mimeType) {
			case "application/pdf":
				result = '-36_128x128.png';
				break;
			case "application/excel":
			case "application/x-excel":
			case "application/x-msexcel":
			case "application/vnd.ms-excel":
			case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
				result = '-38_128x128.png';
				break;
			case "application/powerpoint":
			case "application/vnd.ms-powerpoint":
			case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
				result = '-39_128x128.png';
				break;
			case "application/msword":
			case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				result = '-37_128x128.png';
				break;
			default:
				result = '-35_128x128.png';
				break;
		}
		return result;
	}; // AdminUI.findDocIconFromMimeType

	PS.AdminUI.editBlock = function(name,useLocalStorage) {
		PS.AdminUI.hideAllEditorLinks();
		var normalizedName = name.toLowerCase();
		var containerClassName = '.ps-edit-' + normalizedName;
		var filename = normalizedName + '.fluid';
		var blockId = normalizedName;
		var $editLink = $(containerClassName + ' > .ps-edit-block-link');
		var $previewLink = $(containerClassName + ' > .ps-preview-block-link');
		var $saveLink = $(containerClassName + ' > .ps-save-block-link');
		var $cancelLink = $(containerClassName + ' > .ps-cancel-block-link');
		var snippetCategories = [];

		if (useLocalStorage == null){
			useLocalStorage = false;
		}

		if (normalizedName == 'header'){
			snippetCategories = [[121,'Header Blocks']];
			PS.AdminUI.showAllEditorLinks($('.ps-edit-links-container.ps-edit-header'));
			$('.ps-edit-links-container.ps-edit-header').addClass('is-active');
		} else {
			snippetCategories = [[122,'Footer Blocks']];
			PS.AdminUI.showAllEditorLinks($('.ps-edit-links-container.ps-edit-footer'));
			$('.ps-edit-links-container.ps-edit-footer').addClass('is-active');
		}

		if (useLocalStorage){
			var html = PS.AdminUI.getEditorTemp();
			if (html.trim() != ""){
				var containerUniqueId = "#ww-content-" + blockId + " .grid-container";
				$(containerUniqueId).html(html);
				var options = {
					container: containerUniqueId,
					snippetCategories: snippetCategories,
					replaceSnippetWhileAdding: true
				};
				var builder = PS.AdminUI.createContentBuilder(options);	
				setGlobalBuilder(builder);
				// hide the edit link
				$editLink.hide();
				// show the save and preview links
				$previewLink.show();
				$saveLink.show();
				$cancelLink.show();
			} else {
				console.error("nothing to be found in localstorage");
			}
		} else {
			var data = {
				method : 'getBlock',
				filename : filename,
				_cf_nodebug: true
			};
			var builder;
	
			$.ajax({
				url: facadeUrl,
				data: data,
				type:"POST",
				success: function(data) {
					var result = JSON.parse(data);
					var containerUniqueId = "#ww-content-" + blockId + " .grid-container";
					$(containerUniqueId).html(result);
					var options = {
						container: containerUniqueId,
						snippetCategories: snippetCategories,
						replaceSnippetWhileAdding: true
					};
					var builder = PS.AdminUI.createContentBuilder(options);	
					setGlobalBuilder(builder);
					// hide the edit link
					$editLink.hide();
					// show the save and preview links
					$previewLink.show();
					$saveLink.show();
					$cancelLink.show();
				},
				error: function(xhr, status, errorThrown) {
					console.error(status + '' + errorThrown);
				}
			});
		}

		$('body')
			.on('mouseover', '.ps-edit-article-link, .ps-edit-block-link', function(event) {
				if(wwCBuilder == null) {
					if($(this).parent().hasClass('ps-edit-header')) {
						$('#ww-content-header').find(".grid-container").first().addClass("ww-edit-border");
					} else if($(this).parent().hasClass('ps-edit-footer')) {
						$('#ww-content-footer').find(".grid-container").first().addClass("ww-edit-border");
					} else {
						var contentId = $(event.currentTarget).data("content_id");
						$('#ww-content-'+contentId).addClass("ww-edit-border", {duration:500});
					}
				}
			}).on('mouseout', '.ps-edit-article-link, .ps-edit-block-link', function(event) {
				if(wwCBuilder == null) {
					if($(this).parent().hasClass('ps-edit-header')) {
						$('#ww-content-header').find(".grid-container").first().removeClass("ww-edit-border");
					} else if($(this).parent().hasClass('ps-edit-footer')) {
						$('#ww-content-footer').find(".grid-container").first().removeClass("ww-edit-border");
					} else {
						var contentId = $(event.currentTarget).data("content_id");
						$('#ww-content-'+contentId).removeClass("ww-edit-border", {duration:500});
					}
				}
			});
		
	}; // AdminUI.editBlock

	PS.AdminUI.cancelEditBlock = function(name) {
		alertify.set({ 
			labels	: {
				ok 		: 'Yes',
				cancel 	: 'No'
			}
		});
		alertify.set({ buttonReverse: true });
		alertify.confirm('Are you sure you want to cancel editing?', function(response) {
			if(response) {
				window.location.reload();
			}
		});
	}; // AdminUI.cancelEditBlock

	PS.AdminUI.cancelPreview = function(name) {
		var normalizedName = name.toLowerCase();
		if (normalizedName == "header"){
			$('#ww-content-header .grid-container').removeClass('ps-previewing');
		} else {
			$('#ww-content-footer .grid-container').removeClass('ps-previewing');
		}

		PS.AdminUI.editBlock(name,true);
		// var normalizedName = name.toLowerCase();
		// alertify.set({ 
		// 	labels	: {
		// 		ok 		: 'Yes',
		// 		cancel 	: 'No'
		// 	}
		// });
		// alertify.alert('Are you sure you want to cancel the preview?', function(response) {
		// 	if(response) {
		// 		
		// 		PS.AdminUI.editBlock(name,true);
		// 	}
		// });
	}; // AdminUI.cancelPreview

	PS.AdminUI.createPreview = function(name) {
		var normalizedName = name.toLowerCase();
		var $previewLink = '';
		var html = wwCBuilder.html();
		var $saveLink;
		PS.AdminUI.setEditorTemp(html);
		if (normalizedName == "header"){
			var $container = $('#ww-content-header .grid-container').addClass('ps-previewing');
			$previewLink = $('.ps-edit-header > .ps-preview-block-link');
			$saveLink = $('.ps-edit-header > .ps-save-block-link');
		} else {
			var $container = $('#ww-content-footer .grid-container').addClass('ps-previewing');
			$previewLink = $('.ps-edit-footer > .ps-preview-block-link');
			$saveLink = $('.ps-edit-footer > .ps-save-block-link');
		}

		var data = {
			method : 'previewBlockTemplate',
			content : html,
			_cf_nodebug: true
		};

		$.ajax({
			url: facadeUrl,
			type:"POST",
			data: data,
			success: function(data) {
				wwCBuilder.destroy();
				wwCBuilder = null;
				var result = JSON.parse(data);
				$container.empty().html(result).removeClass('.ps-previewing');
				$previewLink.hide();
				// $saveLink.hide();
			},
			error: function(xhr, status, errorThrown) {
				alertify.alert("Error generating preview: " + errorThrown);
				console.error(status + ' ' + errorThrown);
				window.location.reload();
			}
		});
	}; // AdminUI.createPreview

	PS.AdminUI.setEditorTemp = function(html){
		//console.log('Setting editorTemp to: ' + html);
		window.localStorage.setItem("editorTemp",html);
	}

	PS.AdminUI.getEditorTemp = function(){
		var data = window.localStorage.getItem("editorTemp");
		console.log('Got data of : ' + data);
		if (data != null){
			return data;
		} else {
			console.error("Can't find editorTemp data. Are you sure you set it?");
		}
	}

	PS.AdminUI.saveBlock = function(name,useLocalStorage){

		if (useLocalStorage == null){
			useLocalStorage = false;
		}

		var filename = "";
		if (name.toLowerCase() == "header") {
			filename = "header.fluid";
		} else {
			filename = "footer.fluid";
		}
		var html = "";
		if (useLocalStorage){
			html = 	PS.AdminUI.getEditorTemp();
		} else {
			html = wwCBuilder.html();
			wwCBuilder.destroy();
			wwCBuilder = null;
		}

		var data = {
			method : 'setBlock',
			filename : filename,
			content : html,
			_cf_nodebug: true
		};
		$.ajax({
			url: facadeUrl,
			type:"POST",
			data: data,
			success: function(data) {
				var result = JSON.parse(data);
				if(result.STATUS == "SUCCESS") {
					showMessage("success short", "The "+name.toLowerCase()+" was saved successfully");
				} else {
					showMessage("error short", "There was an error saving the  "+name.toLowerCase()+". Error was: " + result.MESSAGE);
				}
				window.location.reload();
			},
			error: function(xhr, status, errorThrown) {
				console.error(status);
			}
		});
	}

	PS.AdminUI.showAllEditorLinks = function($el) {
		if(typeof($el) !== 'undefined') {
			$el.css("visibility", "visible").animate({opacity: 1}, 1000);
		} else {
			$('.ps-edit-links-container').css("visibility", "visible").animate({opacity: 1}, 1000);
		}
	};

	PS.AdminUI.hideAllEditorLinks = function($el) {
		if(typeof($el) !== 'undefined') {
			$el.animate({opacity: 0}, 350).css("visibility", "visible");
		} else {
			$('.ps-edit-links-container').animate({opacity: 0}, 350).css("visibility", "visible");
		}
	};

	PS.AdminUI.createContentBuilder = function(options) {
		var snippetCategories = [
			[117,'Pages'],
			[120,'Basic'],
			[118,'Article'],
			[101,'Headline'],
			[119,'Buttons'],
			[102,'Photos'],
			[103,'Profile'],
			[116,'Contact'],
			[104,'Products'],
			[105,'Features'],
			[106,'Process'],
			[107,'Pricing'],
			[108,'Skills'],
			[109,'Achievements'],
			[110,'Quotes'],
			[111,'Partners'],
			[112,'As Featured On'],
			[113,'Page Not Found'],
			[114,'Coming Soon'],
			[115,'Help, FAQ'],
			[127,'Custom']
		];
		
		if(PS.webwareInHouseOrgs.includes( PS.store.organization_id )){
			snippetCategories.push(["126",'Panels']); // This category will only show for the webware inhouse sites which are defined in the aproot/config/settings.cfm
		}

		var defaultColClasses = [
			'cell large-1',
			'cell large-2',
			'cell large-3',
			'cell large-4',
			'cell large-5',
			'cell large-6',
			'cell large-7',
			'cell large-8',
			'cell large-9',
			'cell large-10',
			'cell large-11',
			'cell large-12',
			'cell medium-1',
			'cell medium-2',
			'cell medium-3',
			'cell medium-4',
			'cell medium-5',
			'cell medium-6',
			'cell medium-7',
			'cell medium-8',
			'cell medium-9',
			'cell medium-10',
			'cell medium-11',
			'cell medium-12',
			'cell small-1',
			'cell small-2',
			'cell small-3',
			'cell small-4',
			'cell small-5',
			'cell small-6',
			'cell small-7',
			'cell small-8',
			'cell small-9',
			'cell small-10',
			'cell small-11',
			'cell small-12',
			'cell large-shrink',
			'cell shrink',
			'cell large-auto',
			'cell small-order-3'
		];

		var defaultOptions = {
			container: '#ww-edit-container',
			snippetCategories : snippetCategories,
			snippetOpen: false,
			replaceSnippetWhileAdding: false,
			customval: "",
			snippetData: '/contentbuilder/assets/foundationxy-blocks/snippetlist.html',
			assetPath: '/contentbuilder/assets/',
			fontAssetPath: '/contentbuilder/assets/fonts/',
			outlineStyle:'gray',
			toolStyle: 'colored',
			builderMode: 'default',
			row: 'grid-x',
			cols: defaultColClasses,
			onImageBrowseClick: function(event) {
				if(typeof(this.activeImage) !== 'undefined') {
					var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
					var elem = $(this.activeImage);
					elem.attr('id', randomId);
					PS.AdminUI.openImageChooserPopup.call(this, "image", randomId);
					return false;
				}
			},
			onImageSelectClick: function(event) {
				var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
				if(typeof(event) !== 'undefined' && typeof(event.targetInput) !== 'undefined') {
					var elem = $(event.targetInput);
					elem.attr('id', randomId);
					PS.AdminUI.openImageChooserPopup.call(this, "input", randomId);
				}
			}
		};

		var effectiveOptions = {};

		// Merge in options received in arguments
		// with the default values replacing them
		// wherever applicable
		// https://api.jquery.com/jQuery.extend/
		$.extend(true, effectiveOptions, defaultOptions, options);

		// Tricky! $.extend() merges, so if the option values
		// are arrays or maps, the final array or map will contain
		// unique values from both the default and the passed in
		// and we need to replace the entire object in that case
		if(typeof(options.snippetCategories) !== 'undefined') {
			effectiveOptions.snippetCategories = options.snippetCategories;
		}

		if(typeof(options.cols) !== 'undefined') {
			effectiveOptions.cols = options.cols;
		}
		
		if(typeof(options.onImageBrowseClick) !== 'undefined') {
			effectiveOptions.onImageBrowseClick = options.onImageBrowseClick;
		}

		if(typeof(options.onImageSelectClick) !== 'undefined') {
			effectiveOptions.onImageSelectClick = options.onImageSelectClick;
		}
		
		if (effectiveOptions.customval == null || PS.is_function(effectiveOptions.customval)) {
			// We don't want to pass in functions
			// to saveimage; blank the value
			effectiveOptions.customval == "";
		} else {
			if(typeof(effectiveOptions.customval) === "object") {
				// If passed in customval is not a primitive or a function
				// stringify it
				effectiveOptions.customval = JSON.stringify(effectiveOptions.customval);
			}
		}

		// set the default category to the first snippet category
		effectiveOptions.defaultSnippetCategory = effectiveOptions.snippetCategories[0][0];

		var builder = new ContentBuilder(effectiveOptions);
		builder.applyBehavior();
		return builder;
	}; // AdminUI.createContentBuilder

	PS.AdminUI.showContentboxAllEditorLinks = function($el) {
		if(typeof($el) !== 'undefined') {
			$el.css("visibility", "visible").animate({opacity: 1}, 1000);
		} else {
			$('.ps-edit-links-container').css("visibility", "visible").animate({opacity: 1}, 1000);
		}
	};

	PS.AdminUI.hideContentboxAllEditorLinks = function($el) {
		if(typeof($el) !== 'undefined') {
			$el.animate({opacity: 0}, 350).css("visibility", "visible");
		} else {
			$('.ps-edit-links-container').animate({opacity: 0}, 350).css("visibility", "visible");
		}
	};

  
	PS.AdminUI.createContentBox = function(options) {
		var snippetCategories = [
			[120,'Basic'],
			[118,'Article'],
			[101,'Headline'],
			[119,'Buttons'],
			[102,'Photos'],
			[103,'Profile'],
			[116,'Contact'],
			[104,'Products'],
			[105,'Features'],
			[106,'Process'],
			[107,'Pricing'],
			[108,'Skills'],
			[109,'Achievements'],
			[110,'Quotes'],
			[111,'Partners'],
			[112,'As Featured On'],
			[113,'Page Not Found'],
			[114,'Coming Soon'],
			[115,'Help, FAQ']
		];
		
		if(PS.webwareInHouseOrgs.includes( PS.store.organization_id )){
			snippetCategories.push(["126",'Panels']); // This category will only show for the webware inhouse sites which are defined in the aproot/config/settings.cfm
		}

		var defaultColClasses = [
			'cell large-1',
			'cell large-2',
			'cell large-3',
			'cell large-4',
			'cell large-5',
			'cell large-6',
			'cell large-7',
			'cell large-8',
			'cell large-9',
			'cell large-10',
			'cell large-11',
			'cell large-12',
			'cell medium-1',
			'cell medium-2',
			'cell medium-3',
			'cell medium-4',
			'cell medium-5',
			'cell medium-6',
			'cell medium-7',
			'cell medium-8',
			'cell medium-9',
			'cell medium-10',
			'cell medium-11',
			'cell medium-12',
			'cell small-1',
			'cell small-2',
			'cell small-3',
			'cell small-4',
			'cell small-5',
			'cell small-6',
			'cell small-7',
			'cell small-8',
			'cell small-9',
			'cell small-10',
			'cell small-11',
			'cell small-12',
			'cell large-shrink',
			'cell shrink',
			'cell large-auto',
			'cell small-order-3'
		];

		var defaultOptions = {
			/* *** OPTIONS *** */
			scriptPath: '/contentbox/contentbuilder/',													// '' (means use default location) - Path for contentbuilder/ folder.
			// pluginPath: '/contentbox/contentbuilder/contentbuilder/plugins/',							// '' (means use default location) - Path for plugins folder: plugins/
			modulePath: '/contentbox/assets/modules/',
			assetPath: '/contentbox/contentbuilder/assets/',
			fontAssetPath: '/contentbox/assets/fonts/',
			designPath: '/contentbox/assets/designs/',
			contentStylePath: '/contentbox/assets/styles/',
			snippetData: '/contentbox/contentbuilder/assets/minimalist-blocks/snippetlist.html',		//Location of content block view/selection.
			framework: 'foundationxy-blocks', 
			row: 'grid-x',
			cols: defaultColClasses,
			snippetCategories: snippetCategories,
			columnTool: true, 				// true | false - To show/hide column tool.
			elementTool: true,				// true | false - To show/hide element tool.
			imageEmbed: true, 				// true | false - To enable/disable image embed feature.
			elementEditor: true,			// true | false - To enable/disable element styles editing feature.
			animateModal: true,				// To enable/disable animation when a modal dialog displayed.
			imageQuality: 0.92,				// 0.92 - To specify image embed quality.
			columnHtmlEditor: true,			// true | false - To show/hide HTML button on column tool
			rowHtmlEditor: false,			// true | false - To show/hide HTML button on row tool
			htmlSyntaxHighlighting: true,	// true | false - To enable/disable syntax highlighting HTML editor
			toolbar: 'top', 				//'top' | 'left' | 'right' - To specify the editing toolbar placement
			toolbarDisplay: 'auto',			// 'auto' | 'always' - To set editing toolbar visibility
			toolbarAddSnippetButton: false,	// true | false - To show/hide 'Add Snippet' button on the editing toolbar
			builderMode: '', 				// '' | 'minimal' | 'clean'
			rowcolOutline: true,			// true | false - Show/hide active row/column outline.
			snippetAddTool: true,			// true | false - Show/hide add snippet (+) orange line.
			outlineStyle: 'grayoutline',	// ''(colored) | 'grayoutline'
			elementSelection: true, 		// true | false - When enabled (set true), Pressing CTRL-A will select current element (not all elements).
			outlineMode: '',				// ''(outline will be applied on both row and column) | 'row'
			elementHighlight: true,			// true | false
			rowTool: 'right',				// 'right' | 'left'
			toolStyle: 'gray',					// ''(colored) | 'gray'
			clearPreferences: false,		// true | false
			customval: "",
			colors: ["#ff8f00", "#ef6c00", "#d84315", "#c62828", "#58362f", "#37474f", "#353535", "#f9a825", "#9e9d24", "#558b2f", "#ad1457", "#6a1b9a", "#4527a0", "#616161", "#00b8c9", "#009666", "#2e7d32", "#0277bd", "#1565c0", "#283593", "#9e9e9e"],	
			buttons: ['bold', 'italic', 'underline', 'formatting', 'color', 'align', 'textsettings', 'createLink', 'tags', 'more' , '|', 'undo', 'redo'],  
											// To configure rich text editor buttons.
			buttonsMore: ['icon', 'image', '|', 'list', 'font', 'formatPara', '|', 'html', 'preferences'],
											// To configure buttons on 'More' popup. 

			// snippetPathReplace: ['assets/minimalist-blocks/', 'mycustomfolder/assets/minimalist-blocks/'],
			container: '#ww-edit-container',
			// snippetOpen: false,
			// replaceSnippetWhileAdding: false,
			
			// row: 'grid-x',
			// cols: defaultColClasses,

		/* *** EVENTS *** */
			coverImageHandler: '/contentbox/saveImage.cfm',
			largerImageHandler: '/contentbox/saveBanner.cfm', /* for uploading larger image */
            moduleConfig: [{
                "moduleSaveImageHandler": "/contentbox/saveModule.cfm" /* for module purpose image saving (ex. slider usage) */
            }],
			onImageBrowseClick: function(event) {
				// Triggered when image browse icon is clicked.
				if(typeof(this.activeImage) !== 'undefined') {
					var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
					var elem = $(this.activeImage);
					elem.attr('id', randomId);
					PS.AdminUI.openImageChooserPopup.call(this, "image", randomId);
					return false;
				}
			},
			onImageSelectClick: function(event) {
				// Triggered when custom image select button is clicked.
				// If onImageSelectClick event is used, custom image select button will be displayed on the image link dialog.
				var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
				if(typeof(event) !== 'undefined' && typeof(event.targetInput) !== 'undefined') {
					var elem = $(event.targetInput);
					elem.attr('id', randomId);
					PS.AdminUI.openImageChooserPopup.call(this, "input", randomId);
				}
			}
		};

		var effectiveOptions = {};

		// Merge in options received in arguments
		// with the default values replacing them
		// wherever applicable
		// https://api.jquery.com/jQuery.extend/
		$.extend(true, effectiveOptions, defaultOptions, options);

		// Tricky! $.extend() merges, so if the option values
		// are arrays or maps, the final array or map will contain
		// unique values from both the default and the passed in
		// and we need to replace the entire object in that case
		if(typeof(options.snippetCategories) !== 'undefined') {
			effectiveOptions.snippetCategories = options.snippetCategories;
		}

		if(typeof(options.cols) !== 'undefined') {
			effectiveOptions.cols = options.cols;
		}
		
		if(typeof(options.onImageBrowseClick) !== 'undefined') {
			effectiveOptions.onImageBrowseClick = options.onImageBrowseClick;
		}

		if(typeof(options.onImageSelectClick) !== 'undefined') {
			effectiveOptions.onImageSelectClick = options.onImageSelectClick;
		}
		
		if (effectiveOptions.customval == null || PS.is_function(effectiveOptions.customval)) {
			// We don't want to pass in functions
			// to saveimage; blank the value
			effectiveOptions.customval == "";
		} else {
			if(typeof(effectiveOptions.customval) === "object") {
				// If passed in customval is not a primitive or a function
				// stringify it
				effectiveOptions.customval = JSON.stringify(effectiveOptions.customval);
			}
		}

		// set the default category to the first snippet category
		effectiveOptions.defaultSnippetCategory = effectiveOptions.snippetCategories[0][0];

		var builder = $(options.container).contentbox(effectiveOptions);

		return builder;
	}; // AdminUI.createContentBox

	if (!PS.isAdminPage) {
		// Front-end page
		// Attach Filepicker to add image icons
		$(document).PS("Filepick", {
			orgId: PS.store.organization_id,
			fp_container: PS.s3bucket,
			trigger_element: '.open-image-picker',
			get_stats: true,
			convert_file: true,
			callback: function(blob){
				var linkAttributeValue = blob.triggerAttributes.link.value;
				var linkAttributesData = linkAttributeValue.substr(linkAttributeValue.indexOf("?") + 1).split("&");
				var arrLen = linkAttributesData.length;
				var linkAttributes = {};
				var warning = false;
				var warningMessage = "";
				for(i=0; i<arrLen; i++) {
					var data = linkAttributesData[i].split("=");
					linkAttributes[data[0]] = data[1];
				}
				
				if((linkAttributes.requestedWidth > 0) && (linkAttributes.requestedHeight > 0)) {
					if((blob.width != linkAttributes.requestedWidth) || (blob.height != linkAttributes.requestedHeight)) {
						warning = true;
						warningMessage = "Warning! The uploaded image does not match the recommended dimensions for this image (" + linkAttributes.requestedWidth + "px X " + linkAttributes.requestedHeight + "px)";
					}
				} else if (linkAttributes.requestedWidth > 0) {
					if (blob.width != linkAttributes.requestedWidth) {
						warning = true;
						warningMessage = "Warning! The width of the uploaded image does not match the recommended width for this image (" + linkAttributes.requestedWidth + "px)";
					}
				} else if (linkAttributes.requestedHeight > 0) {
					if (blob.height != linkAttributes.requestedHeight) {
						warning = true;
						warningMessage = "Warning! The height of the uploaded image does not match the recommended height for this image (" + linkAttributes.requestedHeight + "px)";
					}
				}
				
				if(warning) {
					PS.AdminUI.confirmPhotoEdit(blob, warningMessage);    
				} else {
					PS.AdminUI.confirmPhotoEdit(blob);
				}
			} // callback()
		});

		// Attach Filepicker to file/document uploaders
		$(document).PS("Filepick", {
			orgId: PS.store.organization_id,
			fp_container: PS.s3bucket,
			trigger_element: '.open-file-picker',
			fp_allowed_extensions: ['.pdf', '.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx'],
			fp_services: ['COMPUTER', 'BOX', 'DROPBOX', 'URL'],
			fp_max_size: 52428800,
			get_stats: false,
			callback: function(blob){
				PS.AdminUI.openEditorPopup(blob);
			}
		});

		// Attach edit and delete behaviours to document file type
		$(document).on("mouseover", ".ps-edit-mode", function(e) {
			$(e.currentTarget).find('.ps-edit-links').show();
		}).on("mouseout", ".ps-edit-mode", function(e) {
			$(e.currentTarget).find('.ps-edit-links').hide();
		}).on("click", ".ps-edit-image-link > a", function(e) {
			var popupLink = '//' + window.location.hostname + $(this).attr('link');
			$.magnificPopup.open({
				mainClass: 'ps-admin-popup',
				items: {
					src: popupLink
				},
				type: 'iframe'
			});
			e.preventDefault();
		}).on('click', '.ps-delete-image-link > a', function(e) {
			var confirmText = $(e.currentTarget).attr('confirm-msg');
			alertify.confirm(confirmText, function(response) {
				if(response) {
					var cacheBuster = new Date().getMilliseconds();
					var link = '//' + window.location.hostname + $(e.currentTarget).attr('link');
					window.location.href=link + '&' + cacheBuster;
				}
			});
			e.preventDefault();
		});
	}
  
	$(".ps-image-editor").each(function(){
		var link = $(this).data("link");
		var id = $(this).data("id");
		link = $('<a>').attr({'href':'javascript:void(0)','link':link,'id':id,'class':'open-link'});
		$(this).parent().find("img").wrap(link);
	});

	$('.ps-image-picker').each(function(){
		var link = $(this).data("link");
		var id = $(this).data("id");
		link = $('<a>').attr({'href':'javascript:void(0)','link':link,'id':id,'class':'open-image-picker'});
		$(this).parent().find("img").wrap(link);
	});


	$('.ps-file-picker').each(function(){
		var link = $(this).data("link");
		var id = $(this).data("id");
		link = $('<a>').attr({'href':'javascript:void(0)','link':link,'id':id,'class':'open-file-picker'});
		$(this).parent().find("img").wrap(link);
	});

	$('.ps-embed-editor').each(function(){
		var link = $(this).data("link");
		var id = $(this).data("id");
		link = $('<a>').attr({'href':'javascript:void(0)','link': link,'id': id,'class': 'open-embed-editor'});
		$(this).parent().find('img').wrap(link);
	});
  
	// Attach behaviours to front-end admin links using delegation
	$(document)
		.on("click", ".open-link", function(){
			var initPopup = function() {
				$("#colorbox").addClass("ps-colorbox");
			};
			var popupLink = '//' + window.location.hostname + '/' + $(this).attr('link');
			$.colorbox({iframe:true,href:$(this).attr('link'),width:830,height:600,overlayClose:false,onOpen:initPopup});
		})
		// Collection and Feedback Form and Content popups
		.on("click", ".ps-edit-collection-link,.ps-add-collection-link,.ps-add-form-link,.ps-edit-form-link,.ps-edit-gallery-link,.ps-add-gallery-link,.ps-edit-feedback-link,.ps-add-feedback-link,.ps-add-blog-link,.ps-edit-blog-link", function(e){
			var popUpLink = $(this).attr('link');
			if (PS.useS3) {
				$.magnificPopup.open({
					items: {
					src: popUpLink
					},
					type: 'iframe',
					modal: true,
					mainClass: 'ps-content-chooser-popup',
					showCloseBtn: true
				});
			}
			else {
				$.colorbox({
					iframe: true,
					width: '830px',
					height: '600px',
					href: popUpLink,
					closeButton: false
				});
			}
			e.preventDefault();
		})
		// Edit content image
		.on("click", ".change-link", function(){
			var initPopup = function() {
				$("#colorbox").addClass("ps-colorbox");
			};
			var popupLink = '//' + window.location.hostname + '/' + $(this).attr('link');
			if (PS.useS3) {
				$.magnificPopup.open({
				mainClass: 'ps-admin-popup',
				items: {
					src: popupLink
				},
				type: 'iframe'
				});
			} else {
				$.colorbox({
				iframe: true,
				width: '830px',
				height: '600px',
				href: popupLink
				});
			}
		})
		.on("click", ".open-embed-editor", function(){
			var popupLink = '//' + window.location.hostname + '/' + $(this).attr('link');
			if(PS.useS3) {
				$.magnificPopup.open({
					mainClass: 'ps-admin-popup',
					closeOnContentClick: false,
					closeOnBgClick: false,
					enableEscapeKey: false,
					alignTop: true,
					items: {
						src: popupLink
					},
					type: 'iframe'
				});
			} else {
				$.colorbox({
					iframe: true,
					width: '830px',
					height: '600px',
					href: popupLink
				});
			}
		});

	if ($("#reviewform").length) {
		$(".reset-stars").hide();
		$.artaraxRatingStar({ onClickCallBack: onRatingStar });

		function onRatingStar(rate) {
			$("#ratingStars").val(rate);

			$(".reset-stars").show().click(function () {
				$(".rating-star > span").removeClass("clicked");
				$(".reset-stars").hide();
				$("#ratingStars").val("");
			});
		}

		$("#submitBtn").click(function () {
			var name = $('#name').val();
			var email = $('#email').val();

			if ($("#ratingStars").val() == ""){
				alertify.alert("Please select the Star Rating");
				return false;
			}
			else if (name == '') {
				alertify.alert("Please Enter name");
				return false;
			}
			else if (email == '') {
				alertify.alert("Please Enter email");
				return false;
			}
			else if (IsEmail(email) == false) {
				alertify.alert("Invalid Email");
				return false;
			}
			else{
				document.getElementById("reviewform").submit();
			}
		});
		function IsEmail(email) {
			var regex = /^(?=.{1,64}@.{1,255}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
				if (!regex.test(email)) {
					return false;
				}
				else {
					return true;
				}
			}
	}
});

// need this because we need to set the builder singleton
// from within an asynchronous ajax call
function setGlobalBuilder(builder){
	wwCBuilder = builder;
}
var wwCBuilder = null;

$(function() {
    var facadeUrl = "/api/ajaxfacade.cfc?returnformat=JSON"; 

	$(".ww-is-wrapper > div:not('.ps-edit-links-container')").addClass('is-wrapper');
	
    $('body')
	/* content builder */
	.on('click', '.ps-edit-article-link, .ps-add-article-link', function(event) {
        var elem = event.currentTarget;
		var contentId = $(elem).data("content_id");
		var containerUniqueId = "#ww-content-" + contentId;
		var uniqueId = "ww-" + PS.random_str(8);
		var editContainer = $(containerUniqueId).first().attr({ id: uniqueId});
		if(wwCBuilder == null) {
			if(editContainer.length > 0) {
				var editLinksContainer = $(elem).closest('.ps-edit-links-container');
				PS.AdminUI.hideAllEditorLinks();
				PS.AdminUI.showAllEditorLinks(editLinksContainer);
				editLinksContainer.addClass('is-active');
				editLinksContainer.find('.ps-edit-article-link,.ps-add-article-link').hide();
				editLinksContainer.find('.ps-cancel-article-link').show();
				editLinksContainer.find('.ps-save-article-link').show();
			//	$('#' + uniqueId).removeClass('ww-edit-border');
				var options = {
					container: '#' + uniqueId,
					onImageBrowseClick: function(event) {
						if(typeof(this.activeImage) !== 'undefined') {
							var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
							var elem = $(this.activeImage);
							elem.attr('id', randomId);
							PS.AdminUI.openImageChooserPopup.call(this, "image", randomId);
							return false;
						}
					},
					onImageSelectClick: function(event) {
						var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
						if(typeof(event) !== 'undefined' && typeof(event.targetInput) !== 'undefined') {
							var elem = $(event.targetInput);
							elem.attr('id', randomId);
							PS.AdminUI.openImageChooserPopup.call(this, "input", randomId);
						}
					},
					snippetOpen: true,
					customval: {
						article_id: $(elem).data('article_id'),
						organization_id: $(elem).data('organization_id'),
						order: $(elem).data('order'),
						page_id: $(elem).data('page_id'),
						section_id: $(elem).data('section_id'),
						content_id: $(elem).data('content_id')
					},
				}
				wwCBuilder = PS.AdminUI.createContentBuilder(options);
			} else {
				console.error("Grid container not found for this content item.");
			}
		} else {
			console.error("There's already an instance of content builder initialized on the page.");
		}
		event.preventDefault();
    }).on('mouseover', '.ps-edit-links-container a', function(event) {
		if(wwCBuilder == null) {
			if($(this).parent().hasClass('ps-edit-header')) {
				$('#ww-content-header').find(".grid-container").first().addClass("ww-edit-border");
			} else if($(this).parent().hasClass('ps-edit-footer')) {
				$('#ww-content-footer').find(".grid-container").first().addClass("ww-edit-border");
			} else if($(this).hasClass('ps-add-gallery-link')){
				$(this).parents('.slider-banner').find(".ps-info").addClass("ww-edit-border");
			} else if($(this).hasClass('ps-add-blog-link')){
				$(this).parents('.blog-chooser').find(".ps-info").addClass("ww-edit-border");
			} else {
				var contentId = $(event.currentTarget).data("content_id");
				if(contentId != undefined)
					$('#ww-content-'+contentId).addClass("ww-edit-border", {duration:500});
				else
					$(this).parents(".slider-banner, .blog-chooser").find('*[id*="ww-content-"]').addClass("ww-edit-border", {duration:500});
			}
		}
    }).on('mouseout', '.ps-edit-links-container a', function(event) {
		if(wwCBuilder == null) {
			if($(this).parent().hasClass('ps-edit-header')) {
				$('#ww-content-header').find(".grid-container").first().removeClass("ww-edit-border");
			} else if($(this).parent().hasClass('ps-edit-footer')) {
				$('#ww-content-footer').find(".grid-container").first().removeClass("ww-edit-border");
			} else if($(this).hasClass('ps-add-gallery-link')){
				$(this).parents('.slider-banner').find(".ps-info").removeClass("ww-edit-border");
			} else if($(this).hasClass('ps-add-blog-link')){
				$(this).parents('.blog-chooser').find(".ps-info").removeClass("ww-edit-border");
			} else {
				var contentId = $(event.currentTarget).data("content_id");
				if(contentId != undefined)
					$('#ww-content-'+contentId).removeClass("ww-edit-border", {duration:500});
				else
					$(this).parents(".slider-banner, .blog-chooser").find('*[id*="ww-content-"]').removeClass("ww-edit-border", {duration:500});
			}

		}
	}).on('mouseover', '*[id*="ww-content-"]', function(event) {
		if(wwCBuilder == null) {
			if(($(this).attr("id") == "ww-content-header") || ($(this).attr("id") == "ww-content-footer")) {
				$(this).find(".grid-container").first().addClass("ww-edit-border");
			} else {
				$(this).addClass("ww-edit-border");
			}
		}
    }).on('mouseout', '*[id*="ww-content-"]', function(event) {
		if(wwCBuilder == null) {
			if(($(this).attr("id") == "ww-content-header") || ($(this).attr("id") == "ww-content-footer")) {
				$(this).find(".grid-container").first().removeClass("ww-edit-border");
			} else {
				$(this).removeClass("ww-edit-border");
			}
		}
	}).on('click', '.ps-save-article-link', function(event) {
		event.preventDefault();
		if(wwCBuilder != null) {
			HoldOn.open({theme:"sk-rect",message:""});
			var saveLink = $(event.currentTarget);
			var html = wwCBuilder.html();
			var content = {
				type:"HTML",
				data: {
					IMAGE: 0,
					SUMMARY: "",
					DATEMODIFIED: "",
					SUBJECT: "",
					VERSION: 2,
					ID: saveLink.data("article_id"),
					HEADLINE: "",
					AUTHOR: saveLink.data("author_name"),
					BODY: html,
					XMLBODY: html,
					DATECREATED: "",
					ORGANIZATION_ID: saveLink.data("organization_id")
				},
				action:"CREATECONTENT",
				ID: saveLink.data("content_id")
			};

			var data = {
				method : 'setArticle',
				_cf_nodebug: true,
				CONTENT: JSON.stringify(content),
				orgId: saveLink.data("organization_id"),
				sectionID: saveLink.data("section_id"),
				pageID: saveLink.data("page_id"),
				order: saveLink.data("order")
			};
			
			$.ajax({
				url: facadeUrl,
				type:"POST",
				data: data,
				success: function(data) {
					var result = JSON.parse(data);
					if(result.STATUS == "SUCCESS") {
						showMessage("success short", "The article was saved successfully");
						window.location.reload();
					} else {
						console.error("There was an error saving the article");
						showMessage("error short", "There was an error saving the article");
					}
					window.location.reload();
				},
				error: function(xhr, status, errorThrown) {
					console.error(status);
					console.error("There was an error saving the article");
					showMessage("error short", "There was an error saving the article");
					window.location.reload();
				}
			});
		}
    }).on("click", ".ps-delete-link>.confirm-link", function(event) {
		if(wwCBuilder != null) {
			alertify.set({ 
				labels	: {
					ok 		: 'Yes',
					cancel 	: 'No'
				}
			});
			alertify.set({ buttonReverse: true });
			alertify.confirm('Do you really want to delete this article?', function(response) {
				if(response) {
					var cacheBuster = new Date().getMilliseconds();
					var link = $(event.currentTarget).attr('link');
					window.location.href=link + '&' + cacheBuster;
				}
			});
		}
        event.preventDefault();
    }).on("click", ".ps-edit-block-link", function(event) {
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.editBlock('header');
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.editBlock('footer');
			}
	}).on("click", ".ps-cancel-article-link", function(event) {
		if(wwCBuilder != null) {
			alertify.set({ 
				labels	: {
					ok 		: 'Yes',
					cancel 	: 'No'
				}
			});
			alertify.set({ buttonReverse: true });
			alertify.confirm('Do you want to cancel editing?', function(response) {
				if(response) {
					window.location.reload();
				}
			});
		}
	}).on("click", ".ps-cancel-block-link", function(event) {
		if(wwCBuilder != null) {
			// the editor is around. We're in edit mode lets find the block id and 
			// go back to non-edit mode
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.cancelEditBlock('header');
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.cancelEditBlock('footer');
			}
		} else {
			// they're looking at a preview of the edited content
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.cancelPreview('header');
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.cancelPreview('footer');
			}
		}
	}).on("click", ".ps-save-block-link", function(event) {
		if(wwCBuilder != null) {
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.saveBlock("header");
				HoldOn.open({theme:"sk-rect",message:""});
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.saveBlock("footer");
				HoldOn.open({theme:"sk-rect",message:""});
			}
		} else {
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.saveBlock("header",true);
				HoldOn.open({theme:"sk-rect",message:""});
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.saveBlock("footer",true);
				HoldOn.open({theme:"sk-rect",message:""});
			}
		}
		event.preventDefault();
	}).on("click", ".ps-preview-block-link", function(event) {
		if(wwCBuilder != null) {
			if ($(this).parent().hasClass('ps-edit-header')) {
				PS.AdminUI.createPreview("header");
			} else if ($(this).parent().hasClass('ps-edit-footer')) {
				PS.AdminUI.createPreview("footer");
			}
			event.preventDefault();
		} 
	})

	/* content box */
	.on('click', '.ps-contentbox-edit-page-link, .ps-contentbox-add-page-link', function(event) {
		var elem = event.currentTarget;
		var containerUniqueId = "#contentbox";
		var uniqueId = "contentbox";
		var editContainer = $(containerUniqueId);
		if(wwCBuilder == null) {
			if(editContainer.length > 0) {
				var editLinksContainer = $(elem).closest('.ps-edit-links-container');
				editLinksContainer.addClass('is-active');
				editLinksContainer.find('.ps-contentbox-edit-page-link,.ps-contentbox-add-page-link').hide();
				editLinksContainer.find('.ps-contentbox-cancel-page-link').show();
				editLinksContainer.find('.ps-contentbox-save-page-link').show();
			//	$('#' + uniqueId).removeClass('ww-edit-border');
				var options = {
					container: '#' + uniqueId,
					onImageBrowseClick: function(event) {
						if(typeof(this.activeImage) !== 'undefined') {
							var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
							var elem = $(this.activeImage);
							elem.attr('id', randomId);
							PS.AdminUI.openImageChooserPopup.call(this, "image", randomId);
							return false;
						}
					},
					onImageSelectClick: function(event) {
						var randomId = String('ww-' + PS.random_str(8)).toLowerCase();
						if(typeof(event) !== 'undefined' && typeof(event.targetInput) !== 'undefined') {
							var elem = $(event.targetInput);
							elem.attr('id', randomId);
							PS.AdminUI.openImageChooserPopup.call(this, "input", randomId);
						}
					},
					snippetOpen: true,
					enableContentStyle: false,
					customval: {
						article_id: $(elem).data('article_id'),
						organization_id: $(elem).data('organization_id'),
						order: $(elem).data('order'),
						page_id: $(elem).data('page_id'),
						section_id: $(elem).data('section_id'),
						content_id: $(elem).data('content_id')
					},
				}
				wwCBuilder = PS.AdminUI.createContentBox(options);
			} else {
				console.error("Grid container not found for this content item.");
			}
		} else {
			console.error("There's already an instance of content builder initialized on the page.");
		}
		$(".ww-content-block .is-container").removeClass("is-builder");
		event.preventDefault();
	})
	.on('click', '.ps-contentbox-save-page-link', function(event) {
		event.preventDefault();
		$(".ww-content-block").removeClass("is-overlay-content");
		if(wwCBuilder != null) {
			HoldOn.open({theme:"sk-rect",message:""});
			var saveLink = $(event.currentTarget);
			var fluid = wwCBuilder.data('contentbox').fluid();
			// console.log(fluid);
			// debugger;
			var data = {
				method : 'setPageFluid',
				_cf_nodebug: true,
				fluid: fluid,
				orgId: saveLink.data("organization_id"),
				pageID: saveLink.data("page_id")
			};
			
			$.ajax({
				url: facadeUrl,
				type:"POST",
				data: data,
				success: function(data) {
					if(data) {
						showMessage("success short", "The page was saved successfully");
					} else {
						console.error("There was an error saving the page");
						showMessage("error short", "There was an error saving the page");
					}
					window.location.reload();
				},
				error: function(xhr, status, errorThrown) {
					showMessage("error short", "There was an error saving the page");
					//window.location.reload();
				}
			});
		}
	}).on("click", ".ps-contentbox-cancel-page-link", function(event) {
		if(wwCBuilder != null) {
			alertify.set({ 
				labels	: {
					ok 		: 'Yes',
					cancel 	: 'No'
				}
			});
			alertify.set({ buttonReverse: true });
			alertify.confirm('Do you want to cancel editing?', function(response) {
				if(response) {
					window.location.reload();
				}
			});
		}
	});

	$(document).foundation();
	setTimeout(PS.AdminUI.showAllEditorLinks, 2000);
	setTimeout(PS.AdminUI.showContentboxAllEditorLinks, 2000);
});
