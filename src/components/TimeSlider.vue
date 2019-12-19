<template>
  <div>
    <div class="m-auto">
      <div v-if="!allRed" class="flex justify-between items-center mb-3 mt-1">
        <div>
          <button
            data-sk-intent-click
            data-sk-intent-click-group="plus-minus-time-slider"
            @click="soonerLeft"
            class="uppercase text-base px-2 py-1 bg-green-200 mx-1 rounded-full text-green-700"
          >&larr;</button>

          <span
            data-sk-intent-click-group="plus-minus-time-slider"
            class="mono-font text-gray-900"
          >{{ formatTime(this.startHour) }}h00</span>

          <button
            data-sk-intent-click
            data-sk-intent-click-group="plus-minus-time-slider"
            @click="laterLeft"
            class="uppercase text-base px-2 py-1 bg-red-200 mx-1 rounded-full text-red-700"
          >&rarr;</button>
        </div>

        <div>
          <button
            data-sk-intent-click
            data-sk-intent-click-group="plus-minus-time-slider"
            @click="soonerRight"
            class="uppercase text-base px-2 py-1 bg-red-200 mx-1 rounded-full text-red-700"
          >&larr;</button>
          <span
            data-sk-intent-click-group="plus-minus-time-slider"
            class="mono-font text-gray-900"
          >{{ formatTime(this.endHour) }}h00</span>

          <button
            data-sk-intent-click
            data-sk-intent-click-group="plus-minus-time-slider"
            @click="laterRight"
            class="uppercase text-base px-2 py-1 bg-green-200 mx-1 rounded-full text-green-700"
          >&rarr;</button>
        </div>
      </div>
      <div class="w-full flex">
        <span
          v-for="(hour, index) in originalHoursDifference"
          :key="index"
          class="border-l border-r border-gray-200 flex-grow text-center"
          :class="{ 
            'rounded-l-full': index === 0,
            'rounded-r-full': index === originalHoursDifference - 1,
            'bg-green-300': startHour <= originalStartHour + index && index + 1 + originalStartHour <= (originalEndHour - (originalEndHour - endHour)) && !allRed,
            'bg-red-300': (startHour > originalStartHour + index) || index + 1 + originalStartHour > (originalEndHour - (originalEndHour - endHour)) || allRed }"
        >&#8203;</span>
      </div>
      <div class="text-center mt-2" v-if="allRed">
        <span class="text-red-700 my-1">Aucune dispo ce jour.</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    startTime: {
      type: Object
    },
    endTime: {
      type: Object
    },
    allRed: {
      type: Boolean
    }
  },

  data() {
    return {
      start: this.startTime,
      end: this.endTime,
      originalStartHour: 8,
      originalEndHour: 20
    };
  },

  computed: {
    hoursDifference() {
      return this.endHour - this.startHour;
    },

    originalHoursDifference() {
      return this.originalEndHour - this.originalStartHour;
    },

    startHour() {
      return parseInt(this.start.hours());
    },

    endHour() {
      return parseInt(this.end.hours());
    }
  },

  methods: {
    formatTime(time) {
      return ("0" + time).slice(-2);
    },

    laterLeft() {
      if (this.startHour < this.endHour - 1) {
        this.start = new moment(this.start).add(1, "hour");
        this.updateParent();
      }
    },
    laterRight() {
      if (this.endHour < this.originalEndHour) {
        this.end = new moment(this.end).add(1, "hour");
        this.updateParent();
      }
    },
    soonerRight() {
      if (this.startHour + 1 < this.endHour) {
        this.end = new moment(this.end).subtract(1, "hour");
        this.updateParent();
      }
    },
    soonerLeft() {
      if (this.originalStartHour < this.startHour) {
        this.start = new moment(this.start).subtract(1, "hour");
        this.updateParent();
      }
    },

    updateParent() {
      this.$emit("update", {
        start: this.start,
        end: this.end
      });
    }
  },

  created() {
    this.originalStartHour = parseInt(this.startTime.hours());
    this.originalEndHour = parseInt(this.endTime.hours());
    this.updateParent();
  }
};
</script>

<style scoped>
.mono-font {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>