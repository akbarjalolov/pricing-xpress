<template>
  <div>
    <!-- <div v-if="$fetchState.pending" class="preloader"></div>
    <div v-else-if="$fetchState.error" class="error">Something is wrong here!</div> -->
    <div class="wrapper">
      <!--      <icons name="stat_stars" />-->
      <Header />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import icons from "~/components/Icons.vue";
import Header from "~/components/Header.vue";

export default {
  components: {
    icons,
    Header
  }
};
</script>

<style lang="scss" scoped></style>
