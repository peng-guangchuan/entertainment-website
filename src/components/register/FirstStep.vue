<template>
  <div class="first">
    <div>
      <b-field label="用户名" horizontal>
        <b-input
          v-model="userName"
          placeholder="请输入用户名"
          maxlength="8"
          class="resigerInput"
        ></b-input>
      </b-field>

      <b-field label="邮箱" horizontal>
        <b-input
          type="email"
          v-model="userEmail"
          placeholder="请输入您的邮箱地址"
          maxlength="30"
          required
          class="resigerInput"
        ></b-input>
      </b-field>

      <b-field label="密码" horizontal>
        <b-input
          type="password"
          password-reveal
          placeholder="请设置您账号的密码"
          required
          v-model="userPassword"
          class="resigerInput"
        ></b-input>
      </b-field>
    </div>
    <hr />
    <b-button type="is-info" outlined rounded @click="first">保存</b-button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      userPassword: "",
    };
  },
  methods: {
    first() {
      this.$store.commit("first", {
        userName: this.userName,
        userEmail: this.userEmail,
        userPassword: this.userPassword,
      });
      console.log(this.$store.state.registeruser.userName);
      console.log(this.$store.state.registeruser.userEmail);
      console.log(this.$store.state.registeruser.userPassword);
      if (
        this.$store.state.registeruser.userName != "" &&
        this.$store.state.registeruser.userEmail != "" &&
        this.$store.state.registeruser.userPassword != ""
      ) {
        this.$message({
          message: "信息保存成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "信息填写完整再点击保存",
          type: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.first {
  height: 400px;
  margin-top: 3rem;
}
</style>