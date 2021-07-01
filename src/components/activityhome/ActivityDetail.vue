<template>
  <div>
    <Top />
    <div class="Wrapper">
      <div class="content">
        <div class="Leftbar"></div>
        <!-- <div class="Rightbar" v-if="$store.state.isLogin">
          <div class="sep20"></div>
          <div class="box">
            <div class="cell">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                  <tr>
                    <td width="48" valign="top">
                      <a href="#">
                        <img
                          src="
                            https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png
                          "
                          class="avatar"
                          border="0"
                          align="default"
                          style="max-width: 48px; max-height: 48px"
                        />
                      </a>
                    </td>
                    <td width="auto" align="left">
                      <span class="bigger">
                        <a href="#" style="font-size: 18px"
                          >@{{ $store.state.user.userName }}</a
                        >
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="sep10"></div>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                  <tr>
                    <td
                      width="34%"
                      style="
                        border-left: 1px solid rgba(100, 100, 100, 0.4);
                        border-right: 1px solid rgba(100, 100, 100, 0.4);
                      "
                      align="center"
                    >
                      <a href="#" class="dark" style="display: block">
                        <span class="fade">你的帖子数</span>
                        <div class="sep3"></div>
                        <span class="bigger">{{ myartnum }}</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="inner">
              <div class="fr" id="money" style="margin: -3px 0px 0px 0px"></div>
              <a class="fade" @click="Post">去发帖</a>
            </div>
          </div>
        </div> -->
        <div id="Rightbar">
          <div class="sep20"></div>
          <div class="box">
            <div class="cell">
              <strong>加入你喜欢的活动吧~</strong>
              <div class="sep5"></div>
              <span class="fade">这是一个值得探索的地方</span>
            </div>
          </div>
          <div class="sep20"></div>
        </div>
        <div class="Main">
          <div class="sep20"></div>
          <div class="box" style="border-bottom: 0px">
            <div class="header">
              <div class="fr">
                <div style="margin-right: 1rem">
                  <el-badge :value="activityOneInfo.peopleNum" class="item">
                    <el-button
                      :disabled="btnSwitch"
                      type="primary"
                      @click="joinactivity()"
                      >报名</el-button
                    >
                  </el-badge>
                </div>
              </div>
              <div class="sep10"></div>
              <h1>主题：{{ activityOneInfo.name }}</h1>
              <small class="gray">活动时间：{{ activityOneInfo.time }}</small
              ><br />
              <small class="gray">活动地点：{{ activityOneInfo.address }}</small
              ><br />
              <small class="gray"
                >报名截止时间：{{ activityOneInfo.deadline }}</small
              >
            </div>
            <div class="cell"><p v-html="activityOneInfo.description"></p></div>
          </div>
          <div class="sep20"></div>
          <div class="box">
            <div class="cell">回复</div>
            <div class="fuck"></div>
            <div v-if="allComment.length != 0">
              <div class="cell" v-for="(c, index) in allComment" :key="index">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tbody>
                    <tr>
                      <td width="auto" valign="top" align="left">
                        <div class="fr">
                          &nbsp; &nbsp;
                          <span class="no"></span>
                        </div>
                        <div class="sep3"></div>
                        <strong>
                          <p
                            style="
                              font-size: 16px;
                              font-weight: initial;
                              line-height: 20px;
                            "
                            href="#"
                            class="dark"
                          >
                            @{{ c.account }}：{{ c.context }}&nbsp;|&nbsp;
                            <span style="color: grey" class="ago"
                              >{{ c.createTime }}&nbsp;
                              <span
                                v-if="!c.isCurrentUserLike"
                                @click="dianzan(c.id)"
                                ><i class="far fa-heart"></i>
                                {{ c.likeNum }}</span
                              >
                              <span v-else @click="dianzan(c.id)"
                                ><i class="fas fa-heart"></i>
                                {{ c.likeNum }}</span
                              ></span
                            >
                            <span
                              v-if="!c.isCurrentUserPost"
                              style="color: white"
                              >.</span
                            >
                            <el-popconfirm
                              v-else
                              title="确定要删除这条回复吗？"
                              icon="el-icon-info"
                              icon-color="red"
                              @onConfirm="deleteCom(c.id)"
                            >
                              <span
                                style="float: right"
                                class="deleteIcon"
                                slot="reference"
                              >
                                <i class="el-icon-circle-close"></i>
                              </span>
                            </el-popconfirm>
                          </p> </strong
                        >&nbsp; &nbsp;

                        <div class="sep5"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else class="cell">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tbody>
                  <tr>
                    <td>还没有人留下评论噢，来坐上这一楼的沙发吧~</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="sep20"></div>
          <div class="box" v-show="$store.state.isLogin">
            <div class="cell">
              <div class="fr">
                <span> <strong>↑</strong> 注意用语规范 </span>
              </div>
              添加一条新回复
            </div>
            <div class="cell">
              <form>
                <textarea
                  v-model="newComText"
                  name="content"
                  maxlength="10000"
                  class="mll"
                  id="reply_content"
                  style="
                    overflow: hidden;
                    overflow-wrap: break-word;
                    resize: none;
                    height: 112px;
                  "
                ></textarea>
                <div class="sep10"></div>
                <div class="fr">
                  <div class="sep5"></div>
                  <span class="gray">请尽量让自己的回复能够对别人有帮助</span>
                </div>
                <input type="hidden" value="41475" name="once" />
                <input
                  type="button"
                  value="回复"
                  class="super normal button"
                  @click="newcomment()"
                />
              </form>
            </div>
            <div class="inner">
              <div class="fr">
                <a href="#">← 顶部</a>
              </div>
              &nbsp;
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
          <div class="fr"></div>
          <strong>
            <a href="#" class="dark" target="_self">关于</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">FAQ</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">我们的愿景</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">广告投放</a> &nbsp;
            <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">感谢</a>
            &nbsp; <span class="snow">·</span> &nbsp;
            <a href="#" class="dark" target="_self">实用小工具</a>
          </strong>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
