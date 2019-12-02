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
              `day-${day.date()}`,
              `weekday-${day.date()}`,
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
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      today: new moment(),
      date: new moment(),
      weekdays: null
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
    selectedYear() {
      return parseInt(this.date.year());
    }
  },
  methods: {
    eventsForDay(day) {
      return this.events.filter(event => {
        return (
          day.isAfter(moment(event.start_at), "day") &&
          day.isBefore(moment(event.end_at), "day")
        );
      });
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

    let testDate = new moment();

    let otherDate = new moment(testDate);

    console.log(testDate, otherDate.format("d"));
  }
};
</script>

<style lang="sass" scoped>
@import '../styles/index.sass'
</style>

