const redisLib = require('redis');
const restifyLib = require('restify');
const socketIOLib = require("socket.io");

const map = require('./maps/sample.json');

// const redis = redisLib.createClient();
// redis.connect();
// redis.on('error', err => console.log('Redis client error: ', err));

const server = restifyLib.createServer();
server.use(restifyLib.plugins.bodyParser());

const io = new socketIOLib.Server(server.server, {
    cors: { origin: '*', allowedHeaders: ["*"] }
});

io.on('connection', socket => {
    socket.emit('map', map);

    socket.broadcast.emit('userEntered', { id: socket.id, x:0, y:0, d:0 });

    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', { id: socket.id });
    });

    socket.on('userMoved', (position) => {
        socket.broadcast.emit('userMoved', { id: socket.id, ...position });
    })
});

server.listen(8080, () => console.log('server is up at 8080'));