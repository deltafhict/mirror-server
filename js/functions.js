$(window).load(function() {
	
	$(".logo").fadeIn(3000);
	
	setTimeout(function() {
		$(".navigation").addClass("active");
	}, 3000);
	
	var slideNum = $('.slider .slides > li').length;
	console.log(slideNum);
	slideNum = slideNum/2;
	
});

$(document).ready(function() {
	
	var key = 0;
	$(document).keydown(function(e) {
        key = e.which;
		console.log(key);	
		if(key == 13){ $(".navigation").toggleClass("active"); }
		if(!$(".navigation").hasClass("active")) {
			$(".agenda-events").css("width", "0");	
			$('.agenda-events').height(0);
		}
		
		if(key == 37 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("prev"); }
		if(key == 39 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("next"); }
    });
	
	$('body').click(function(e) {
        $(".slider .slides").trigger("slideTo", -1);
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
			items.filter(":eq(7)").addClass("active").removeClass("inactive");
			
			lastListH = $('#eventlist').height();
			console.log(lastListH);
				
			if($(".slider .slides > li.list").hasClass("active")) {
				$(".agenda-events").css("width", "445px");
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
			items: {
				visible: 15,
				start: -1,
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