<template>
  <div id="activityhome">
    <Top />
    <AllActivity />
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
import AllActivity from "./AllActivity";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Top,
    AllActivity,
    Footer,
  },
};
</script>

<style scoped>
</style>

