<template>
  <div class="relative">
    <div v-for="(time, index) in times" :key="index">
      <sortable-time-sliders-list-item @cloned="cloneItem(index, ...arguments)" :time="time"></sortable-time-sliders-list-item>
    </div>
    <div class="sticky bottom-0 text-center mt-4 pb-2">
      <button
        class="text-sm uppercase bg-purple-600 hover:bg-purple-700 text-purple-100 px-4 py-2 rounded shadow-lg transition-all transition-slowest ease-out"
      >
        <span class="font-bold">Valider les disponibilités</span>
      </button>
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
  },

  methods: {
    cloneItem(index, data) {
      console.log(index, data.start.hours(), data.end.hours());
      const newDate = {
        start: new moment(data.start),
        end: new moment(data.end)
      };
      // this.times.splice(index, 0, newDate);
      this.times.push(newDate);
    }
  }
};
</script>