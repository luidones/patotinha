const restifyLib = require('restify');
const restifyCors = require('restify-cors-middleware2');
const socketIOLib = require("socket.io");
const { OAuth2Client: GoogleAuth } = require('google-auth-library');

const auth = new GoogleAuth();

const cors = restifyCors({
    origins: ['*'],
    allowHeaders:['Authorization']
});

const server = restifyLib.createServer();
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyLib.plugins.bodyParser());
server.use(async (req, res) => {
    const idToken = (req.headers.authorization||'').split(' ')[1];
    const token = await auth.verifyIdToken({ idToken })
    req.user = token.getPayload();
});

const io = new socketIOLib.Server(server.server, {
    cors: { origin: '*', allowedHeaders: ["*"] }
});

io.use((socket, next) => {
    const idToken = socket.handshake.auth.token;
    auth.verifyIdToken({ idToken })
        .then(token => {
            socket.user = token.getPayload();
            next();
        })
        .catch(e => next(new Error(e)));
});

io.on('connection', socket => {
    
});

server.listen(8080, () => console.log('server is up at 8080'));