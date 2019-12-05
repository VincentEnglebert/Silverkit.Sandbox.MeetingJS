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

window.addEventListener("load", () => {
  console.log("DOM is ready for click listener.");

  const elementsToObserve = document.querySelectorAll("[data-sk-intent-click]");
  console.log(elementsToObserve);

  window.addEventListener("click", event => {
    let shouldAbort = false;

    elementsToObserve.forEach(element => {
      if (element == event.target) shouldAbort = true;
    });

    if (shouldAbort) {
      return;
    }

    const clickX = event.clientX;
    const clickY = event.clientY;

    let closestElement = null;
    let closestElementDistance = null;

    elementsToObserve.forEach(element => {
      const elementCenterX =
        element.getBoundingClientRect().left +
        element.getBoundingClientRect().width / 2;
      const elementCenterY =
        element.getBoundingClientRect().top +
        element.getBoundingClientRect().height / 2;

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
      // Check if it is not too far to be considered a missclick
      const smallestBetweenWidthAndHeight = Math.min(
        closestElement.getBoundingClientRect().width / 2,
        closestElement.getBoundingClientRect().height / 2
      );

      const distanceConsideredTooFar = 2.2 * smallestBetweenWidthAndHeight;

      console.log(distanceConsideredTooFar);
      console.log(closestElementDistance);
      console.log(closestElement.offsetLeft + closestElement.offsetWidth / 2);

      if (closestElementDistance > distanceConsideredTooFar) {
        return;
      }

      console.log(closestElement.style.width);

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
