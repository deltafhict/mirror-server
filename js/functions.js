$(window).load(function() {
	
	var slideNum = $('.slider .slides > li').length;
	console.log(slideNum);
	slideNum = slideNum/2;
	
});

$(document).ready(function() {
	
	var key = 0;
	$(document).keypress(function(e) {
        key = e.which;
		console.log(key);	
		if(key == 49){ $(".slider .slides").trigger("slideTo", 0); }	
		if(key == 50){ $(".slider .slides").trigger("slideTo", 1); }	
		if(key == 51){ $(".slider .slides").trigger("slideTo", 2); }	
		if(key == 52){ $(".slider .slides").trigger("slideTo", 3); }	
		if(key == 53){ $(".slider .slides").trigger("slideTo", 4); }	
		if(key == 54){ $(".slider .slides").trigger("slideTo", -6); }	
		if(key == 55){ $(".slider .slides").trigger("slideTo", -5); }	
		if(key == 56){ $(".slider .slides").trigger("slideTo", -4); }	
		if(key == 57){ $(".slider .slides").trigger("slideTo", -3); }	
		if(key == 48){ $(".slider .slides").trigger("slideTo", -2); }
		if(key == 13){ $(".slider .slides").trigger("slideTo", -1); }	
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
				
			if($(".slider .slides > li.list").hasClass("active") == true) {
				$(".agenda-events").css("width", "555px");
				$('.agenda-events').height(lastListH);
			}
			else {
				$(".agenda-events").css("width", "100px");	
				$('.agenda-events').height(100);
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

function test(message)
{
	if (message == "test")
	{
		alert(message);
	}
	else
	{
		alert('fout'.message);
	}
}