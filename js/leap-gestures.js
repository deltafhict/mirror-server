// Setup Leap loop with frame callback function
var controllerOptions = {
    enableGestures: true
};

// Connect to the node.js server
var ws = new WebSocket('ws://localhost:1337');

Leap.loop(controllerOptions, function(frame) {
    // Check if a gesture was performed.
    for (var i = 0; i < frame.gestures.length; i++) {
        var gesture = frame.gestures[i];
        var handIds = gesture.handIds;
        if (handIds.length > 0) {
            var gestureHand = frame.hands[0];
        }

        switch (gesture.type) {
            case 'swipe':
                // Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                // Validate gestureHand
                if (!gestureHand || !gestureHand.valid) {
                    console.log('Invalid gestureHand: ' + gestureHand);
                    return;
                }
                var gestureDirection = getGestureDirection(gesture, gestureHand);
                if (gestureDirection) {
                    if (gestureDirection === '') {
                        console.log('Empty direction');
                        return;
                    }
                    // Check if gesture is ended
                    if (gesture.state === 'stop') {
                        console.log('Direction: ' + gestureDirection + ', hand ' + gestureHand.type);
                        sendMessage(gestureDirection);
                    }
                }
                break;
        }
    }
})

/**
 * Gets the direction of the performed gesture.
 * @param gesture The gesture that was performed.
 * @param hand The hand used in the gesture.
 *
 * @return string 'Right', 'left', 'up' or 'down'.
 */
function getGestureDirection(gesture, hand) {
    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    if (isHorizontal) {
        if (gesture.direction[0] > 0 && hand.type === 'left') {
            return 'swipeToRight';
        } else if (gesture.direction[0] < 0 && hand.type === 'right') {
            return 'swipeToLeft';
        }
    } else if (!isHorizontal) {
        if (gesture.direction[1] > 0) {
            return 'swipeUp';
        } else if (gesture.direction[1] < 0) {
            return 'swipeDown';
        }
    }
    return '';
}

/**
 * Sends a WebSocket message to the connected host.
 * @param gestureDirection The direction of the Gesture
 */
function sendMessage(gestureDirection) {
    ws.send('{"app": "gesture", "action": "'+ gestureDirection + '"}');
}