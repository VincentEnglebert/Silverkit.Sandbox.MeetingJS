<template>
  <div>
    <div class="bg-white border-b-2 border-gray-300">
      <Calendar
        :eventCategories="eventCategories"
        :events="events"
        ref="calendar"
        :selectedDate="selectedDate"
        @setDate="setDate"
      />
    </div>

    <div class="container px-4 pt-4">
      <h2 class="font-semibold text-lg text-gray-900">Events</h2>

      <agenda-event-holder v-for="(event, index) in todayEvents" :key="index">
        <agenda-event :category="eventCategories[1]" :event="event"></agenda-event>
      </agenda-event-holder>

      <div v-if="todayEvents.length == 0" class="flex justify-center my-4">
        <span class="text-lg text-gray-700 font-semibold tracking-wider">Auncun évènement</span>
      </div>
    </div>

    <agenda-add-event @addEvent="toggleModalAddEvent" :date="selectedDate"></agenda-add-event>

    <agenda-add-event-modal :isOpen="isModalOpen" @close="toggleModalAddEvent" :date="selectedDate"></agenda-add-event-modal>
  </div>
</template>

<script>
// import AgendaSeparator from "@/components/AgendaSeperator";
import AgendaEvent from "@/components/AgendaEvent";
import AgendaEventHolder from "@/components/AgendaEventHolder";
import Calendar from "@/components/Calendar.vue";
import AgendaAddEvent from "@/components/AgendaAddEvent";
import AgendaAddEventModal from "../components/AgendaAddEventModal";

import moment from "moment";
import axios from "axios";

export default {
  components: {
    // AgendaSeparator,
    AgendaEvent,
    AgendaEventHolder,
    Calendar,
    AgendaAddEvent,
    AgendaAddEventModal
  },

  data() {
    return {
      eventCategories: [
        {
          id: 1,
          title: "Personal",
          textColor: "white",
          backgroundColor: "Blue"
        },
        {
          id: 2,
          title: "Company-wide",
          textColor: "white",
          backgroundColor: "#e85c66"
        }
      ],
      events: [],
      selectedDate: null,
      isModalOpen: false
    };
  },

  computed: {
    todayEvents() {
      let selection = this.selectedDate || moment();

      return this.events.filter(event => {
        return selection.isBetween(event.start_at, event.end_at, "days", "[]");
      });
    }
  },

  methods: {
    goToday() {
      this.$refs.calendar.goToday();
    },

    setDate(date) {
      this.selectedDate = date;
    },

    toggleModalAddEvent() {
      this.isModalOpen = !this.isModalOpen;
    }
  },

  created() {
    axios.get("https://agenda-api.silverkit.io/api/events").then(response => {
      this.events = response.data.data;
    });
  }
};
</script>
