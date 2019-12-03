<template>
  <div>
    <div
      v-for="(element, index) in times"
      :key="index"
      class="bg-white mx-4 my-2 py-2 rounded shadow-md"
    >
      <time-slider :startTime="element.start" :endTime="element.end"></time-slider>
    </div>
  </div>
</template>
<script>
import TimeSlider from "@/components/TimeSlider";
import moment from "moment";

export default {
  components: { TimeSlider },

  data() {
    return {
      times: [
        {
          start: new moment({ hour: 8 }),
          end: new moment({ hour: 8 }).add(10, "hour")
        },
        {
          start: new moment({ hour: 0 }),
          end: new moment({ hour: 0 }).add(23, "hour")
        }
      ]
    };
  }
};
</script>