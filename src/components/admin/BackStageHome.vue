<template>
  <el-container>
    <el-header style="padding: 0px">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>
          <Footer />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
  <!-- <div v-else style="margin-top: 5rem">
    <div>请先进行登陆</div>
    <el-button type="primary" @click="goAdminLogin()">登陆</el-button>
  </div> -->
</template>

<script>
import Header from "../admin/Header.vue";
import Sidebar from "../admin/Sidebar.vue";
import Footer from "../admin/Footer.vue";

export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    goAdminLogin() {
      this.$router.push({
        path: "/adminLogin",
      });
    },
  },
  beforeCreate() {
    document.title = "校园课外娱乐网后台系统";
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {},
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
