<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="1-1">书籍管理</el-menu-item>
      <el-menu-item index="1-3">电影管理</el-menu-item>
      <el-menu-item index="1-2">音乐管理</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-document"></i>
      <span slot="title">活动管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span>用户管理</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 915px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleSelect(key) {
      // console.log("handleSelect", key);
      switch (key) {
        case "1-1":
          this.$router.push("/bookmanger");
          break;
        case "1-2":
          this.$router.push("/musicmanger");
          break;
        case "1-3":
          this.$router.push("/moviemanger");
          break;
        case "2":
          this.$router.push("/activitymanger");
          break;
        case "3":
          this.$router.push("/usermanger");
          break;
      }
    },
  },
};
</script>