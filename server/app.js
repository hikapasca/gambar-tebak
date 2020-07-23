const express = require("express");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routers");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

io.on('connection', (socket) => {
  console.log('a user connected');
  // ketika ada orang yang terkoneksi socket yang diserver
  // saya akan ngbuat event emitter untuk client
  socket.emit('visited', "Hi kamu berhasik konek ke server kami");

  socket.on("gameStart", function (userScore) {
    io.emit("gameStart", userScore);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("nextQuestion", function (count) {
    socket.broadcast.emit("nextQuestion", count);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("pushAnswer", function (answer) {
    socket.broadcast.emit("pushAnswer", answer);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("resetAnswer", function () {
    socket.broadcast.emit("resetAnswer");
    // io.emit("new-message", messageDariClient)
  })

  socket.on("updateScore", function (user) {
    socket.broadcast.emit("updateScore", user);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("updatenext", function (data) {
    socket.broadcast.emit("updatenext", data);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("updateEnd", function (data) {
    socket.broadcast.emit("updateEnd", data);
    // io.emit("new-message", messageDariClient)
  })

  socket.on("toLeaderBoard", function () {
    socket.broadcast.emit("toLeaderBoard");
    // io.emit("new-message", messageDariClient)
  })
});

http.listen(PORT, () => {
  console.log(`NOW RUNNING ON PORT ${PORT}`);
});
