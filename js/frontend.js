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
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        var app = json['data']['app'];
        var action = json['data']['action'];
        var type = json['data']['type']; // voice or gesture

        switch (app) {
            case 'agenda':
                if (action === 'open') {
                    $(".slider .slides").trigger("slideTo", 0);
                } else if (action === 'close') {
                    $(".agenda-events").css("width", "100px");
                    $('.agenda-events').height(100);
                } else {
                    console.log('Unknown action');
                }
                break;
            default:
                console.log('Unknown app');
                break;
        }
    };
});