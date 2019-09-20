<template>
  <div id="app" class="h-screen bg-gray-200">
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

