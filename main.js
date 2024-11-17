var socket = new WebSocket("wss://phonemouseweb.onrender.com/ws");
var lastTime = 0;
socket.onopen = () => {
  socket.send("connected");
};

var fakeAccel = [0, 0, 0];
var fakeOrient = [0, 0, 0];
var fakeType = 0;
var fakeInterval = 100;

var alpha = 0;
var beta = 0;
var gamma = 0;
var accelX = 0;
var accelY = 0;
var accelZ = 9.8; // Гравитация по оси Z
var lastTime = new Date().getTime();

// Фазы движения
var phase = 0; // 0 - вверх/вниз, 1 - диагональ влево, 2 - влево/вправо, 3 - диагональ вправо
var direction = 1; // Направление движения

setInterval(() => {
  switch (phase) {
    case 0:
      // Движение вверх-вниз
      beta += direction * 2; // Наклон вперед/назад
      if (beta > 30 || beta < -30) {
        direction *= -1; 
        phase = 1; // Переходим к следующей фазе (диагональ влево)
      }
      break;

    case 1:
      // Движение по диагонали до левой стороны
      gamma -= 1; // Наклон влево
      beta += 1; // Наклон вниз
      if (gamma < -30 || beta > 30) {
        phase = 2; // Переходим к фазе влево/вправо
      }
      break;

    case 2:
      // Движение влево-вправо
      gamma += 2; // Колебания влево-вправо
      if (gamma > 30) {
        direction = -1;
      }
      if (gamma < -30) {
        direction = 1;
      }
      if (Math.abs(gamma) > 30) {
        phase = 3; // Переходим к фазе диагонали вправо
      }
      break;

    case 3:
      // Движение по диагонали вправо
      gamma += 1; // Наклон вправо
      beta -= 1; // Наклон вверх
      if (gamma > 30 || beta < -30) {
        phase = 0; // Переход к фазе вверх/вниз
      }
      break;
  }

  var data = {
    event: "deviceorientation",
    alpha: alpha, // Постепенное изменение вокруг оси Z
    beta: beta, // Наклон вперед-назад
    gamma: gamma, // Наклон влево-вправо
  };

  var now = new Date().getTime();
  if (now - lastTime > 100) {
    console.log(data);
    // Здесь предполагается, что `socket` определен и открыт
    socket.send(JSON.stringify(data));
    lastTime = now;
  }
}, fakeInterval);

// window.addEventListener("devicemotion", (event) => {
//   var data = {
//     event: "devicemotion",
//     acceleration: {
//       x: event.acceleration.x,
//       y: event.acceleration.y,
//       z: event.acceleration.z,
//     },
//     interval: event.interval,
//   };
//   var now = new Date().getTime();
//   if (now - lastTime > 100) {
//     console.log(data);
//     socket.send(JSON.stringify(data));
//     lastTime = now;
//   }
// });

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
