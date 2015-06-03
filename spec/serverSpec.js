var sf = require('../js/socket-functions');

describe("tests for socket-functions.js", function() {
  it("should send a message to a single client", function() {
    var client = { sendUTF: function(json){} }

    var spy = spyOn(client, 'sendUTF');

    sf.sendMessage(client, 'msg');
    client.sendUTF('');

    expect(spy).toHaveBeenCalled();
  });

  it("should send a message to a multiple clients", function() {
    var clients = [
      { sendUTF: function(json){} },
      { sendUTF: function(json){} }
    ]

    var spy1 = spyOn(clients[0], 'sendUTF');
    var spy2 = spyOn(clients[1], 'sendUTF');

    sf.broadcastMessage(clients, 'test msg');

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});
