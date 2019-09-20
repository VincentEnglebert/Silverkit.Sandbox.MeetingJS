document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready for click listener.");

  const elementsToObserve = document.querySelectorAll("[data-sk-intent-click]");

  console.log(elementsToObserve);

  window.addEventListener("click", event => {
    const target = event.target;

    console.log(event);

    elementsToObserve.forEach(element => {});

    /**
     * Todo
     * See if click is within boundings of elements
     * don't forget that the analysis should be done on the
     * server, not here. So raw log info is good.
     *
     */
  });
});
