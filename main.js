var socket = new WebSocket("ws://localhost:8000/ws/");
var lastTime = 0;
socket.onopen = () => {
  socket.send("connected");
};

window.addEventListener("devicemotion", (event) => {
  var data = {
    event: "devicemotion",
    acceleration: {
      x: event.acceleration.x,
      y: event.acceleration.y,
      z: event.acceleration.z,
    },
    interval: event.interval,
  };
  var now = new Date().getTime();
  if (now - lastTime > 100) {
    socket.send(JSON.stringify(data));
    lastTime = now;
  }
});

window.addEventListener("deviceorientation", (event) => {
  var data = {
    event: "deviceorientation",
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
  };
  var now = new Date().getTime();
  if (now - lastTime > 100) {
    socket.send(JSON.stringify(data));
    lastTime = now;
  }
});
