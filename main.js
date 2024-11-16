if (window.DeviceOrientationEvent) {
  window.addEventListener(
    "deviceorientation",
    (event) => {
      tilt([event.beta, event.gamma]);
    },
    true
  );
} else if (window.DeviceMotionEvent) {
  window.addEventListener(
    "devicemotion",
    (event) => {
      tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
    },
    true
  );
} else {
  window.addEventListener(
    "MozOrientation",
    (event) => {
      tilt([event.x * 50, event.y * 50]);
    },
    true
  );
}
