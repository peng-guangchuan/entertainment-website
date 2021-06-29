<template>
  <div>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="movieCard"
      v-for="(i, index) in movies"
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
            <div>导演：{{ o.director }}</div>
            <div>类型：{{ o.genre }}</div>
            <el-button type="text" class="button">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block movieCard">
      <el-pagination
        @current-change="getNextMovies()"
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
import { getAllMovies } from "@/api";

export default {
  data() {
    return {
      currentp: 1,
      psize: 9,
      ptotal: 0,
      movies: [],
      movieInfos: [
        {
          actor: "",
          description: "",
          director: "",
          genre: "",
          id: 0,
          img: "",
          isRecommend: 1,
          name: "",
          score: 0,
          scoreNum: 0,
          showtime: "",
        },
      ],
    };
  },
  methods: {
    getNextMovies() {
      console.log("getNextMovies");
      getAllMovies(this.currentp).then((res) => {
        // console.log("res=");
        // console.log(res);
        this.movies.length = 0;
        this.movieInfos.length = 0;
        this.movieInfos = res.data.data.records;
        // console.log(this.movieInfos);
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;

        // var temparr = []
        var temp = [];
        for (let i = 0; i < this.movieInfos.length; i++) {
          this.movieInfos[i].img =
            this.$store.state.imgBaseUrl + this.movieInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.movieInfos[i];
          } else {
            temp[temp.length] = this.movieInfos[i];
            // temparr[temparr.length] = temp;
            this.movies.push(temp);
            temp = [];
          }
        }
        // this.$set(this.movies, this., obj)
        // console.log(this.movies);
      });
    },
  },
  mounted() {
    getAllMovies(1).then((res) => {
      // console.log("res=");
      // console.log(res);
      this.movieInfos = res.data.data.records;
      // console.log(this.movieInfos);
      this.currentp = res.data.data.current; // 分页可对数据转型
      this.ptotal = res.data.data.total;
      var temp = [];
      for (let i = 0; i < this.movieInfos.length; i++) {
        this.movieInfos[i].img =
          this.$store.state.imgBaseUrl + this.movieInfos[i].img;
        if ((i + 1) % 3 != 0) {
          temp[temp.length] = this.movieInfos[i];
        } else {
          temp[temp.length] = this.movieInfos[i];
          this.movies[this.movies.length] = temp;
          temp = [];
        }
      }
      // console.log(this.movies);
    });
  },
  computed: {},
};
</script>

<style scoped>
.movieMain {
  background-color: red;
}
.movieCard {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
</style>

