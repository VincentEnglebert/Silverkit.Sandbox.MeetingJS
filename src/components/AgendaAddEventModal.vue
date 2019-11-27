<template>
  <div>
    <div
      v-if="isOpen"
      class="h-screen absolute top-0 bottom-0 left-0 right-0 bg-black opacity-25"
    ></div>
    <div v-if="isOpen" class="h-screen absolute top-0 bottom-0 left-0 right-0">
      <div class="flex h-full justify-center items-center p-4">
        <div
          class="bg-purple-500 text-purple-100 p-4 rounded opacity-100 shadow-lg w-full"
        >
          <h2 class="text-xl">Ajouter un évènement</h2>

          <div
            class="text-center my-4 py-4 bg-purple-400 rounded text-lg font-semibold shadow-inner"
          >
            Le {{ date.format("dddd D MMMM") }}
          </div>

          <div>
            <p class="text-lg">{{ title }}</p>
            <br />
            <p class="text-lg">{{ from }} - {{ to }}</p>
          </div>

          <div class="flex justify-center items-center mt-2">
            <button
              class="bg-purple-400 hover:bg-purple-300 text-sm tracking-wider font-semibold uppercase px-2 py-1 rounded shadow"
              @click="close"
            >
              Confirmer
            </button>
          </div>

          <div class="flex justify-end items-center">
            <button
              class="uppercase text-xs hover:bg-purple-400 px-2 py-1 rounded"
              @click="close"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";

// import moment from "moment";

export default {
  props: {
    isOpen: {},
    date: {}
  },

  data() {
    return {
      to: "19h00",
      from: "09h00"
    };
  },

  computed: {
    title() {
      return "Event name";
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },

    create() {}
  }
};
</script>
