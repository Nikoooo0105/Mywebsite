$(document).ready(function(){ 

	$(this).foundation();

	var pathname = window.location.pathname.split("/");
	$(".handle-home").removeClass("active");
	if(pathname[1] == "" || pathname[1] == 'index.cfm')
		$(".handle-home").addClass("active");
	else
		$(".handle-"+pathname[2]).addClass("active");
	
	/* BX Slider - Initialization for all the page types. */
	if( $("ul.main-slider > li").length > 1 ){
		var auto = ( $('ul.main-slider').attr('auto') ) ? true : false;
		var controls = ( $('ul.main-slider').attr('arrow') ) ? true : false;
		var pager = ( $('ul.main-slider').attr('pager') ) ? true : false;
		var adaptiveHeight = ( $('ul.main-slider').attr('adaptiveHeight') ) ? true : false;
		$('.main-slider').bxSlider({
			mode: 'fade',
			auto: auto,
			controls: controls,
			pager: pager,
			adaptiveHeight: adaptiveHeight
		});
	}

	
		if( $(".gallery").length > 1 ){
			var myLightbox = GLightbox({
				'selector': '.gallery'
			});
		}
	

	
	if( $(".sticky-bg-color").length == 1 ){
        var headerHeight = $(".sticky-bg-color").height();
        $(".is-header .is-boxes").height(headerHeight);

		$(document).scroll(function() {
			$(".sticky-bg-color").removeClass("stick");
			$(".sticky-bg-color").addClass("stick");
		});
    }
    
   

	/* For Media Gallery 2 */
	if( $("ul#media-gallery-2 > li").length > 1 ){    
		$('#media-gallery-2').bxSlider({
		mode: 'fade',
			
			auto: true,
			stopAutoOnClick: true,
			
			controls: true,
			
			captions: true,
			
			adaptiveHeight: true,
			
			pager: true,
			pagerCustom: '#media-gallery-2-thumbnails',
			
		});
		
		
		$('#media-gallery-2-thumbnails').bxSlider({
			minSlides: 1,
			maxSlides: 6,
			infiniteLoop: false,
			slideWidth: 100,
			slideMargin: 10,
			pager:false,
			controls: true,
			touchEnabled:false,
			hideControlOnEnd:false,
			wrapperClass: 'bx-wrapper margin-0 padding-0 cell'
		});
		
	}
	
	var crawler = $(".crawler-images > div").length;
	if (crawler > 0) {
		$('.user-logged-out .crawler-images').bxSlider({
			minSlides: 1,
			maxSlides: 6,
			auto:true,
			infiniteLoop: true,
			slideWidth: 250,
			slideMargin: 10,
			pager:false,
			ticker:true,
			tickerHover:true,
			speed:15000,
			controls: true,
			touchEnabled:false,
			hideControlOnEnd:false,
			pause:0,
			wrapperClass: 'bx-wrapper margin-0 padding-0 grid-x crawler-container'
		});
	}
	/* BX Slider - End */
	
	$(".user-logged-in .login-register-links").remove();
	
	if( $(".user-logged-out footer .social-media ul.social-media-icons li").length == 0 )
		$(".user-logged-out footer .social-media").remove();
			
	if($( "#customer_instagram_unername" ).length > 0 ){
		var res = $("#customer_instagram_unername").text().replace("@", "");

		(function(g){function r(g){return g.replace(/[&<>"'`=\/]/g,function(a){return f[a]})}var m={host:"https://www.instagram.com/",username:"",tag:"",container:"",display_profile:!0,display_biography:!0,display_gallery:!0,display_igtv:!1,get_data:!1,callback:null,styling:!0,items:8,items_per_row:4,margin:.5,image_size:640},n={150:0,240:1,320:2,480:3,640:4},f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};g.instagramFeed=function(f){var a=g.fn.extend({},
m,f);if(""==a.username&&""==a.tag)return console.error("Instagram Feed: Error, no username or tag found."),!1;"undefined"!==typeof a.get_raw_json&&(console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead"),a.get_data=a.get_raw_json);if(!a.get_data&&""==a.container)return console.error("Instagram Feed: Error, no container found."),!1;if(a.get_data&&null==a.callback)return console.error("Instagram Feed: Error, no callback defined to get the raw json"),!1;var l=""==a.username;
g.get(l?a.host+"explore/tags/"+a.tag+"/":a.host+a.username+"/",function(b){try{b=b.split("window._sharedData = ")[1].split("\x3c/script>")[0]}catch(u){console.error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26");return}b=JSON.parse(b.substr(0,b.length-1));b=b.entry_data.ProfilePage||b.entry_data.TagPage;if("undefined"===typeof b)console.error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25");
else if(b=b[0].graphql.user||b[0].graphql.hashtag,a.get_data)a.callback(b);else{var c="",h="",k="",e="",f="";a.styling&&(c=" style='text-align:center;'",h=" style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'",k=" style='font-size:1.2em;'",e=" style='font-size:1em;'",f=" style='margin:"+a.margin+"% "+a.margin+"%;width:"+(100-2*a.margin*a.items_per_row)/a.items_per_row+"%;float:left;'");var d="";a.display_profile&&(d=d+("<div class='instagram_profile'"+c+">")+("<img class='instagram_profile_image' src='"+
b.profile_pic_url+"' alt='"+(l?b.name+" tag pic":b.username+" profile pic")+"'"+h+" />"),d=l?d+("<p class='instagram_tag'"+k+"><a href='https://www.instagram.com/explore/tags/"+a.tag+"' rel='noopener' target='_blank'>#"+a.tag+"</a></p>"):d+("<p class='instagram_username'"+k+">@"+b.full_name+" (<a href='https://www.instagram.com/"+a.username+"' rel='noopener' target='_blank'>@"+a.username+"</a>)</p>"),!l&&a.display_biography&&(d+="<p class='instagram_biography'"+e+">"+b.biography+"</p>"),d+="</div>");
k="undefined"!==typeof n[a.image_size]?n[a.image_size]:n[640];if(a.display_gallery)if("undefined"!==typeof b.is_private&&!0===b.is_private)d+="<p class='instagram_private'><strong>This profile is private</strong></p>";else{e=(b.edge_owner_to_timeline_media||b.edge_hashtag_to_media).edges;h=e.length>a.items?a.items:e.length;d+="<div class='instagram_gallery'>";for(c=0;c<h;c++){var m="https://www.instagram.com/p/"+e[c].node.shortcode;switch(e[c].node.__typename){case "GraphSidecar":var p="sidecar";
var q=e[c].node.thumbnail_resources[k].src;break;case "GraphVideo":p="video";q=e[c].node.thumbnail_src;break;default:p="image",q=e[c].node.thumbnail_resources[k].src}var t="undefined"!==typeof e[c].node.edge_media_to_caption.edges[0]&&"undefined"!==typeof e[c].node.edge_media_to_caption.edges[0].node&&"undefined"!==typeof e[c].node.edge_media_to_caption.edges[0].node.text&&null!==e[c].node.edge_media_to_caption.edges[0].node.text?e[c].node.edge_media_to_caption.edges[0].node.text:"undefined"!==typeof e[c].node.accessibility_caption&&
null!==e[c].node.accessibility_caption?e[c].node.accessibility_caption:(l?b.name:b.username)+" image "+c;d+="<a href='"+m+"' class='instagram-"+p+"' rel='noopener' target='_blank'>";d+="<img src='"+q+"' alt='"+r(t)+"'"+f+" />";d+="</a>"}d+="</div>"}if(a.display_igtv&&"undefined"!==typeof b.edge_felix_video_timeline&&(b=b.edge_felix_video_timeline.edges,h=b.length>a.items?a.items:b.length,0<b.length)){d+="<div class='instagram_igtv'>";for(c=0;c<h;c++)d+="<a href='https://www.instagram.com/p/"+b[c].node.shortcode+
"' rel='noopener' target='_blank'>",d+="<img src='"+b[c].node.thumbnail_src+"' alt='"+a.username+" instagram image "+c+"'"+f+" />",d+="</a>";d+="</div>"}g(a.container).html(d)}}).fail(function(a){console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ",a.status)});return!0}})(jQuery);
		$.instagramFeed({
			'username': res, //add username here
			'container': "#instagram-feed",
			'display_profile': false,
			'display_biography': false,
			'display_gallery': true,
			'callback': null,
			'styling': true,
			'items': 10,
			'items_per_row': 5,
			'margin': 0
		});
	}

	$(".remaining-articles-arrow").click(function(){
		$(".remaining-articles").slideToggle("slow");
	});
	
	$(".more").click(function(){
		$(".about-more-text").slideToggle("slow");
		$( ".about-section" ).toggleClass( "active" );
	});

	if($( ".open-down-arrow" ).length > 0 ){
		$(".open-down-arrow").click(function(){
			$(this).toggleClass("active");
		})
	}

	if($( ".three-column-slider" ).length > 0 ){
     var width = $( window ).width();
        if (width < 564){
            var slideWidth = 450;
        }
        else if (width < 1025) {
           var slideWidth = 310;
        } else {
           var slideWidth = 379;
        }
    
        $('.user-logged-out .three-column-slider').bxSlider({
            auto:true,
			minSlides: 1,
			maxSlides: 3,
            moveSlides:1,
			infiniteLoop: false,
			slideWidth: slideWidth,
			pager:true,
			controls: false,
			touchEnabled:false,
			hideControlOnEnd:false,
			wrapperClass: 'bx-wrapper three-column-slider-wrapper margin-0 padding-0 cell'
		});
  	}
	
	if($( ".form-map-layout" ).length > 0 ){
        $(".user-logged-out .form-map-layout.form .row .column").removeClass("full");
        $(".user-logged-out .form-map-layout.form .row .column").addClass("half");
        $(".user-logged-out .form-map-layout.form .row .column .grid-container .cell").removeClass("medium-6");
        $(".user-logged-out .form-map-layout.form .row .column .grid-container .cell").addClass("medium-12");
        
        $(".user-logged-out .form-map-layout.map .grid-x .cell").addClass("column half");
        $(".user-logged-out .form-map-layout.map .grid-x .cell").removeClass("cell");
        
        $mapHtml =  $(".user-logged-out .form-map-layout.map .grid-x").html();
        $($mapHtml).insertBefore(".user-logged-out .form-map-layout.form .row .column");
        $(".user-logged-out .form-map-layout.map").hide();
    }

	$(".masonry-media-gallery .btn").click(function () {
		$(".section-filter-gallery .btn").removeClass("active");
		$(this).addClass("active");   
	});

	if($( ".new-header-8" ).length > 0 ){
        $(".off-canvas.sidenav").addClass("mobile-menu-for-desktop");
        $(".off-canvas-content").addClass("mobile-menu-for-desktop");
    }

});

filterSelection("all");
function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("tile");
	if (c == "all") c = "";
	for (i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
}

function w3AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
	}
}

function w3RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
		arr1.splice(arr1.indexOf(arr2[i]), 1);     
		}
	}
	element.className = arr1.join(" ");
}


//custom js
$("#first_name").attr("placeholder", "First Name");
$("#last_name").attr("placeholder", "Last Name");
$("#email").attr("placeholder", "Email");

$('.user-logged-out .service-slider-1').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2,
  arrows: false,
  autoplay: false,
  adaptiveHeight: true,
  dots: true, 
 responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 940,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})

$('.user-logged-out .slider-testimonial').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: false,
  adaptiveHeight: true,
  dots: true, 
 responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})