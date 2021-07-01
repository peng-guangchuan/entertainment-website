<template>
  <div>
    <div id="Top">
      <div class="content">
        <div style="padding-top: 6px">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tbody>
              <tr>
                <td width="570" align="left" style="padding-top: 2px"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="Wrapper">
      <div class="content">
        <div id="Leftbar"></div>

        <div id="Main">
          <div class="sep20"></div>
          <div class="box">
            <div class="header">
              <a href="http://localhost:8080/">校园课外娱乐网</a>
              <span class="chevron">&nbsp;›&nbsp;</span> 管理员登录 &nbsp;
              <li class="fa fa-lock"></li>
            </div>
            <div class="cell">
              <form method="post" action="">
                <table cellpadding="5" cellspacing="0" border="0" width="100%">
                  <tbody>
                    <tr>
                      <td width="120" align="right">电子邮箱</td>
                      <td width="auto" align="left">
                        <input
                          type="text"
                          class="sl"
                          name="47898fbf4d5420a894dbd060f6763916611cd25baefcabca3234cea3fd5a5703"
                          value
                          autofocus="autofocus"
                          autocorrect="off"
                          spellcheck="false"
                          autocapitalize="off"
                          placeholder="电子邮箱地址"
                          v-model="email"
                          @keyup.enter="loginadmin"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td width="120" align="right">密码</td>
                      <td width="auto" align="left">
                        <input
                          type="password"
                          class="sl"
                          name="cb10b4e849cb70f260623e3843c990f983a01cbb5f5899afd878f367e58ed4cb"
                          value
                          autocorrect="off"
                          spellcheck="false"
                          autocapitalize="off"
                          v-model="password"
                          @keyup.enter="loginadmin"
                        />
                      </td>
                    </tr>

                    <tr>
                      <td width="120" align="right"></td>
                      <td width="auto" align="left">
                        <input type="hidden" value="62970" name="once" />
                        <input
                          type="button"
                          class="super normal button"
                          value="登录"
                          @click="loginadmin"
                          @keyup.enter="loginadmin"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td width="120" align="right"></td>
                      <td width="auto" align="left">
                        <span>问题致电：12345678910</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <input type="hidden" value="/" name="next" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="sep20"></div>
    </div>
    <div id="Bottom">
      <div class="content">
        <div class="inner">
          <div class="sep10"></div>
          <div class="fr">
            <a
              href="https://www.digitalocean.com/?refcode=1b51f1a7651d"
              target="_blank"
            >
              <div id="DigitalOcean"></div>
            </a>
          </div>
          <strong>
            <a href="#" class="dark" target="_self">关于</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">FAQ</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">我们的愿景</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">广告投放</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">感谢</a>
            &nbsp; <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">实用小工具</a>
            &nbsp;
          </strong>
          <div class="sep10"></div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { userLogin } from "@/api";
import Footer from "../webHome/Footer";
export default {
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    loginadmin() {
      userLogin(this.email, this.password).then((res) => {
        const { data } = res;
        this.admin = data;
        if (res.data.data.type == 0) {
          console.log("adminlogin", res);
          this.$store.dispatch("adminLogin", {
            admin: data,
          });
          this.$message({
            message: "尊敬的管理员，欢迎您！",
            type: "success",
          });
          this.$router.push("/adminhome");
        } else if (res.data.data.type == 1) {
          this.$message.error("登陆失败：该账号无管理员权限");
        } else {
          this.$message.error("登陆失败：账号或密码错误");
        }
      });
    },
  },
  components: {
    Footer,
  },
};
</script>

<style scoped>
.table {
  display: table;
  border-collapse: separate;
  border-color: grey;
}
.tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.box {
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e2e2;
}
.header {
  padding: 10px;
  font-size: 15px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  overflow: auto;
}
.cell {
  padding: 10px;
  font-size: 14px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}
.Leftbar {
  width: 0;
  float: left;
}
.Rightbar {
  width: 270px;
  float: right;
  margin-right: 20px;
}
.Main {
  width: auto;
  margin: 0 310px 0 20px;
}
a.dark:active,
a.dark:link,
a.dark:visited {
  color: gray;
  text-decoration: none;
}
a:active,
a:link,
a:visited {
  color: #778087;
  text-decoration: none;
  word-break: break-word;
}
.fr {
  float: right;
  text-align: right;
}
.sep10 {
  height: 10px;
}
.inner {
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
div {
  display: block;
}
:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}
#Top {
  text-align: center;
  background-color: var(--box-background-color);
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  background-size: 44px 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  padding: 0 20px;
}
#Wrapper {
  text-align: center;
  background-color: #e2e2e2;
  background-image: url(/static/img/shadow_light.png);
  background-repeat: repeat-x;
}
#Bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  background-color: var(--box-background-color);
  text-align: center;
  color: #999;
  padding: 0 10px;
}
body {
  padding: 0;
  margin: 0;
  font-family: helvetica neue, luxi sans, dejavu sans, segoe ui,
    hiragino sans gb, microsoft yahei, sans-serif;
}
.sep20 {
  height: 20px;
}
.content {
  min-width: 600px;
  max-width: 1100px;
  margin: 0 auto;
}
</style>