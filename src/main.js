import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

// Import Tailwindcss
import "@/assets/css/app.css";

import "@/silverkit/ClickListener.js";
import "@/silverkit/GyroscopeListener.js";
import "@/silverkit/FeedbackAnalysis.js";

import "@/moment.config.js";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
