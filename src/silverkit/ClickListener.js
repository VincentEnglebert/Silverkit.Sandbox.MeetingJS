/**
 * return the distance between two points.
 *
 * @param {number} x1		x position of first point
 * @param {number} y1		y position of first point
 * @param {number} x2		x position of second point
 * @param {number} y2		y position of second point
 * @return {number} 		distance between given points
 */
Math.getDistance = function(x1, y1, x2, y2) {
  var xs = x2 - x1,
    ys = y2 - y1;

  xs *= xs;
  ys *= ys;

  return Math.sqrt(xs + ys);
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for click listener.");

  const elementsToObserve = document.querySelectorAll("[data-sk-intent-click]");

  window.addEventListener("click", event => {
    const clickX = event.clientX;
    const clickY = event.clientY;

    let closestElement = null;
    let closestElementDistance = null;

    elementsToObserve.forEach(element => {
      const elementCenterX = element.offsetLeft + element.offsetWidth / 2;
      const elementCenterY = element.offsetTop + element.offsetHeight / 2;

      const distanceBetweenClickAndElementCenter = Math.getDistance(
        clickX,
        clickY,
        elementCenterX,
        elementCenterY
      );

      if (closestElement === null || closestElementDistance === null) {
        closestElement = element;
        closestElementDistance = distanceBetweenClickAndElementCenter;
      }

      if (closestElementDistance > distanceBetweenClickAndElementCenter) {
        closestElement = element;
        closestElementDistance = distanceBetweenClickAndElementCenter;
      }
    });

    // If nothing is found, abort.
    if (!closestElement) return;

    const isClickInsideElementBounds = closestElement === event.target;

    let resultClick = null;

    if (isClickInsideElementBounds) {
      resultClick = "Hit";
    } else {
      resultClick = "Miss";
    }

    let log = `Time: ${Date.now()} \nType: Cick\nTarget: ${resultClick}\nDistanceFromTargetCenter: ${closestElementDistance}`;

    console.log(log);

    // Logic that shouldn't be here

    if (!isClickInsideElementBounds) {
      // Check if it's part of a click group
      const group = closestElement.dataset.skIntentClickGroup;

      if (group) {
        // If it is, we update all the group at once
        const groupElements = document.querySelectorAll(
          `[data-sk-intent-click-group=${group}]`
        );
        groupElements.forEach(element => {
          increaseTextSize(element);
        });
      } else {
        // Else we only update the element
        increaseTextSize(closestElement);
      }
    }
  });
});

function increaseTextSize(element) {
  const style = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-size");
  const fontSize = parseFloat(style);
  element.style.fontSize = fontSize + 0.05 * fontSize + "px";
}