import { getOneActivity } from "@/api";
import { getComment } from "@/api";
import { postComment } from "@/api";
import { deleteComment } from "@/api";
import { dianZan } from "@/api";
import { joinActivity } from "@/api";

export default {
  data() {
    return {
      btnSwitch: false,
      newComText: "",
      activityOneInfo: {
        address: "",
        deadline: "",
        description: "",
        id: 0,
        isRecommend: 0,
        name: "",
        owner: 0,
        peopleNum: 0,
        status: 0,
        time: "",
      },
      allComment: [
        {
          account: "",
          context: "",
          createTime: "",
          gender: 0,
          id: 0,
          isCurrentUserLike: false,
          isCurrentUserPost: false,
          likeNum: 0,
          owerId: 0,
        },
      ],
    };
  },
  methods: {
    joinactivity() {
      let token = this.$store.state.user.token;
      let stu_id = this.$store.state.user.id;
      joinActivity(token, stu_id, this.activityOneInfo.id).then((res) => {
        if (res.data.code == 20000) {
          this.$notify({
            title: "报名成功！",
            message: "请准时到指定地点参与活动~",
            type: "success",
            position: "bottom-right",
          });
          this.btnSwitch = true;
          getOneActivity(this.activityOneInfo.id).then((res) => {
            this.activityOneInfo = res.data.data;
          });
        } else if (res.data.code == 20001) {
          this.$notify.info({
            title: "报名失败。",
            message: "报名时间已过，请留意下次活动~",
            position: "bottom-right",
          });
          this.btnSwitch = true;
        } else if (res.data.code == 21003) {
          this.$notify.info({
            title: "报名失败。",
            message: "请勿重复报名~",
            position: "bottom-right",
          });
          this.btnSwitch = true;
        }
      });
    },
    deleteCom(comid) {
      deleteComment(comid, this.$store.state.user.token).then((res) => {
        if (res.data.code == 20000) {
          this.$notify({
            title: "评论删除成功！",
            message: "期待您的下次评论~",
            type: "success",
            position: "bottom-right",
          });
          getComment(
            4,
            this.activityOneInfo.id,
            1,
            20,
            this.$store.state.user.token
          ).then((res) => {
            this.allComment = res.data.data.records;
          });
        } else {
          console.log("评论删除失败", res);
        }
      });
    },
    dianzan(commentId) {
      dianZan(commentId, this.$store.state.user.token).then((res) => {
        if (res.data.code == 20000) {
          this.$notify({
            title: "点赞成功！",
            message: "感谢您的支持~",
            type: "success",
            position: "bottom-right",
          });
          let token = this.$store.state.user.token;
          getComment(4, this.activityOneInfo.id, 1, 20, token).then((res) => {
            this.allComment = res.data.data.records;
          });
        } else if (res.data.code == 21006) {
          this.$notify.info({
            title: "点赞失败。",
            message: "不能重复点赞噢~",
            position: "bottom-right",
          });
        }
      });
    },
    newcomment() {
      if (!this.$store.state.isLogin) {
        this.$notify.info({
          title: "评论发布失败。",
          message: "请先进行账号登陆~",
          position: "bottom-right",
        });
        return;
      }
      let token = this.$store.state.user.token;
      let ownerId = this.$store.state.user.id;
      // 第二个参数：评论作品的类型，第五个为评论类型，短评为0
      postComment(
        token,
        4,
        this.activityOneInfo.id,
        ownerId,
        0,
        this.newComText
      ).then((res) => {
        if (res.data.code == 20000) {
          // 获取评论的第三、四个参数写死了，没做分页
          getComment(4, this.activityOneInfo.id, 1, 20, token).then((res) => {
            this.allComment = res.data.data.records;
          });
          this.$notify({
            title: "评论发布成功！",
            message: "感谢您对该作品的观点分享~",
            type: "success",
            position: "bottom-right",
          });
        }
      });
    },
  },
  mounted() {
    let activityid = this.$route.query.id;
    getOneActivity(activityid).then((res) => {
      this.activityOneInfo = res.data.data;
      // console.log("actii", this.activityOneInfo);
    });
    let token = this.$store.state.user.token;
    getComment(4, activityid, 1, 20, token).then((res) => {
      this.allComment = res.data.data.records;
      // console.log("getcomment", res);
    });
  },
  components: {
    Top,
    Footer,
  },
};
</script>

