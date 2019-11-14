<template>
  <div class="container px-4">
    <p id="mobile"></p>

    <Calendar
      :eventCategories="eventCategories"
      :events="events"
      ref="calendar"
    />

    <agenda-event-holder>
      <agenda-event></agenda-event>
    </agenda-event-holder>

    <agenda-event-holder>
      <agenda-event></agenda-event>
    </agenda-event-holder>

    <agenda-event-holder>
      <agenda-event></agenda-event>
      <agenda-event></agenda-event>
    </agenda-event-holder>

    <!--
    <agenda-event-holder>
      <agenda-event></agenda-event>
      <agenda-event></agenda-event>
      <agenda-event></agenda-event>
    </agenda-event-holder>
-->

    <agenda-event-holder>
      <agenda-event></agenda-event>
    </agenda-event-holder>

    <agenda-event-holder>
      <agenda-event></agenda-event>
    </agenda-event-holder>

    <agenda-separator></agenda-separator>
    <agenda-event></agenda-event>
  </div>
</template>

<script>
import AgendaSeparator from "@/components/AgendaSeperator";
import AgendaEvent from "@/components/AgendaEvent";
import AgendaEventHolder from "@/components/AgendaEventHolder";
import Calendar from "@/components/Calendar.vue";

export default {
  components: { AgendaSeparator, AgendaEvent, AgendaEventHolder, Calendar },

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
          backgroundColor: "red"
        }
      ],
      events: [
        {
          title: "test1",
          start: "2019-04-02",
          end: "2019-04-04",
          repeat: "never",
          categoryId: 1
        },
        {
          title: "test2",
          start: "2019-04-08",
          end: "2019-04-09",
          repeat: "monthly",
          categoryId: 1
        },
        {
          title: "test3",
          start: "2019-04-10",
          end: "2019-04-11",
          repeat: "yearly",
          categoryId: 2
        },
        {
          title: "test4",
          start: "2019-04-23",
          end: "2019-04-23",
          repeat: "monthly",
          categoryId: 2
        }
      ],
      selectedDate: {}
    };
  },

  methods: {
    goToday() {
      this.$refs.calendar.goToday();
    }
    // setDate(date) {
    //   this.selectedDate = date;
    // }
  }
};
</script>
