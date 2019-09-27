/* eslint-disable no-unused-vars */

const increaseTextSize = element => {
  const style = window
    .getComputedStyle(element, null)
    .getPropertyValue("font-size");
  const fontSize = parseFloat(style);
  element.style.fontSize = fontSize + 0.05 * fontSize + "px";
};
