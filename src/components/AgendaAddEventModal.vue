<template>
  <div>
    <div v-if="isOpen" class="h-screen absolute top-0 bottom-0 left-0 right-0 bg-black opacity-25"></div>
    <div v-if="isOpen" class="h-screen absolute top-0 bottom-0 left-0 right-0">
      <div class="flex p-4">
        <div class="bg-purple-500 text-purple-100 p-4 rounded opacity-100 shadow-lg w-full">
          <div class="m-1 p-1 bg-white shadow rounded">
            <Calendar
              :eventCategories="[]"
              :events="[]"
              ref="calendar-add-event"
              @setDate="addDateToList"
            />
          </div>

          <div class="text-center my-4 px-2 py-1 bg-purple-400 rounded shadow-inner">
            <sortable-time-sliders-list @dataMapUpdate="updateData" :times="times"></sortable-time-sliders-list>
          </div>

          <div class="flex justify-center items-center mt-2">
            <button
              class="bg-purple-400 hover:bg-purple-300 text-sm tracking-wider font-semibold uppercase px-2 py-1 rounded shadow"
              @click="submit"
            >Proposer les disponibilités</button>
          </div>

          <div class="flex justify-end items-center">
            <button
              class="uppercase text-xs hover:bg-purple-400 px-2 py-1 rounded"
              @click="close"
            >Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import SortableTimeSlidersList from "@/components/SortableTimeSlidersList";

import moment from "moment";
import axios from "axios";

export default {
  components: { Calendar, SortableTimeSlidersList },

  props: {
    isOpen: {},
    date: {}
  },

  data() {
    return {
      times: [],
      dataMapToSend: null
    };
  },

  computed: {
    title() {
      return "Event name";
    }
  },

  watch: {
    isOpen: function(val) {
      if (val === true && this.times.length === 0) {
        this.addDateToList(this.date);
      }
    }
  },

  methods: {
    addDateToList(d) {
      let t = {
        start: new moment(d).hour(0),
        end: new moment(d).hour(23)
      };

      this.times.push(t);
    },

    close() {
      this.$emit("close");
    },

    propose() {},

    create() {},

    updateData(data) {
      // console.log(data);
      this.dataMapToSend = data;
    },

    submit() {
      this.close();
      this.times = [];

      if (this.dataMapToSend == null) return;

      axios
        .post("http://127.0.0.1:8000/api/availabilities", {
          data: Object.fromEntries(this.dataMapToSend)
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
