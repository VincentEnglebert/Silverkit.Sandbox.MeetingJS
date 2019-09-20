<template>
  <div class="shadow bg-white rounded p-4 my-2 w-full">
    <div class="flex justify-between">
      <div>
        <h1 class="text-gray-800 font-semibold">Event name</h1>
        <span class="text-gray-500 uppercase text-xs">hours</span>
      </div>
      <div class="flex items-center">
        <action-button text="Edit"></action-button>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";

export default {
  components: { ActionButton }
};
</script>