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

		//Face callibration debug
		if(key == 49) {
			$('.face-setup').fadeIn();
			$('.face-setup .title').fadeIn();
		}
		if(key == 50) {
			$('.face-setup .title').fadeOut(function(){
				$('.face-setup .dot').css('opacity', '1');
			});
		}
		if(key == 51) {
			$('.face-setup .dot').removeClass('bottom');
			$('.face-setup .dot').removeClass('right');
			$('.face-setup .dot').addClass('left');
		}
		if(key == 52) {
			$('.face-setup .dot').removeClass('bottom');
			$('.face-setup .dot').removeClass('left');
			$('.face-setup .dot').addClass('right');
		}
		if(key == 53) {
			$('.face-setup .dot').removeClass('left');
			$('.face-setup .dot').removeClass('right');
			$('.face-setup .dot').addClass('bottom');
		}
		if(key == 54) {
			$('.face-setup .dot').css('opacity', '0');
			setTimeout( function(){
				$('.face-setup .dot').removeClass('left');
				$('.face-setup .dot').removeClass('right');
				$('.face-setup .dot').removeClass('bottom');
			}  , 1000 );
			$('.face-setup .finish').fadeIn(1000, function(){
				$('.face-setup').fadeOut(1000);
				$('.face-setup .finish').fadeOut(1000);
			});
		}

		//Voice callibration debug
		if(key == 35) {
			$('.voice-setup').fadeIn();
			$('#part1').fadeIn();
		}
		if(key == 40) {
			$('#part1').fadeOut(0, function(){
				$('#part2').fadeIn();
			});
		}
		if(key == 34) {
			$('#part2').fadeOut(0, function(){
				$('#part3').fadeIn();
			});
		}
		if(key == 37) {
			$('#part3').fadeOut(0, function(){
				$('#part4').fadeIn();
			});
		}
		if(key == 12) {
			$('#part4').fadeOut(0, function(){
				$('#part5').fadeIn(1000, function(){
					$('.voice-setup .title').fadeOut(1000);
					$('.voice-setup').fadeOut(1000);
				});
			});
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
				openWeather(window.weatherLocation);
				closeAgenda();
				closeTraffic();
			}
			else if($(".slider .slides > li.car").hasClass("active")){
				closeWeather();
				openTraffic();
			}
			else {
				closeTraffic();
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
  $(".navigation").addClass("active");
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

function openTraffic(){
	$('.traffic-app').addClass('active');
	$('.traffic-app').height(menuTop);
}
function closeTraffic(){
	$('.traffic-app').removeClass('active');
}

function openWeather(location){
	getWeather(location);
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

function getWeather(location) {
	if (location === null) {
		location = 'Eindhoven';
	}

	$.simpleWeather({
		woeid: '', //EINDHOVEN729028
		location: location,
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
