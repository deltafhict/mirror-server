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

        // Send the request to the database.
        postToDatabase(user, type, app, action);

        switch (app) {
            case 'gesture':
                if (action === 'swipeToLeft') {
                    $(".slider .slides").trigger("next");
                } else if (action === 'swipeToRight') {
                    $(".slider .slides").trigger("prev");
                } else if (action === 'swipeDown') {
                    openFav();
                }
                else if (action === 'swipeUp') {
                    closeFav();
                }else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'agenda':
                if (action === 'open') {
                    $(".slider .slides").trigger("slideTo", 4);
                } else if (action === 'close') {
                    $(".agenda-events").css("width", "0");
                    $(".agenda-events").height(0);
                    $(".slider .slides").trigger("slideTo", 3);
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'slack':
                if (action === 'pm') {
                    console.log('Going to PM a person...');
                } else if (action === 'post') {
                    console.log('Going to post to a #channel...');
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'twitter':
                if (action === 'showFeed') {
                    console.log('Going to show feed...');
                } else if (action === 'dm') {
                    console.log('Going to DM a person...');
                } else if (action === 'tweet') {
                    console.log('Going to tweet...');
                } else {
                    console.log('Unknown action:', action, 'of type', type);
                }
                break;

            case 'health':
                if (action === 'showBPM') {
                    console.log('Goign to show BPM');
                } else {
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