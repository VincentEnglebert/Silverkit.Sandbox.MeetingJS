<template>
  <div class="flex">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    /* If there are no slots, we just return
     * Count the number of nodes in the slug
     * If only one element, we just put its width to 100%
     * Foreach element, we set a custom width and margin
     */

    if (!this.$slots.default) return;

    const numberOfVitualNodes = this.$slots.default.length;

    if (numberOfVitualNodes === 1) {
      this.$slots.default[0].elm.style.width = "100%";
      return;
    }

    this.$slots.default.forEach((vnode, index) => {
      if (index === 0) {
        vnode.elm.style.marginRight = "0.5rem";
      } else if (index === numberOfVitualNodes - 1) {
        vnode.elm.style.marginLeft = "0.5rem";
      } else {
        vnode.elm.style.marginRight = "0.5rem";
        vnode.elm.style.marginLeft = "0.5rem";
      }

      const newPercentage = 100 / numberOfVitualNodes;
      vnode.elm.style.width = newPercentage + "%";
    });
  }
};
</script>