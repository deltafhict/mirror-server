"use strict";

exports.broadcastMessage = function(clients, message) {
  var json = JSON.stringify({
    type:'message',
    data: message
  });

  for (var i=0; i < clients.length; i++) {
    clients[i].sendUTF(json);
  }
};

exports.sendMessage = function(client, message) {
  var json = JSON.stringify({
    type:'message',
    data: message
  });

  client.sendUTF(json);
};
