<template>
  <div id="musichome">
    <Top />
    <Allmusic />
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
import Allmusic from "./allMusic";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Top,
    Allmusic,
    Footer,
  },
};
</script>

<style scoped>
</style>

