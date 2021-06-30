<template>
  <div id="moviehome">
    <Top />
    <Allmovie />
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
import Allmovie from "./allMovie";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Top,
    Allmovie,
    Footer,
  },
};
</script>

<style scoped>
</style>

