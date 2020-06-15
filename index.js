const app = require('express')()
const http = require('http').createServer(app)


app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    userSocket.broadcast.emit("Connected. Hello Dude.");
    console.log("Connect 1");

    userSocket.on("send_message", (data) => {
        console.log(data);
        userSocket.broadcast.emit("receive_message", data["message"]);
    })
})



http.listen(9000)