const http = require('http');
const ws = require('websocket').server;

const PORT = process.env.PORT || 3005;
let connection = null;


const bidHistory = [40, 20, 10, 5]

const server = http.createServer((req,res) => {
    console.log('recieved request to HTTP');
});

const websocket = new ws({
    "httpServer": server
})

websocket.on('request', req => {
    console.log('new request attempt from ', req.origin)
    connection = req.accept(null, req.origin)
    connection.on('open', e => console.log('connection has opened with client'))
    connection.send(`Payload: ${bidHistory}`)
    connection.on('closed', e => console.log('connection has closed'))
    connection.on('message', e => console.log(`Recieved message ${e.utf8Data}`))
    connection.on('yolo', e => console.log(`Recieved message ${e.utf8Data}`))
})


server.listen(PORT, () => console.log(`listening on ${PORT}`));



// Useful Links
// https://www.npmjs.com/package/websocket
// https://github.com/theturtle32/WebSocket-Node/blob/HEAD/docs/index.md