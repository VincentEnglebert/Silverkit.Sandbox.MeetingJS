<template>
  <div class="container px-4">
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

    <agenda-event-holder>
      <agenda-event></agenda-event>
      <agenda-event></agenda-event>
      <agenda-event></agenda-event>
    </agenda-event-holder>

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

export default {
  components: { AgendaSeparator, AgendaEvent, AgendaEventHolder }
};
</script>
