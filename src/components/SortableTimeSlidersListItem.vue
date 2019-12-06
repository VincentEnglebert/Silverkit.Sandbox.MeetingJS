<template>
  <div>
    <div class="bg-white mb-2 py-2 rounded shadow" :class="{'bg-red-200' :removed }">
      <div class="flex">
        <div class="flex justify-between items-center flex-col border-r border-dashed">
          <button
            @click="handle"
            class="text-2xl uppercase text-gray-400 pr-3 ml-1 pl-3 hover:text-blue-400 cursor-pointer"
            style="font-family:courier"
          >&udarr;</button>
          <button
            @click="toggle"
            class="text-2xl uppercase text-gray-400 pr-3 ml-1 pl-3 hover:text-red-400 cursor-pointer"
            :class="{'text-red-400' : removed}"
            style="font-family:courier"
          >&cross;</button>
          <button
            @click="clone"
            class="text-2xl uppercase text-gray-400 pr-3 ml-1 pl-3 hover:text-blue-400 cursor-pointer"
            style="font-family:Inconcouriersolata"
          >&plus;</button>
        </div>
        <div class="flex-1 px-4">
          <div class="flex justify-center">
            <span
              class="capitalize text-gray-900 text-lg my-1"
            >{{ time.start.format('dddd') }} {{ time.start.date() }} {{ time.start.format("MMMM") }}</span>
          </div>
          <time-slider :startTime="time.start" :endTime="time.end" :allRed="removed"></time-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeSlider from "@/components/TimeSlider";
// import moment from "moment";

export default {
  props: {
    time: {
      type: Object
    }
  },

  data() {
    return {
      removed: false
    };
  },

  methods: {
    toggle() {
      if (this.removed) this.$emit("added", this.time);
      else this.$emit("removed", this.time);
      this.removed = !this.removed;
    },

    clone() {
      this.$emit("cloned", this.time);
    },

    handle() {}
  },

  components: {
    TimeSlider
  }
};
</script>