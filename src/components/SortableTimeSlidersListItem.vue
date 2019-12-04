<template>
  <div>
    <div class="bg-white mb-2 py-2 rounded shadow" :class="{'bg-red-200' :removed }">
      <div class="flex">
        <div class="flex justify-center items-center flex-col border-r border-dashed">
          <span
            @click="toggle"
            class="text-2xl uppercase text-gray-400 pr-3 ml-2 pl-2 hover:text-red-400 cursor-pointer"
            :class="{'text-red-400' : removed}"
          >&cross;</span>
          <span
            @click="clone"
            class="text-2xl uppercase text-gray-400 pr-3 ml-2 pl-2 hover:text-blue-400 cursor-pointer"
          >&cularrp;</span>
        </div>
        <div class="flex-1 px-4">
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
    }
  },

  components: {
    TimeSlider
  }
};
</script>