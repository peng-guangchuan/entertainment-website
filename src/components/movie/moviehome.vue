<template>
    <div id="moviehome">
    <Top />
    <Allmovie />
    <Footer />
  </div>
</template>

<script>
import Top from "../forumHome/Top";
import Footer from "../forumHome/Footer";
import Allmovie from "./allMovie"

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Top,
    Allmovie,
    Footer,
  },
};
</script>

<style scoped>
</style>

