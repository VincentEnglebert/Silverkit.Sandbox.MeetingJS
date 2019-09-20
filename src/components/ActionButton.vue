<template>
  <button
    data-sk-intent-click
    class="text-xs uppercase font-semibold text-gray-500 border-2 border-gray-500 hover:bg-gray-500 hover:text-gray-100 px-2 py-1 rounded"
  >{{ text }}</button>
</template>

<script>
export default {
  props: ["text"],

  methods: {
    increaseTextSize(element) {
      var style = window
        .getComputedStyle(element, null)
        .getPropertyValue("font-size");
      var fontSize = parseFloat(style);
      element.style.fontSize = fontSize + 0.05 * fontSize + "px";
    }
  }
};
</script>