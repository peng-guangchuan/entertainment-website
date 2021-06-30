<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Top />
    <Header title="音乐详情">
      <i class="iconfont icon-right"></i>
    </Header>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img" style="height:110px">
            <el-image
            
              :src="oneMusicInfo.img"
              :preview-src-list="[oneMusicInfo.img]"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <div class="detail_list_info" style="max-width:300px">
            <h2>《{{ oneMusicInfo.name }}》</h2>
            <p>歌手：{{ oneMusicInfo.singer }}</p>
            <p>专辑：{{ oneMusicInfo.album }}</p>
          </div>
          <div class="detailIntro" >
            <p>歌曲歌词...</p>
            <p style="text-indent: 2em">{{ oneMusicInfo.lyric }}</p>
          </div>
          <div class="detailMark">
            <div>
              <el-rate
                v-model="markValue"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
            <div>
              评分人数：<strong>{{ markNum }}</strong>
            </div>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <el-row :gutter="20">
          <el-col :span="12" style="padding: 0px 0px 0px 10px">
            <el-input
              placeholder="留下您的观点"
              v-model="commentValue"
              maxlength="50"
              show-word-limit
            >
              <template slot="prepend"
                >发表短评 <i class="el-icon-chat-dot-round"></i>
              </template> </el-input
          ></el-col>
          <el-col :span="1" style="padding: 0px"
            ><el-button type="primary" plain @click="postcomm()"
              >发表</el-button
            ></el-col
          >
          <el-col :span="5"><div>.</div></el-col>
          <el-col :span="5"
            ><span style="color: #67c23a">给该作品打个分吧：</span>
            <el-popover placement="top" width="160" v-model="visible">
              <p>确定为该作品打{{ toMarkValue }}分吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="dafen()"
                  >确定</el-button
                >
              </div>
              <el-rate
                v-model="toMarkValue"
                show-text
                :colors="colors"
                :disabled="rateSwatch"
                :allow-half="true"
                slot="reference"
              ></el-rate></el-popover
          ></el-col>
        </el-row>
        <div></div>
        <div class="detailMark">所有评论：</div>
        <div v-if="allComment.length != 0">
          <el-row>
            <el-col :span="20" :offset="2">
              <el-card
                v-for="(i, index) in allComment"
                :key="index"
                shadow="hover"
                class="commentCard"
              >
                <el-row :gutter="20">
                  <el-col :span="18"
                    ><div class="commentText">
                      @ {{ i.account }}：{{ i.context }}
                    </div></el-col
                  >
                  <el-col :span="4"
                    ><div class="commentTime">
                      {{ i.createTime }}&nbsp;
                    </div></el-col
                  >
                  <el-col :span="1"
                    ><span v-if="!i.isCurrentUserLike" @click="dianzan(i.id)"
                      ><i class="far fa-heart"></i> {{ i.likeNum }}</span
                    >
                    <span v-else @click="dianzan(i.id)"
                      ><i class="fas fa-heart"></i> {{ i.likeNum }}</span
                    ></el-col
                  >
                                   <el-col :span="1">
                    <span v-if="!i.isCurrentUserPost" style="color: white"
                      >.</span
                    >
                    <el-popconfirm
                      v-else
                      title="确定要删除这条评论吗？"
                      icon="el-icon-info"
                      icon-color="red"
                      @onConfirm="deleteCom(i.id)"
                    >
                      <span class="deleteIcon" slot="reference">
                        <i class="el-icon-circle-close"></i>
                      </span>
                    </el-popconfirm>
                  </el-col>
                </el-row>
              </el-card></el-col
            >
          </el-row>
        </div>
        <div v-else>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-card shadow="hover" class="commentCard"
                ><p>还没有人留下观点呢~来坐上第一楼的沙发吧~</p>
              </el-card></el-col
            >
          </el-row>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../book/header";
import Top from "../forumHome/Top";
import Footer from "../forumHome/Footer";
import { getOneMusic } from "@/api";
import { getComment } from "@/api";
import { getGrade } from "@/api";
import { postComment } from "@/api";
import { dianZan } from "@/api";
import { postGrade } from "@/api";
import { getUserGrade } from "@/api";
import { deleteComment } from "@/api";