<style scoped>
textarea {
  /* -webkit-writing-mode: horizontal-tb !important; */
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textarea;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  flex-direction: column;
  resize: auto;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin: 0em;
  font: 400 13.3333px Arial;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 169, 169);
  border-image: initial;
  padding: 2px;
  width: 720px;
}
form {
  display: block;
  margin-top: 0em;
}
#Rightbar {
  width: 270px;
  float: right;
  margin-right: 20px;
}
.bigger {
  text-align: center;
  font-size: 20px;
}
.sep20 {
  height: 20px;
}
.Wrapper {
  background-color: #e2e2e2;
  background-repeat: repeat-x, repeat-x;
  text-align: center;
}
.content {
  min-width: 600px;
  max-width: 1100px;
  margin: 0 auto;
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
.div {
  display: block;
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
.fuck {
  border-bottom: 1px solid #e2e2e2;
}
.fr {
  float: right;
  text-align: right;
}
.sep10 {
  height: 10px;
}
.h1 {
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  margin: 0 0 10px;
  padding: 0;
}
.gray {
  color: #999;
}
.small {
  font-size: smaller;
}
#Bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  background-color: var(--box-background-color);
  text-align: center;
  color: #999;
  padding: 0 10px;
}
:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}
.inner {
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
strong {
  font-weight: bold;
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
a {
  color: #000;
}
.deleteIcon:hover {
  cursor: pointer;
  font-size: 18px;
}
</style>
