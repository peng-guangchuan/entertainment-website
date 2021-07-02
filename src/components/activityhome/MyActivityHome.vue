<template>
  <div id="activityhome">
    <Top />
    <el-row>
      <el-col :span="14" :push="5" :pull="5">
        <div>
          <div style="margin: 1rem" class="level-center">
            <h1 class="title">我的活动</h1>
          </div>
          <div class="tile is-ancestor" style="margin: 1rem 0 0 0">
            <div class="tile is-vertical">
              <el-card
                shadow="hover"
                class="box-card"
                v-for="(item, i) in activitysInfo"
                :key="i"
              >
                <div class="text item">
                  <el-container>
                    <el-header>
                      <el-row>
                        <el-col :span="18">
                          <p class="artTitle">活动：{{ item.name }}</p>
                          <!-- 标题不能超过20个字符 -->
                        </el-col>
                        <el-col :span="6">
                          <span class="userName" style="color: green">
                            状态：已报名
                          </span>
                          <el-button
                            type="primary"
                            @click="goEassy(item.i)"
                            plain
                            round
                            >写随笔</el-button
                          >
                        </el-col>
                      </el-row>
                    </el-header>
                    <el-main>
                      <el-row>
                        <el-col :offset="2" :span="20">
                          <div style="height: 110px; overflow: hidden">
                            <p
                              v-html="item.description"
                              class="artcontent"
                            ></p></div
                        ></el-col>
                      </el-row>
                    </el-main>
                    <el-footer>
                      <el-row>
                        <el-col :span="19"
                          ><div class="starttime">
                            活动时间：{{ item.time }}
                          </div></el-col
                        >
                        <el-col :span="5">
                          <div
                            style="cursor: pointer"
                            @click="findOneActivityInfo(item.id)"
                          >
                            <div class="" style="float: left">
                              <i class="el-icon-more"></i>
                            </div>
                            <div class="artMore">活动详情</div>
                          </div>
                        </el-col>
                      </el-row>
                    </el-footer>
                  </el-container>
                </div>
              </el-card>
              <div class="block" style="margin-bottom: 1rem">
                <el-pagination
                  @current-change="getNextActicity()"
                  :current-page.sync="currentp"
                  :page-size="psize"
                  layout="total, prev, pager, next, jumper"
                  :total="ptotal"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <Footer />
  </div>
</template>

<script>
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";
import { getUserActivity } from "@/api";

export default {
  data() {
    return {
      userId: 0,
      token: 0,
      psize: 5,
      ptotal: 0,
      currentp: 1,
      activitysInfo: [
        {
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
      ],
    };
  },
  methods: {
    goEassy(activityid) {
      this.$router.push({
        path: "/postactivity",
        query: {
          id: activityid,
        },
      });
    },
    findOneActivityInfo(activityid) {
      this.$router.push({
        path: "/activitydetail",
        query: {
          id: activityid,
        },
      });
    },
    getNextActicity() {
      this.getUserActivityApi(this.currentp);
    },
    getUserActivityApi(page) {
      getUserActivity(this.userId, page, this.psize, this.token).then((res) => {
        console.log("getUserActivity", res);
      });
    },
  },
  components: {
    Top,
    Footer,
  },
  mounted() {
    this.userId = this.$store.state.user.id;
    this.token = this.$store.state.user.token;
    this.getUserActivityApi(1);
  },
};
</script>

<style scoped>
.artTitle {
  text-align: left;
  font-weight: bold;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  margin-left: 2rem;
}
.box-card {
  padding: 0px;
  margin: 0px;
  margin-bottom: 1rem;
}
.userName {
  text-align: left;
  font-weight: initial;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
}
.artcontent {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
}
.el-main {
  padding: 4px 20px 4px 20px;
  margin: 0px;
}
.el-card__body {
  padding: 4px 20px 4px 20px;
  margin: 0px;
}
.el-icon-more {
  font-size: 40px;
  color: rgb(158, 38, 173);
}
.artBtn {
  background-color: rgb(225, 237, 238);
  border: 1px solid grey;
  border-radius: 8px;
  margin-right: 5px;
  cursor: pointer;
}
.artBtn span {
  margin-left: 2px;
}
.artMore {
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 18px;
  float: left;
}
.starttime {
  height: 40px;
  line-height: 40px;
  text-align: left;
  margin-left: 30px;
}
.artMore:hover {
  text-decoration: underline;
  text-decoration-color: rgb(19, 4, 161);
  font-weight: bold;
}
</style>