export default {
  data() {
    return {
      dianzanIcon: 0,
      visible: false,
      rateSwatch: false,
      markValue: 0,
      markNum: 0,
      toMarkValue: 0,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      commentValue: "",
      oneMusicInfo: {
        album: "",
        id: 0,
        img: "",
        isRecommend: 0,
        lyric: "",
        name: "",
        score: 0,
        scoreNum: 0,
        singer: "",
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
  components: {
    Header,
    Top,
    Footer,
  },
  methods: {
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
            3,
            this.oneMusicInfo.id,
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
    dafen() {
      if (this.toMarkValue != 0) {
        this.visible = false;
        var _this = this;
        let token = this.$store.state.user.token;
        let userId = this.$store.state.user.id;
        postGrade(
          token,
          userId,
          3,
          this.oneMusicInfo.id,
          this.toMarkValue
        ).then((res) => {
          if (res.data.code == 20000) {
            this.$notify({
              title: "打分成功！",
              message: "评分系统正在计算新分数~",
              type: "success",
              position: "bottom-right",
            });
            _this.rateSwatch = true;
            setTimeout(() => {
              this.getNewGrade();
            }, 2000);
          } else {
            this.$notify.info({
              title: "评分失败。",
              message: "不能重复评分噢~",
              position: "bottom-right",
            });
          }
          // console.log("postGRADE=", res);
        });
      }
    },
    getNewGrade() {
      getGrade(3, this.oneMusicInfo.id).then((res) => {
        this.markValue = res.data.data.score;
        this.markNum = res.data.data.num;
        //   console.log("grade");
        //   console.log(res);
      });
    },
    postcomm() {
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
      postComment(
        token,
        3,
        this.oneMusicInfo.id,
        ownerId,
        0,
        this.commentValue
      ).then((res) => {
        if (res.data.code == 20000) {
          // 获取评论的第三、四个参数写死了，没做分页
          getComment(3, this.oneMusicInfo.id, 1, 20, token).then((res) => {
            this.allComment = res.data.data.records;
            //   console.log(this.allComment);
          });
          this.$notify({
            title: "评论发布成功！",
            message: "感谢您对该作品的观点分享~",
            type: "success",
            position: "bottom-right",
          });
        }
        // console.log("postCommentRes", res);
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
          getComment(3, this.oneMusicInfo.id, 1, 20, token).then((res) => {
            this.allComment = res.data.data.records;
            //   console.log(this.allComment);
          });
        } else if (res.data.code == 21006) {
          this.$notify.info({
            title: "点赞失败。",
            message: "不能重复点赞噢~",
            position: "bottom-right",
          });
        }
        // console.log("dianzan");
        // console.log(res.data);
      });
    },
  },
  mounted() {
    let musicid = this.$route.query.id;
    getOneMusic(musicid).then((res) => {
      //   console.log(res);
      this.oneMusicInfo = res.data.data;
      this.oneMusicInfo.img =
        this.$store.state.imgBaseUrl + this.oneMusicInfo.img;
      //   console.log(this.oneMusicInfo);
    });
    let token = this.$store.state.user.token;
    getComment(3, musicid, 1, 20, token).then((res) => {
      this.allComment = res.data.data.records;
      //   console.log(this.allComment);
    });
    getGrade(3, musicid).then((res) => {
      this.markValue = res.data.data.score;
      this.markNum = res.data.data.num;
      //   console.log("grade");
      //   console.log(res);
    });
    getUserGrade(token, 3, musicid).then((res) => {
      if (res.data.code == 20000) {
        this.toMarkValue = res.data.data;
        this.rateSwatch = true;
      }
      //   console.log(res);
    });
  },
};
</script>

<style scoped>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background: white;
}
.slide-enter-active {
  animation: 0.5s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: 1px solid #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list_info {
  text-align: left;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: #fff;
  font-weight: 400;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: #fff;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
  text-align: center;
  background-color: #dae7e9;
}
.detailIntro {
  margin-top: 1rem;
  margin-left: 1rem;
  text-align: left;
  width: 1200px;
  height: 180px;
  overflow: auto;
}
.detailMark {
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
  text-align: left;
  width: 200px;
}
.commentCard {
  margin-top: 1rem;
  /* padding-bottom: 1rem; */
}
.commentText {
  text-align: left;
}
.commentLike {
  float: right;
}
.commentTime {
  float: right;
}
.deleteIcon:hover {
  cursor: pointer;
  font-size: 18px;
}
</style>