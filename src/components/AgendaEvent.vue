<template>
  <div
    class="shadow bg-white rounded p-4 my-2 w-full border-b-4"
    :style="{ 'border-bottom-color': category.backgroundColor }"
  >
    <div class="flex justify-between">
      <div>
        <h1 class="text-gray-800 font-semibold">Event name</h1>
        <span class="text-gray-500 uppercase text-xs">hours</span>
      </div>
      <div class="flex items-center">
        <action-button text="Détails"></action-button>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";

export default {
  components: { ActionButton },

  props: {
    category: {
      type: Object,
      default() {
        return {
          id: 0,
          title: "default-category",
          textColor: "black",
          backgroundColor: "#dee2e5"
        };
      }
    },
    event: {
      type: Object
    }
  }
};
</script>
