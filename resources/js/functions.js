//Variables
var key = 0;
var favActive = 1;
var menuTop;

//Processing
menuTop = $('.navigation').offset().top;
menuTop = menuTop - 200;

//Debugging
console.log('top: ' + menuTop);

$(window).load(function() {
});

$(document).ready(function() {

	startTime();

	$(".fav-nav ul li").eq(favActive).addClass("active");

	$(document).keydown(function(e) {
        key = e.which;
		console.log(key);

		if(key == 9) {
			openDevice();
		}

		if(key == 192) {
			$(".agenda-events .events ul").toggleClass("full");
			$(".slider .slides").toggleClass("full");
			$(".fav-nav ul").toggleClass("full");
		}

		if(key == 13){
			agendaDetail();
		} else {
			agendaOverview();
		}

		if(key == 37 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("prev"); }
		if(key == 39 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("next"); }

		if(key == 38){
			favActive--;

			if(favActive == -1){ favActive = 2; }

			$(".fav-nav ul li").removeClass("active");
			$(".fav-nav ul li").eq(favActive).addClass("active");
		}

		if(key == 40){
			favActive++;

			if(favActive == 3){ favActive = 0; }

			$(".fav-nav ul li").removeClass("active");
			$(".fav-nav ul li").eq(favActive).addClass("active");
		}

		if(key == 38 || key == 40){
			if($(".fav-nav ul > li.list").hasClass("active")) {
				openAgenda();
			}
			else {
				closeAgenda();
			}
		}

		if(key == 49){ openFav(); } //Key 1 opens favorite menu
		if(key == 50){ closeFav(); } //Key 2 closes favorite menu
		if(key == 27){ openNav(); } //Key Esc opens main menu
    });

	$(function() {

		var $highlight = function(){
			var $this = $(".slider .slides");

			//get all visible items (in this case 3 slides)
			var items = $this.triggerHandler("currentVisible");

			// remove all .active classes
			$this.children().removeClass("active");
			$this.children().addClass("inactive");

			//add .active class to 2nd / centered item
			items.filter(":eq(2)").addClass("active").removeClass("inactive");

			if($(".slider .slides > li.list").hasClass("active")){
				openAgenda();
			}
			else if($(".slider .slides > li.weather").hasClass("active")){
				openWeather();
			}
			else {
				closeAgenda();
				closeWeather();
			}
		}

		$('.slider .slides').carouFredSel({
			width: '100%',
			height: 100,
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

function openDevice() {
	$(".logo").fadeIn(3000, function(){
		$(".logo").fadeOut(1000, function(){
			$(".fav-nav").fadeIn();
		});
	});
}

/* EVENTS */
function openFav() {
	$('.fav-nav').fadeIn();
}
function closeFav() {
	$('.fav-nav').fadeOut();
}

function openNav() {
	$('.navigation').toggleClass('active');
}

function openAgenda(){
	$('.agenda-events').css('width', '300px');
	$('.agenda-events').height(menuTop);
}
function closeAgenda(){
	$('.agenda-events').css('width', '0');
	$('.agenda-events').height(0);
}

function openWeather(){
	$('.weatherLoad').css('width', '500px');
	$('.weatherLoad').height(menuTop);
}
function closeWeather(){
	$('.weatherLoad').css('width', '0');
	$('.weatherLoad').height(0);
}

function agendaDetail(){
	$('.agenda-events .events ul > li').not(':nth-child(1)').css('display', 'none');
	$('.agenda-events .events ul > li .description').css('display', 'block');
}
function agendaOverview(){
	$('.agenda-events .events ul > li').not(':nth-child(1)').css('display', 'block');
	$('.agenda-events .events ul > li .description').css('display', 'none');
}

/* STATIC SCRIPTS */
function startTime() {
	var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];

    var date = new Date();
	var month = date.getMonth();
	var day = date.getDay();

	var notation;
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

	document.getElementById('day').innerHTML = dayNames[day];
	document.getElementById('date').innerHTML = monthNames[month] + " " + day;
    document.getElementById('time').innerHTML = h + ":" + m + "<div class='second'>" + s + "</div>";
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}
