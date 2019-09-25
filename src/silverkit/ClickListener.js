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

    const isClickInsideElementBounds = closestElement === event.target;

    if (isClickInsideElementBounds) {
      console.log("HIT !");
    } else {
      console.log("MISS ! by " + closestElementDistance);
    }

    // What relative distance to the element size can be considered as to far to be
    // taken into account ?
  });
});
