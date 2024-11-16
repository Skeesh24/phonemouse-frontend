window.addEventListener("devicemotion", (event) => {
  var status = document.getElementById("status");
  status.innerText =
    "devicemotion: acceleration.x=" +
    event.acceleration.x +
    ", acceleration.y=" +
    event.acceleration.y +
    ", acceleration.z=" +
    event.acceleration.z +
    ", interval=" +
    event.interval;
});

window.addEventListener("deviceorientation", (event) => {
  var status = document.getElementById("status");
  status.innerText =
    "deviceorientation: alpha=" +
    event.alpha +
    ", beta=" +
    event.beta +
    ", gamma=" +
    event.gamma;
});
