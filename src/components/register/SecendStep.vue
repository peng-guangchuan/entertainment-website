<template>
  <div class="secend">
    <section>
      <b-field label="姓名" horizontal>
        <b-input
          v-model="name"
          required
          validation-message="请输入正确的姓名!"
          placeholder="请输入您的姓名"
        ></b-input>
      </b-field>

      <b-field label="性别" horizontal>
        <b-select placeholder="选择性别" v-model="userSex">
          <option value="1">男</option>
          <option value="0">女</option>
        </b-select>
      </b-field>

      <b-field label="年龄" horizontal>
        <b-input
          v-model="userAge"
          required
          pattern="^(?:[1-9][0-9]?)$"
          validation-message="请输入正确的年龄(不得大于100岁)!"
          placeholder="请输入您的年龄，纯数字格式"
        ></b-input>
      </b-field>

      <b-field label="就读学校" horizontal>
        <b-input
          v-model="userSchool"
          required
          maxlength="20"
          validation-message="请输入正确的院校名称!"
          placeholder="请输入您的就读学校"
        ></b-input>
      </b-field>

      <hr />
    </section>
    <b-button type="is-info" outlined rounded @click="secend">保存</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      userSex: "1",
      userAge: "",
      userSchool: "",
    };
  },
  methods: {
    secend() {
      this.$store.commit("secend", {
        name: this.name,
        userSex: this.userSex,
        userAge: this.userAge,
        userSchool: this.userSchool,
      });
      console.log(this.$store.state.registeruser.name);
      console.log(this.$store.state.registeruser.userSex);
      console.log(this.$store.state.registeruser.userAge);
      console.log(this.$store.state.registeruser.userSchool);
      if (
        this.$store.state.registeruser.name != "" &&
        this.$store.state.registeruser.userSex != "" &&
        this.$store.state.registeruser.userAge != "" &&
        this.$store.state.registeruser.userSchool != ""
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
.secend {
  /* margin: auto; */
  height: 400px;
  /* text-align: center; */
  margin-top: 3rem;
}
</style>
