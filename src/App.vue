<template>
  <div id="app" class="min-h-screen bg-gray-200">
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
