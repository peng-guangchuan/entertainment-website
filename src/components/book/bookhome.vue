<template>
    <div id="bookhome">
    <Top />
    <AllBook />
    <Footer />
  </div>
</template>

<script>
import Top from "../forumHome/Top";
import Footer from "../forumHome/Footer";
import AllBook from "./allBook"

export default {
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {
    Top,
    AllBook,
    Footer,
  },
};
</script>

<style scoped>
</style>

