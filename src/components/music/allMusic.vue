<template>
  <div>
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
            <div>歌名：{{ o.name }}</div>
            <div>歌手：{{ o.singer }}</div>
            <div>专辑：{{ o.album }}</div>
            <el-button type="text" class="button">查看详情</el-button>
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

export default {
  data() {
    return {
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
    getNextMusic() {
      console.log("getNextMusic");
      getAllMusic(this.currentp).then((res) => {
        // console.log("res=");
        // console.log(res);
        this.musics.length = 0;
        this.musicInfos.length = 0;
        this.musicInfos = res.data.data.records;
        // console.log(this.musicInfos);
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;

        // var temparr = []
        var temp = [];
        for (let i = 0; i < this.musicInfos.length; i++) {
          this.musicInfos[i].img = this.$store.state.imgBaseUrl   + this.musicInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.musicInfos[i];
          } else {
            temp[temp.length] = this.musicInfos[i];
            // temparr[temparr.length] = temp;
            this.musics.push(temp);
            temp = [];
          }
        }
        // this.$set(this.musics, this., obj)
        // console.log(this.musics);
      });
    },
  },
  mounted() {
    getAllMusic(1).then((res) => {
      // console.log("res=");
      // console.log(res);
      this.musicInfos = res.data.data.records;
      // console.log(this.musicInfos);
      this.currentp = res.data.data.current; // 分页可对数据转型
      this.ptotal = res.data.data.total;
      var temp = [];
      for (let i = 0; i < this.musicInfos.length; i++) {
        this.musicInfos[i].img = this.$store.state.imgBaseUrl   + this.musicInfos[i].img;
        if ((i + 1) % 3 != 0) {
          temp[temp.length] = this.musicInfos[i];
        } else {
          temp[temp.length] = this.musicInfos[i];
          this.musics[this.musics.length] = temp;
          temp = [];
        }
      }
      console.log(this.musics);
    });
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

