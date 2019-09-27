<template>
  <button
    @click="action"
    data-sk-intent-click
    class="text-xs uppercase font-semibold text-gray-500 border-2 border-gray-500 hover:bg-gray-500 hover:text-gray-100 px-2 py-1 rounded"
  >{{ text }}</button>
</template>

<script>
import SilverKitTaskTimeTracker from "@/silverkit/TaskTimeTracker.js";

export default {
  props: ["text"],

  data() {
    return {
      tracker: new SilverKitTaskTimeTracker("click_test")
    };
  },

  methods: {
    action() {
      this.tracker.start();
    }
  }
};
</script>