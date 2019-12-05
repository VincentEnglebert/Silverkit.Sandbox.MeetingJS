<template>
  <!-- 
data-sk-intent-click
data-sk-intent-click-group="edit-button-group" 
  -->

  <button
    data-sk-intent-click
    data-sk-intent-click-group="edit-button-group"
    @click="action"
    class="text-xs tracking-tight uppercase text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-gray-100 px-2 py-1 rounded"
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