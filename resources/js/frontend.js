$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        console.log('Sorry, but your browser doesn\'t support WebSockets.');

        input.hide();
        $('span').hide();
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
    };

    connection.onerror = function (error) {
        // there were some problems with connection
        console.log('Sorry, but there\'s some problem with your connection or the server is down.');
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like valid JSON:', message.data);
            return;
        }

        var user = json['data']['person'];
        var type = json['data']['type']; // voice or gesture
        var app = json['data']['app'];
        var action = json['data']['action'];
        var weatherLocation = json['data']['weatherLocation'];

        // Send the request to the database.
        postToDatabase(user, type, app, action);

        if (type === "facerecognition") {
            if (action === null) {
                console.log('Failed recognition.');
            } else {
                console.log('Recognized ', action);
                getWeatherForPerson(action);
            }
        }

        switch (app) {
            case 'gesture':
                if (action === 'swipeToLeft') {
                    $(".slider .slides").trigger("next");
                } else if (action === 'swipeToRight') {
                    $(".slider .slides").trigger("prev");
                } else if (action === 'swipeDown') {
                    // To be implemented.
                } else if (action === 'swipeUp') {
                    // To be implemented.
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'agenda':
                if (action === 'open') {
                    $(".slider .slides").trigger("slideTo", 4);
                } else if (action === 'close') {
                    $(".slider .slides").trigger("slideTo", 3);
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'traffic':
                if (action === 'open') {
                    $(".slider .slides").trigger("slideTo", 6);
                } else if (action === 'close') {
                    $(".slider .slides").trigger("slideTo", 3);
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'weather':
                if (action === 'open') {
                    if (weatherLocation !== null) {
                        openWeather(weatherLocation);
                    }

                    $(".slider .slides").trigger("slideTo", 5);
                } else if (action === 'close') {
                    $(".slider .slides").trigger("slideTo", 3);
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'opus':
                if (action === 'on') {
                    openDevice();
                }

                else if (action === 'off') {
                    closeAnimation();
                }
				$("video").on('ended',function(){
				  $("video").fadeOut();
				});
                break;

            case 'face learning':
                if (action === 'start') {

                    console.log('Unknown action:', action, 'of type', type);
					$('.face-setup').fadeIn();
                    $('#part1').fadeIn();

                } else if (action === 'forward') {
					$('.face-setup .title').fadeOut(function(){
                        $('#part2').fadeIn();
						$('.face-setup .dot').css('opacity', '1');
                        $('.face-setup .dot').removeClass('left');
                        $('.face-setup .dot').removeClass('right');
                        $('.face-setup .dot').removeClass('bottom');
					});

                } else if (action === 'left') {
					$('.face-setup .dot').removeClass('bottom');
					$('.face-setup .dot').removeClass('right');
					$('.face-setup .dot').addClass('left');

                } else if (action === 'right') {
					$('.face-setup .dot').removeClass('bottom');
					$('.face-setup .dot').removeClass('left');
					$('.face-setup .dot').addClass('right');

                } else if (action === 'down') {
					$('.face-setup .dot').removeClass('left');
					$('.face-setup .dot').removeClass('right');
					$('.face-setup .dot').addClass('bottom');

                } else if (action === 'finish') {
                    $('#part2').fadeOut(function(){
    					$('.face-setup .dot').css('opacity', '0');
    					setTimeout( function() {
    						$('.face-setup .dot').removeClass('left');
    						$('.face-setup .dot').removeClass('right');
    						$('.face-setup .dot').removeClass('bottom');
    					}  , 1000 );
    					$('.face-setup .finish').fadeIn(1000, function(){
    						$('.face-setup').fadeOut(1000);
    						$('.face-setup .finish').fadeOut(1000);
    					});
                    });

                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'voice calibration':

                    if (action === 'open voice calibration'){
                        console.log('Unknown app:', app, 'with action', action, 'of type', type);

                        $('.voice-setup').fadeIn();
                        $('#part1').fadeIn();
                        $('#part1').delay(1000).fadeOut(function(){
                            $('#part6').delay(1000).fadeIn();
                        });

                    }else if (action === 'close mail'){
                        $('#part6').fadeOut(function(){
                            $('#part2').fadeOut(function(){
                                 $('#part2').fadeIn();
                             });
                        });

                    }else if (action === 'tumbleweed'){
                        $('#part2').fadeOut(function(){
                            $('#part3').fadeOut(function(){
                                 $('#part3').fadeIn();
                             });
                        });

                    }else if (action === 'colonel'){
                        $('#part3').fadeOut(function(){
                            $('#part4').fadeOut(function(){
                                 $('#part4').fadeIn();
                             });
                        });

                    }else if (action === 'finish'){
                        $('#part4').fadeOut(function(){
                            $('#part5').fadeIn(1000, function(){
                                $('.voice-setup .title').fadeOut(1000);
                                $('.voice-setup').fadeOut(1000);
                            });
                        });

                    }else{
                        console.log('Unknown action:', action, 'of type', type);
                    }

                break;

            default:
                console.log('Unknown app:' , app, 'with action', action, 'of type', type);
                break;
        }
    };
});

/**
 * Posts the task to the database.
 * @param  {String} user The user of the task.
 * @param  {String} type The type of the task.
 * @param  {String} app The app the task was for.
 * @param  {String} action The action performed.
 */
function postToDatabase(user, type, app, action) {
    if (user === null || user === "") {
        user = "undefined";
    } else if (type === null || type === "") {
        return;
    } else if (app === null || app === "") {
        return;
    } else if (action === null || action === "") {
        return;
    }

    var baseURL = 'php/postAction.php';
    var params = '?user=' + user +
                    '&type=' + type +
                    '&app=' + app +
                    '&action=' + action;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', baseURL + params, true);
    xmlhttp.send();
}

function getWeatherForPerson(person) {
    if (person === null) {
        return;
    }

    var baseURL = 'php/getWeather.php';
    var params = '?person=' + person;

    xmlhttp = new XMLHttpRequest();

    xmlhttp.open('POST', baseURL + params, true);
    xmlhttp.send();
}