function handleOrientation(event) {
  let absolute = event.absolute;
  let alpha = event.alpha;
  let beta = event.beta;
  let gamma = event.gamma;

  console.log(absolute);
  console.log(alpha);
  console.log(beta);
  console.log(gamma);

  // document.getElementById("mobile").textContent =
  //  alpha + ", " + beta + ", " + gamma;
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientationEvent is supported");
    window.addEventListener("deviceorientation", handleOrientation, true);
  } else {
    console.log("DeviceOrientationEvent is not supported");
    document.getElementById("mobile").textContent = "not supported!";
    window.addEventListener("deviceorientation", handleOrientation, true);
  }
});
