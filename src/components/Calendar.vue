<template>
  <div id="sweetCalendar" :key="componentKey">
    <div class="container calendar pb-2">
      <div class="w-4/5 m-auto flex justify-between">
        <div>
          <span
            @click="prevMonth"
            class="cursor-pointer text-xs uppercase tracking-wide bg-gray-100 p-2 rounded hover:bg-gray-200 text-gray-700 ml-2"
          >{{ previousMonthName }}</span>
        </div>
        <div class="capitalize text-gray-800">{{ selectedMonthName }} {{ selectedYear }}</div>
        <div>
          <span
            @click="nextMonth"
            class="cursor-pointer text-xs uppercase tracking-wide bg-gray-100 p-2 rounded hover:bg-gray-200 text-gray-700 mr-2"
          >{{ nextMonthName }}</span>
        </div>
      </div>
      <div class="body">
        <div
          v-for="(day, index) in weekdays"
          :key="`day-name-${index + 1}`"
          class="day-name"
          :title="day"
        >{{ day[0] }}</div>
        <div
          v-for="(day, index) in days"
          :key="index"
          class="day-container"
          data-sk-intent-click
          data-sk-intent-click-group="calendar-day"
        >
          <div
            v-if="day"
            class="transition-all transition-faster ease-out"
            :class="[
              'day',
              `day-${day.date()}`,
              `weekday-${day.date()}`,
              day.isSame(today, 'day') ? 'today' : null,
              isSelected(day) ? 'selected' : null
            ]"
            @click="selectDay(day)"
          >
            <span
              class="text-sm text-center"
              data-sk-intent-click-group="calendar-day"
            >{{ day.date() }}</span>
            <div class="flex items-center justify-center -mt-2">
              <span
                v-for="(e, i) in eventsForDay(day)"
                :key="i"
                class="text-center font-semibold"
              >&bull;</span>
              <span v-if="eventsForDay(day).length == 0" class="text-transparent">&bull;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      today: new moment(),
      date: new moment(),
      weekdays: null,
      eventsForDaysCaching: new Map(),
      componentKey: 0
    };
  },
  computed: {
    days() {
      let emptyDays = Array(
        (this.startWeekDayOfMonth - this.firstDayOfWeek + 8) % 7
      ).fill(null);
      let days = Array(this.numberOfDays)
        .fill()
        .map(
          (item, index) =>
            new moment({
              year: this.selectedYear,
              month: this.selectedMonth,
              day: index + 1
            })
        );
      return emptyDays.concat(days);
    },

    startWeekDayOfMonth() {
      // dimanche == 0
      // lunid == 1
      return new moment(this.date).startOf("month").format("d");
    },
    numberOfDays() {
      return this.date.daysInMonth();
    },
    selectedMonth() {
      return parseInt(this.date.format("M")) - 1;
    },
    selectedMonthName() {
      return this.date.format("MMMM");
    },

    previousMonthName() {
      return new moment(this.date).subtract(1, "month").format("MMM");
    },

    nextMonthName() {
      return new moment(this.date).add(1, "month").format("MMM");
    },

    selectedYear() {
      return parseInt(this.date.year());
    }
  },

  watch: {
    events: function() {
      this.date = new moment(this.date);
      this.eventsForDaysCaching = new Map();
    }
  },

  methods: {
    eventsForDay(day) {
      const day_as_str = day.toString();

      if (this.eventsForDaysCaching.has(day_as_str))
        return this.eventsForDaysCaching.get(day_as_str);

      const toCache = this.events.filter(event => {
        return (
          day.isAfter(moment(event.start_at).subtract(1, "day"), "day") &&
          day.isBefore(moment(event.end_at).add(1, "day"), "day")
        );
      });

      this.eventsForDaysCaching.set(day_as_str, toCache);

      return toCache;
    },

    prevMonth() {
      this.date = new moment(this.date).subtract(1, "month").startOf("month");
    },

    nextMonth() {
      this.date = new moment(this.date).add(1, "month").startOf("month");
    },

    generateWeekdayNames(firstDayOfWeek = 1) {
      let weekdays = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
      ];

      for (let i = 2; i <= firstDayOfWeek; i++) {
        let first = weekdays.shift();
        weekdays.push(first);
      }

      return weekdays;
    },

    goToday() {
      this.date = new moment(this.today);
    },

    selectDay(day) {
      this.$emit("setDate", day);
    },

    isSelected(day) {
      if (!this.selectedDate) {
        return false;
      }

      return day.isSame(this.selectedDate, "day");
    }
  },
  props: {
    initialDate: {
      type: String,
      default: null
    },
    firstDayOfWeek: {
      type: Number,
      default: 2 // 1: Sunday, 2: Monday, etc
    },
    eventCategories: {
      type: Array,
      default() {
        return [];
      }
    },
    events: {
      type: Array,
      default() {
        return [];
      }
    },
    selectedDate: {
      type: Object,
      default: null
    }
  },
  created() {
    if (this.initialDate) this.date = new moment(this.initialDate);
    else this.date = new moment();
    this.weekdays = this.generateWeekdayNames(this.firstDayOfWeek);
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/index.sass'
</style>
