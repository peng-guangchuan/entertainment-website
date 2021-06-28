<template>
    <div id="musichome">
    <Top />
    <Allmusic />
    <Footer />
  </div>
</template>

<script>
import Top from "../forumHome/Top";
import Footer from "../forumHome/Footer";
import Allmusic from "./allMusic"

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Top,
    Allmusic,
    Footer,
  },
};
</script>

<style scoped>
</style>

