<template>
  <div>
    <div class="bg-white border-b-2 border-gray-300">
      <Calendar :eventCategories="[]" :events="[]" ref="calendar" :selectedDate="null" />
    </div>

    <div class="container px-4 pt-4">
      <h2 class="font-semibold text-lg text-gray-900 mb-2">Disponibilités</h2>

      <sortable-time-sliders-list></sortable-time-sliders-list>
    </div>
  </div>
</template>
<script>
import SortableTimeSlidersList from "@/components/SortableTimeSlidersList";
import Calendar from "@/components/Calendar";

export default {
  components: { SortableTimeSlidersList, Calendar }
};
</script>