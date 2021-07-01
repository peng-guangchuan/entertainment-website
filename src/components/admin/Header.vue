<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">首页</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">工作台1</el-menu-item>
      <el-submenu index="2-2">
        <template slot="title">工作台2</template>
        <el-menu-item index="2-2-1">选项1</el-menu-item>
        <el-menu-item index="2-2-2">选项2</el-menu-item>
        <el-menu-item index="2-2-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4">
      <a href="http://localhost:8080" target="_blank">前台网站首页</a>
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex:'1',
    };
  },
  methods: {

  },
};
</script>