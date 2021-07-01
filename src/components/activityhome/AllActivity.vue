<template>
  <div>
        <div style="margin: 1rem" class="level-center">
      <h1 class="title">活动</h1>
    </div>
    <div style="margin: 1rem" class="level-center">
      <div class="level-item">
        <p class="subtitle is-5"></p>
      </div>
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input"
              type="text"
              placeholder="Find a book"
              v-model="searchKey"
              @keyup.enter="searching()"
            />
          </p>
          <p class="control">
            <button class="button" @click="searching()">搜索</button>
          </p>
          <p class="control select">
            <select v-model="selectValue">
              <option value="1">有效活动</option>
              <option value="2">已结束活动</option>
            </select>
          </p>
        </div>
      </div>
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
                  <el-col :span="19">
                    <p class="artTitle">活动：{{ item.name }}</p>
                    <!-- 标题不能超过20个字符 -->
                  </el-col>
                  <el-col v-if="item.status == 1" :span="5">
                    <p class="userName" style="color: green">状态：有效活动</p>
                    <!-- 用户名不能超过8个字符 -->
                  </el-col>
                  <el-col v-else :span="5">
                    <p class="userName" style="color: grey">状态：已过期</p>
                    <!-- 用户名不能超过8个字符 -->
                  </el-col>
                </el-row>
              </el-header>
              <el-main>
                <el-row>
                  <el-col :offset="2" :span="20">
                    <div style="height: 110px; overflow: hidden">
                      <p v-html="item.description" class="artcontent"></p></div
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
</template>

<script>
import { getAllActivity } from "@/api";

export default {
  data() {
    return {
      searchKey: "",
      selectValue: 1,
      isSearch: false,
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
    findOneActivityInfo(activityid) {
      this.$router.push({
        path: "/activitydetail",
        query: {
          id: activityid,
        },
      });
    },
    searching() {
      if ((this.searchKey == "") & (this.selectValue == 0)) {
        this.$message({
          showClose: true,
          message: "请输入搜索内容！",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        this.getAllActivityApi(
          this.searchKey,
          this.selectValue,
          0,
          1,
          this.psize
        );
      }
    },
    getNextActicity() {
      if (this.isSearch) {
        this.getAllActivityApi(
          this.searchKey,
          this.selectValue,
          0,
          this.currentp,
          this.psize
        );
      } else if (this.selectValue != 0) {
        this.getAllActivityApi(
          "",
          this.selectValue,
          0,
          this.currentp,
          this.psize
        );
      } else {
        this.getAllActivityApi("", 1, 0, this.currentp, this.psize);
      }
    },
    comtips() {
      console.log("comtips");
    },
    // getLongCommentApi(type, id, ctype, page, size, token){
    //   getLongComment(type, id, ctype, page, size, token).then((res) => {
    //     console.log("getlongcomment",res);
    //   });
    // },
    getAllActivityApi(content, status, sequence, page, size) {
      getAllActivity(content, status, sequence, page, size).then((res) => {
        this.activitysInfo = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        // console.log("getallactivity", res);
        // console.log(this.activitysInfo);
      });
    },
  },
  mounted() {
    this.getAllActivityApi("", 1, 0, 1, this.psize);
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