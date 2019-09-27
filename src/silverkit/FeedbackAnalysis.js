/**
 * If the user press for a long time a button.
 * They might actually not see properly a haptic feedback.
 *
 * We need then to improve the feedback.
 *
 * We then are as well pretty sure it was meant to be a click
 * So increase probability of missclick detection.
 */

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("touchstart", () => {
    console.log("Start pressing");
  });

  window.addEventListener("touchend", () => {
    console.log("Stop pressing");
  });
});
