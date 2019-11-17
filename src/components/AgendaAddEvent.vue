<template>
  <div v-show="date" class="sticky bottom-0 text-center mt-4 pb-2">
    <button
      class="text-sm uppercase bg-purple-600 hover:bg-purple-700 text-purple-100 px-4 py-2 rounded shadow-lg"
    >
      <span class="font-bold">Add event</span> on
      {{ date.format("dddd D MMMM") }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["date"],
  data() {
    return {};
  }
};
</script>
