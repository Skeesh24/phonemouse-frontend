document.getElementById("status").innerHTML =
  "DeviceOrientationEvent: " +
  (window.DeviceOrientationEvent ? "" : "not ") +
  "supported<br>";
document.getElementById("status").innerHTML +=
  "DeviceMotionEvent: " +
  (window.DeviceMotionEvent ? "" : "not ") +
  "supported<br>";
document.getElementById("status").innerHTML +=
  "MozOrientation: " +
  (window.onMozOrientation ? "" : "not ") +
  "supported<br>";

if (window.DeviceOrientationEvent) {
  window.addEventListener(
    "deviceorientation",
    (event) => {
      document.getElementById("status").innerHTML =
        "beta: " + event.beta + "<br>gamma: " + event.gamma;
    },
    true
  );
} else if (window.DeviceMotionEvent) {
  window.addEventListener(
    "devicemotion",
    (event) => {
      document.getElementById("status").innerHTML =
        "acceleration: x=" +
        event.acceleration.x +
        ", y=" +
        event.acceleration.y +
        ", z=" +
        event.acceleration.z;
    },
    true
  );
} else {
  window.addEventListener(
    "MozOrientation",
    (event) => {
      document.getElementById("status").innerHTML =
        "x: " + event.x + "<br>y: " + event.y;
    },
    true
  );
}
