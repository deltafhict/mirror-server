$(window).load(function() {

	$(".logo").fadeIn(3000);

	setTimeout(function() {
		$(".logo").fadeOut(3000, function(){
			$(".fav-nav").fadeIn(3000);
			$(".navigation").addClass("active");	
		});
	}, 3000);

	var slideNum = $('.slider .slides > li').length;
	console.log(slideNum);
	slideNum = slideNum/2;

});

$(document).ready(function() {

	var key = 0;
	var favActive = 0;
	$(".fav-nav ul li").eq(favActive).addClass("active");
	
	$(document).keydown(function(e) {
        key = e.which;
		console.log(key);
		

		if(key == 13){
			$(".agenda-events .events ul > li").not(":nth-child(1)").css("display", "none");
			$(".agenda-events .events ul > li .description").css("display", "block");
		}
		else {
			$(".agenda-events .events ul > li").not(":nth-child(1)").css("display", "block");
			$(".agenda-events .events ul > li .description").css("display", "none");	
		}

		if(!$(".navigation").hasClass("active")) {
			$(".agenda-events").css("width", "0");
			$(".agenda-events").height(0);
		}

		if(key == 37 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("prev"); }
		if(key == 39 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("next"); }

		if(key == 38){
			favActive--; 
			
			if(favActive == -1){ favActive = 2; }
			
			//console.log("Up: " + favActive);
			
			$(".fav-nav ul li").removeClass("active");
			$(".fav-nav ul li").eq(favActive).addClass("active");
		}
		if(key == 40){
			favActive++;
			
			if(favActive == 3){ favActive = 0; }
			
			//console.log("Down: " + favActive); 
			
			$(".fav-nav ul li").removeClass("active");
			$(".fav-nav ul li").eq(favActive).addClass("active");
		}
    });

	var lastListH;

	$(function() {

		var $highlight = function() {
			var $this = $(".slider .slides");

			//get all visible items (in this case 3 slides)
			var items = $this.triggerHandler("currentVisible");

			// remove all .active classes
			$this.children().removeClass("active");
			$this.children().addClass("inactive");

			//add .active class to 2nd / centered item
			items.filter(":eq(2)").addClass("active").removeClass("inactive");

			lastListH = $('#eventlist').height();
			console.log(lastListH);

			if($(".slider .slides > li.list").hasClass("active")) {
				$(".agenda-events").css("width", "500px");
				$('.agenda-events').height(lastListH);
			}
			else {
				$(".agenda-events").css("width", "0");
				$('.agenda-events').height(0);
			}
		}

		$('.slider .slides').carouFredSel({
			width: '100%',
			height: 125,
			align: "center",
			items: {
				visible: 5,
				start: 3,
				height: 'auto',
			},
			scroll: {
				items: 1,
				duration: 500,
				timeoutDuration: 1000,
				// set active slide on scroll
      			onAfter : $highlight,
			},
			auto: {
				play: false,
			},
			/*prev: '#prev',
			next: '#next',
			pagination: {
				container: '#pager',
				deviation: 1
			}*/
		});
	});

});