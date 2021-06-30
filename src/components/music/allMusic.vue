<template>
  <div>
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
              placeholder="Find a music"
              v-model="searchKey"
              @keyup.enter="searching()"
            />
          </p>
          <p class="control">
            <button class="button" @click="searching()">搜索</button>
          </p>
          <p class="control select">
            <select v-model="selectValue">
              <option value="0">综合排序</option>
              <option value="1">评分降序</option>
              <option value="2">评分升序</option>
            </select>
          </p>
        </div>
      </div>
    </div>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="musicCard"
      v-for="(i, index) in musics"
      :key="index"
    >
      <el-col
        :span="3"
        v-for="(o, index) in i"
        :key="index"
        :offset="index > 0 ? 1 : 0"
      >
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-image
            style="width: 235px; height: 260px"
            :src="o.img"
            :preview-src-list="[o.img]"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <div style="padding: 14px">
            <div>《{{ o.name }}》</div>
            <div>歌手：{{ o.singer }}</div>
            <div>专辑：{{ o.album }}</div>
            <el-button
              type="text"
              class="button"
              @click="findOneMusicInfo(o.id)"
              >查看详情</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block musicCard">
      <el-pagination
        @current-change="getNextMusic()"
        :current-page.sync="currentp"
        :page-size="psize"
        layout="total, prev, pager, next, jumper"
        :total="ptotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllMusic } from "@/api";
import { getSearchMusic } from "@/api";

export default {
  data() {
    return {
      searchKey: "",
      selectValue: 0,
      isSearch: false,
      currentp: 1,
      psize: 9,
      ptotal: 0,
      musics: [],
      musicInfos: [
        {
          album: "",
          id: 0,
          img: "",
          isRecommend: 1,
          lyric: "",
          name: "",
          score: 0,
          scoreNum: 0,
          singer: "",
        },
      ],
    };
  },
  methods: {
    searching() {
      if (this.searchKey == "") {
        this.$message({
          showClose: true,
          message: "请输入搜索内容！",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        this.getSearchMusicApi(1);
      }
    },
    getSearchMusicApi(page) {
      getSearchMusic(this.searchKey, this.selectValue, page).then((res) => {
        this.musics.length = 0;
        this.musicInfos.length = 0;
        this.musicInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        var temp = [];
        for (let i = 0; i < this.musicInfos.length; i++) {
          this.musicInfos[i].img =
            this.$store.state.imgBaseUrl + this.musicInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.musicInfos[i];
          } else {
            temp[temp.length] = this.musicInfos[i];
            this.musics.push(temp);
            temp = [];
          }
        }
        if (temp.length != 0) {
          this.musics.push(temp);
        }
      });
    },
    findOneMusicInfo(musicid) {
      this.$router.push({
        path: "/musicdetail",
        query: {
          id: musicid,
        },
      });
    },
    getAllMusicApi(page) {
      getAllMusic(page).then((res) => {
        this.musics.length = 0;
        this.musicInfos.length = 0;
        this.musicInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        var temp = [];
        for (let i = 0; i < this.musicInfos.length; i++) {
          this.musicInfos[i].img =
            this.$store.state.imgBaseUrl + this.musicInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.musicInfos[i];
          } else {
            temp[temp.length] = this.musicInfos[i];
            this.musics.push(temp);
            temp = [];
          }
        }
        if (temp.length != 0) {
          this.musics.push(temp);
        }
      });
    },
    getNextMusic() {
      if (this.isSearch) {
        this.getSearchMusicApi(this.currentp);
      } else {
        this.getAllMusicApi(this.currentp);
      }
    },
  },
  mounted() {
    this.getAllMusicApi(1);
  },
  computed: {},
};
</script>

<style scoped>
.musicMain {
  background-color: red;
}
.musicCard {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>