<template>
    <div id="bookhome">
    <Top />
    <AllBook />
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
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

