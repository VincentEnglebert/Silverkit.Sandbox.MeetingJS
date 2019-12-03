<template>
  <div>
    <div class="w-5/6 m-auto">
      <div class="flex justify-between mb-3 mt-1">
        <div>
          <span
            @click="soonerLeft"
            class="uppercase text-sm px-2 py-1 bg-green-400 mx-1 shadow rounded text-green-100"
          >-</span>
          <span class="mono-font">{{ formatTime(this.startHour) }}h00</span>

          <span
            @click="laterLeft"
            class="uppercase text-sm px-2 py-1 bg-red-400 mx-1 shadow rounded text-red-100"
          >+</span>
        </div>

        <div>
          <span
            @click="soonerRight"
            class="uppercase text-sm px-2 py-1 bg-red-400 mx-1 shadow rounded text-red-100"
          >-</span>
          <span class="mono-font">{{ formatTime(this.endHour) }}h00</span>

          <span
            @click="laterRight"
            class="uppercase text-sm px-2 py-1 bg-green-400 mx-1 shadow rounded text-green-100"
          >+</span>
        </div>
      </div>
      <div class="w-full flex my-2">
        <span
          v-for="(hour, index) in originalHoursDifference"
          :key="index"
          class="border-l border-r border-gray-200 flex-grow text-center"
          @click="toggleHour(originalStartHour + index)"
          :class="{ 
            'rounded-l-full': index === 0,
            'rounded-r-full': index === originalHoursDifference - 1,
            'bg-green-300': startHour <= originalStartHour + index && index + 1 + originalStartHour <= (originalEndHour - (originalEndHour - endHour)),
            'bg-red-300': (startHour > originalStartHour + index) || index + 1 + originalStartHour > (originalEndHour - (originalEndHour - endHour)) }"
        >&#8203;</span>
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
      if (this.startHour < this.endHour - 1)
        this.start = new moment(this.start).add(1, "hour");
    },
    laterRight() {
      if (this.endHour < this.originalEndHour)
        this.end = new moment(this.end).add(1, "hour");
    },
    soonerRight() {
      if (this.startHour + 1 < this.endHour) {
        this.end = new moment(this.end).subtract(1, "hour");
      }
    },
    soonerLeft() {
      if (this.originalStartHour < this.startHour) {
        this.start = new moment(this.start).subtract(1, "hour");
      }
    }
  },

  created() {
    this.originalStartHour = parseInt(this.startTime.hours());
    this.originalEndHour = parseInt(this.endTime.hours());
  }
};
</script>

<style scoped>
.mono-font {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>