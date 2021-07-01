<template>
  <div id="activityhome">
    <Top />
    <el-row>
      <el-col :span="14" :push="5" :pull="5">
        <AllActivity />
      </el-col>
    </el-row>
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

