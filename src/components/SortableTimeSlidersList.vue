<template>
  <div>
    <div v-for="(time, index) in times" :key="index">
      <sortable-time-sliders-list-item :time="time"></sortable-time-sliders-list-item>
    </div>
  </div>
</template>

<script>
import SortableTimeSlidersListItem from "@/components/SortableTimeSlidersListItem";
import moment from "moment";

export default {
  components: {
    SortableTimeSlidersListItem
  },
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