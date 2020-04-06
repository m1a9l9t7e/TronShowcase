const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Server = require("http").Server;
const app = express();
const server = Server(app);

// ========== MONGODB ==========
// const database = require('./database');

// ========== SOCKET.IO ==========
const io = require("socket.io")(server);
const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");
io.use(sharedsession(session, {
    autoSave: true
}));

io.on('connection', function (socket) {
    socket.handshake.session.socket_id = socket.id;
    socket.handshake.session.save();

    // === GENERAL PURPOSE ===
    socket.on('initial-connection', info => {
        console.log("initial connection from client " + info)
    });
});

// ========== LOCAL STUFF ==========
app.use(express.static(path.join(__dirname, '.')));
app.use(express.static(path.join(__dirname, './public/js')));
app.use(express.static(path.join(__dirname, './public/assets')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session);

// ========== EXPRESS ==========
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/showcase.html'));
    // res.sendFile(path.join(__dirname + '/public/views/test.html'));
});


server.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
