<template>
  <div id="sweetCalendar">
    <div class="container calendar">
      <div class="header">
        <div class="left-arrow" @click="prevMonth">
          <span>&lt;</span>
        </div>
        <div class="month">{{ selectedMonthName }} {{ selectedYear }}</div>
        <div class="right-arrow" @click="nextMonth">
          <span>&gt;</span>
        </div>
      </div>
      <div class="body">
        <div
          v-for="(day, index) in weekdays"
          :key="`day-name-${index + 1}`"
          class="day-name"
          :title="day"
        >{{ day[0] }}</div>
        <div v-for="(day, index) in days" :key="index" class="day-container">
          <div
            v-if="day"
            class="transition-all transition-faster ease-out"
            :class="[
              'day',
              `day-${day.date()},
            weekday-${day.date()}`,
              offDays.includes(day.date()) ? 'off-day' : null,
              day.isSame(today, 'day') ? 'today' : null,
              isSelected(day) ? 'selected' : null
            ]"
            :style="generateDayStyle(day)"
            @click="selectDay(day)"
          >
            <span class="text-sm text-center">{{ day.date() }}</span>
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
import DateTime from "../DateTime.js";
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      today: new moment(),
      date: null,
      weekdays: null
    };
  },
  computed: {
    days() {
      let emptyDays = Array(
        (this.startWeekDayOfMonth - this.firstDayOfWeek + 7) % 7
      ).fill(null);
      let days = Array(this.numberOfDays)
        .fill()
        .map((item, index) =>
          new moment()
            .year(this.selectedYear)
            .month(this.selectedMonth)
            .day(index + 1)
        );
      return emptyDays.concat(days);
    },
    startWeekDayOfMonth() {
      return this.date.getFirstWeekdayOfMonth();
    },
    numberOfDays() {
      return this.date.getNumberOfDaysInMonth();
    },
    selectedMonth() {
      return this.date.getMonth();
    },
    selectedMonthName() {
      return this.date.getMonthName();
    },
    selectedYear() {
      return this.date.getFullYear();
    }
  },
  methods: {
    eventsForDay(day) {
      return this.events.filter(event => {
        // console.log(momentDay);
        // console.log(moment(event.start_at));
        // console.log(moment(event.end_at));

        return (
          day.isAfter(moment(event.start_at), "day") &&
          day.isBefore(moment(event.end_at), "day")
        );
      });
    },

    prevMonth() {
      this.date = new DateTime(this.selectedYear, this.selectedMonth - 1, 1);
    },
    nextMonth() {
      this.date = new DateTime(this.selectedYear, this.selectedMonth + 1, 1);
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
    generateDayStyle(date) {
      let style = {};
      for (let event of this.events) {
        if (
          date.isBetween(moment(event.start), moment(event.end), "day", "[]")
        ) {
          let category =
            this.eventCategories.find(item => item.id === event.categoryId) ||
            {};
          Object.assign(style, {
            color: category.id ? category.textColor : null,
            backgroundColor: category.id ? category.backgroundColor : null,
            fontWeight: category.id ? "bold" : "normal"
          });
        }
      }
      return style;
    },

    goToday() {
      this.date = this.today;
    },

    selectDay(day) {
      this.$emit("setDate", day);
    },
    isSelected(day) {
      if (!this.selectedDate) {
        return false;
      }

      return (
        day.format("dddd D MMMM") === this.selectedDate.format("dddd D MMMM")
      );
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
    offDays: {
      type: Array,
      default() {
        return [1, 7];
      }
    },
    selectedDate: {
      type: Object,
      default: null
    }
  },
  beforeMount() {
    this.date = Date.parse(this.initialDate)
      ? new DateTime(this.initialDate)
      : new DateTime();
    this.weekdays = this.generateWeekdayNames(this.firstDayOfWeek);
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/index.sass'
</style>

