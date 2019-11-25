<template>
  <div v-if="date" class="sticky bottom-0 text-center mt-4 pb-2">
    <button
      class="text-sm uppercase bg-purple-600 hover:bg-purple-700 text-purple-100 px-4 py-2 rounded shadow-lg transition-all transition-slowest ease-out"
      @click="trigger"
    >
      <span class="font-bold">Ajouter</span>
      le
      {{ date.format("dddd D MMMM") }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["date"],
  data() {
    return {};
  },

  methods: {
    trigger() {
      this.$emit("addEvent", this.date);
    }
  }
};
</script>
