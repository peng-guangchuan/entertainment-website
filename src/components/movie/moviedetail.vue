<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Top />
    <Header title="电影详情">
      <i class="iconfont icon-right"></i>
    </Header>
    <div id="content" class="contentDetail">
      <div class="detail_list">
        <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <el-image
              :src="oneMovieInfo.img"
              :preview-src-list="[oneMovieInfo.img]"
            >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <div class="detail_list_info">
            <h2>《{{ oneMovieInfo.name }}》</h2>
            <p>导演：{{ oneMovieInfo.director }}</p>
            <p>演员：{{ oneMovieInfo.actor }}</p>
            <p>类型：{{ oneMovieInfo.genre }}</p>
            <p>上映时间：{{ oneMovieInfo.showtime }}</p>
          </div>
          <div class="detailIntro">
            <p>内容简介...</p>
            <p style="text-indent: 2em">{{ oneMovieInfo.description }}</p>
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
            ><span style="color: #67c23a">给该作品打个分吧：</span
            ><el-rate
              v-model="toMarkValue"
              show-text
              :colors="colors"
              :allow-half="true"
              :change="dafen()"
            ></el-rate
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
                  <el-col :span="19"
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
import { getOneMovie } from "@/api";
import { getComment } from "@/api";
import { getGrade } from "@/api";
import { postComment } from "@/api";
import { dianZan } from "@/api";
import { postGrade } from "@/api";

export default {
  name: "detail",
  data() {
    return {
      dianzanIcon: 0,
      markValue: 0,
      markNum: 0,
      toMarkValue: 0,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      commentValue: "",
      oneMovieInfo: {
        isRecommend: 0,
        score: 0,
        scoreNum: 0,
        id: 0,
        name: "",
        showtime: "",
        director: "",
        genre: "",
        description: "",
        actor: "",
        img: "",
      },
      allComment: [
        {
          account: "",
          context: "",
          createTime: "",
          gender: 0,
          id: 0,
          isCurrentUserLike: false,
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
    dafen() {
      if (this.toMarkValue != 0) {
        let token = this.$store.state.user.token;
        let userId = this.$store.state.user.id;
        postGrade(
          token,
          userId,
          2,
          this.oneMovieInfo.id,
          this.toMarkValue
        ).then((res) => {
          if (res.data.code == 20000) {
            this.$notify({
              title: "打分成功！",
              message: "评分系统正在计算新分数~",
              type: "success",
              position: "bottom-right",
            });
          }
          console.log("postGRADE=", res);
        });
      }
    },
    postcomm() {
      let token = this.$store.state.user.token;
      let ownerId = this.$store.state.user.id;
      postComment(
        token,
        1,
        this.oneMovieInfo.id,
        ownerId,
        0,
        this.commentValue
      ).then((res) => {
        if (res.data.code == 20000) {
          getComment(1, this.oneMovieInfo.id, 1, 20, token).then((res) => {
            // 第四个参数写死了，没做分页
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
        console.log("postCommentRes", res);
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
          getComment(1, this.oneMovieInfo.id, 1, 10, token).then((res) => {
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
    let bookid = this.$route.query.id;
    getOneMovie(bookid).then((res) => {
      //   console.log(res);
      this.oneMovieInfo = res.data.data;
      this.oneMovieInfo.img =
        this.$store.state.imgBaseUrl + this.oneMovieInfo.img;
      console.log(this.oneMovieInfo);
    });
    let token = this.$store.state.user.token;
    getComment(1, bookid, 1, 10, token).then((res) => {
      this.allComment = res.data.data.records;
      //   console.log(this.allComment);
    });
    getGrade(1, bookid).then((res) => {
      this.markValue = res.data.data.score;
      this.markNum = res.data.data.num;
      //   console.log("grade");
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
</style>