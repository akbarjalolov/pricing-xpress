<template> <i v-if="name" class="icon" v-html="src"/></template>
<script>
import icons from "~/plugins/icons.js";

export default {
  components: {
    icons
  },

  props: {
    name: { type: String, default: "" },
    color: { type: String, default: "" }
  },

  data() {
    return {
      src: ""
    };
  },

  mounted() {
    this.src = icons[this.name];
  }
};
</script>
<style scoped lang="scss"></style>
