var net = require('net');

var server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(3000, '127.0.0.1');
console.log('listening on 127.0.0.1:3000');