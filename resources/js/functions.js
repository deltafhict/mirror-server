//Variables
var key = 0;
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

	$(document).keydown(function(e) {
        key = e.which;
		console.log(key);

		if(key == 9) {
			openDevice();
		}

		if(key == 37 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("prev"); }
		if(key == 39 && $(".navigation").hasClass("active")){ $(".slider .slides").trigger("next"); }

		if(key == 27){
			openNav();
			$(".slider .slides").trigger("slideTo", 3);
		} //Key Esc opens main menu
    });

	$(function() {

		var $highlight = function(){
			var $this = $(".slider .slides");

			//get all visible items (in this case 3 slides)
			var items = $this.triggerHandler("currentVisible");

			// remove all .active classes
			$this.children().removeClass("active");

			//add .active class to 2nd / centered item
			items.filter(":eq(2)").addClass("active");

			if($(".slider .slides > li.list").hasClass("active")){
				openAgenda();
				closeWeather();
			}
			else if($(".slider .slides > li.weather").hasClass("active")){
				openWeather();
				closeAgenda();
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
		});
	});

});

function openDevice() {
	$("video source").attr('src',"resources/images/opus.mp4");
	$("video")[0].load();
	$("video").show();
	$("video").get(0).play();
	setTimeout(function(){
		$("#opusOffBlack").fadeOut();
	},3000);
}
function closeAnimation() {
	$("video source").attr('src',"resources/images/opusOff.mp4");
	$("video")[0].load();
	$("video").fadeIn();
	$("video").get(0).play();
	$("#opusOffBlack").fadeIn();	
}

$("video").on('ended',function(){
  $("video").fadeOut();
  $(".navigation").toggleClass("active");
});

/* EVENTS */
function openNav() {
	$('.navigation').toggleClass('active');
}

function openAgenda(){
	$('.agenda-app').addClass('active');
	$('.agenda-app').height(menuTop);
}
function closeAgenda(){
	$('.agenda-app').removeClass('active');
}

function openWeather(){
	getWeather();
	$('.weather-app').addClass('active');
}
function closeWeather(){
	$('.weather-app').removeClass('active');
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

	document.getElementById('date').innerHTML = dayNames[day] + ", " + monthNames[month] + " " + day;
    document.getElementById('time').innerHTML = h + ":" + m;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function getWeather() {
	$.simpleWeather({
		woeid: '', //EINDHOVEN729028
		location: 'Eindhoven',
		unit: 'c',
		success: function(weather) {
			
			html = '<div class="avatar">';
				//html += '<div>' + weather.currently + '</div>';
				html += '<div class="info">';
					html += '<div class="temp">' + weather.temp + '&deg;</div>';
					html += '<div class="extra clear">';
						html += '<div class="min">' + weather.low + '&deg;</div>'; 
						html += '<div class="max">' + weather.high + '&deg;</div>';
						html += '<div class="type">' + weather.currently + '</div>';
					html += '</div>';
				html += '</div>';
			html += '</div>';
			
			html += '<div class="extra">';
				html += '<div class="city">' + weather.city + '</div>';
				html += '<div class="extra-sub">';
					html += '<div class="sub">Humidity <span>' + weather.humidity + '%</span></div>';
					html += '<div class="sub">Wind <span>' + weather.wind.speed + ' ' + weather.units.speed + '</span></div>';
					html += '<div class="sub">Direction <span>' + weather.wind.direction + '</span></div>';
				html += '</div>';
			html += '</div>';  

		  	$("#weather-app").html(html);
		},
		error: function(error) {
		  $("#weather-app").html('<p>'+error+'</p>');
		}
	  });
}
