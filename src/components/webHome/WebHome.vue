<template>
  <div id="webhome">
    <Top />
    <Secend />
    <Tiles />
    <SecendTiles />
    <Footer />
  </div>
</template>


<script>
import Top from "../webHome/Top";
import Secend from "../webHome/Secend";
import Tiles from "../webHome/Tiles";
import Footer from "../webHome/Footer";
import SecendTiles from "../webHome/SecendTiles";

export default {
  components: {
    Top,
    Secend,
    Tiles,
    Footer,
    SecendTiles,
  }
};
</script>

