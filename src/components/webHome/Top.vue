<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#">
        <img src="../../../public/fav.png" />
      </a>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" @click="goHome()">首页</a>
        <a class="navbar-item" @click="goRead()">读书</a>
        <a class="navbar-item" @click="goListen()">音乐</a>
        <a class="navbar-item" @click="goWatch()">电影</a>
        <a class="navbar-item" @click="goActivity()">活动</a>
      </div>

      <div class="navbar-end" v-if="!$store.state.isLogin">
        <div class="navbar-item">
          <div class="buttons">
            <a class="navbar-item" slot="trigger" role="button">
              <b-button type="is-info" @click="goAdmin()" outlined
                >管理员登陆</b-button
              >
            </a>
            <b-button type="is-info" outlined @click="register()"
              >注册</b-button
            >
            <div class="navbar-menu">
              <div class="navbar-end">
                <b-dropdown
                  position="is-bottom-left"
                  aria-role="menu"
                  trap-focus
                >
                  <a class="navbar-item" slot="trigger" role="button">
                    <b-button type="is-info" outlined>登录</b-button>
                  </a>

                  <b-dropdown-item
                    aria-role="menu-item"
                    :focusable="false"
                    custom
                    paddingless
                  >
                    <div class="modal-card" style="width: 300px">
                      <section class="modal-card-body">
                        <b-field label="Email">
                          <b-input
                            type="email"
                            v-model="email"
                            placeholder="Your email"
                            required
                          ></b-input>
                        </b-field>

                        <b-field label="密码">
                          <b-input
                            type="password"
                            password-reveal
                            placeholder="Your password"
                            required
                            v-model="password"
                            @keyup.enter.native="login"
                          ></b-input>
                        </b-field>

                        <b-checkbox>记住我</b-checkbox>
                      </section>
                      <footer class="modal-card-foot">
                        <button class="button is-primary" @click="login()">
                          登录
                        </button>
                      </footer>
                    </div>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="isLogin navbar-end" v-else-if="$store.state.isLogin">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">更多</a>
          <div class="navbar-dropdown">
            <a class="navbar-item">个人主页</a>
            <a class="navbar-item" @click="goMyActivity()">我的活动</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
        <div class="isLogin navbar-item" v-if="$store.state.isLogin">
          <div title="进入个人主页">
            <i class="el-icon-s-custom myInfo">{{
              this.$store.state.user.account
            }}</i>
          </div>
        </div>
        <div class="isLogin navbar-item">
          <div @click="logout()" v-if="$store.state.isLogin">
            <i class="el-icon-error myInfo"> 登出</i>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { userLogin } from "@/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      searchKey: "",
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goAdmin() {
      this.$router.push("/adminLogin");
    },
    goRead() {
      this.$router.push("/bookhome");
    },
    goListen() {
      this.$router.push("/musichome");
    },
    goWatch() {
      this.$router.push("/moviehome");
    },
    goActivity() {
      this.$router.push("/activityhome");
    },
    goMyActivity() {
      this.$router.push("/myactivityhome");
    },
    logout() {
      this.$message("账号成功登出！");
      this.$store.commit("logout");
    },
    userhome() {
      this.$router.push("/userhome");
    },
    login() {
      userLogin(this.email, this.password)
        .then((res) => {
          const { data } = res;
          this.user = data;
          if (data.code == 20000) {
            this.$message({
              message: "登陆成功！",
              type: "success",
            });
            this.$store.dispatch("aLogin", {
              user: data,
              message: "牛逼",
              success: () => {
                console.log("欢迎您");
              },
            });
          } else {
            this.$message({
              message: "登陆失败，该用户不存在或密码错误！",
              type: "error",
            });
          }
        })
        .catch(() => {});
    },
    register() {
      this.$router.push("/registerhome");
    },
  },
};
</script>

<style scoped>
.myInfo {
  cursor: pointer;
}
.myInfo:hover {
  font-weight: bold;
}
.isLogin {
  width: auto;
}
</style>