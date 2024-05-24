<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content"></div>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      footerLink: [
        { link: "", text: "" },
        { link: "", text: "" },
        { link: "", text: "" },
        { link: "", text: "" },
        { link: "", text: "" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
