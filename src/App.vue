<template>
  <div id="app" class="min-h-screen pb-4 bg-gray-200 antialiased">
    <navigation></navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  components: { Navigation }
};
</script>
