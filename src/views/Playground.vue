<template>
  <div>
    <div class="bg-white border-b-2 border-gray-300">
      <Calendar :eventCategories="[]" :events="[]" ref="calendar" :selectedDate="null" />
    </div>

    <div class="container px-4 pt-4">
      <h2 class="font-semibold text-lg text-gray-900 mb-2">Disponibilités</h2>

      <sortable-time-sliders-list v-if="availabilities" :times="availabilities"></sortable-time-sliders-list>
    </div>
  </div>
</template>
<script>
import SortableTimeSlidersList from "@/components/SortableTimeSlidersList";
import Calendar from "@/components/Calendar";
import axios from "axios";
import moment from "moment";

export default {
  components: { SortableTimeSlidersList, Calendar },

  data() {
    return {
      availabilities: null
    };
  },

  methods: {
    fetchAvailabilities() {
      axios
        .get("http://localhost:8000/api/availabilities")
        .then(response => {
          console.log(response);
          this.availabilities = response.data.map(item => {
            return {
              start: new moment(item.start),
              end: new moment(item.end)
            };
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    this.fetchAvailabilities();
  }
};
</script>