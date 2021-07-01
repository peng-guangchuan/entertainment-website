<template>
  <div>
    <div style="margin: 1rem" class="level-center">
      <h1 class="title">电影</h1>
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
              placeholder="Find a movie"
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
            style="width: 235px; height: 300px"
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
            <el-button
              type="text"
              class="button"
              @click="findOneMovieInfo(o.id)"
              >查看详情</el-button
            >
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
import { getSearchMovie } from "@/api";

export default {
  data() {
    return {
      searchKey: "",
      selectValue: 0,
      isSearch: false,
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
    searching() {
      if (this.searchKey == "") {
        this.$message({
          showClose: true,
          message: "请输入搜索内容！",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        this.getSearchMovieApi(1);
      }
    },
    getSearchMovieApi(page) {
      getSearchMovie(this.searchKey, this.selectValue, page).then((res) => {
        this.movies.length = 0;
        this.movieInfos.length = 0;
        this.movieInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        var temp = [];
        for (let i = 0; i < this.movieInfos.length; i++) {
          this.movieInfos[i].img =
            this.$store.state.imgBaseUrl + this.movieInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.movieInfos[i];
          } else {
            temp[temp.length] = this.movieInfos[i];
            this.movies.push(temp);
            temp = [];
          }
        }
        if (temp.length != 0) {
          this.movies.push(temp);
        }
      });
    },
    findOneMovieInfo(movieid) {
      this.$router.push({
        path: "/moviedetail",
        query: {
          id: movieid,
        },
      });
    },
    getAllMoviesApi(page) {
      getAllMovies(page).then((res) => {
        this.movies.length = 0;
        this.movieInfos.length = 0;
        this.movieInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        var temp = [];
        for (let i = 0; i < this.movieInfos.length; i++) {
          this.movieInfos[i].img =
            this.$store.state.imgBaseUrl + this.movieInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.movieInfos[i];
          } else {
            temp[temp.length] = this.movieInfos[i];
            this.movies.push(temp);
            temp = [];
          }
        }
        if (temp.length != 0) {
          this.movies.push(temp);
        }
      });
    },
    getNextMovies() {
      if (this.isSearch) {
        this.getSearchMovieApi(this.currentp);
      } else {
        this.getAllMoviesApi(this.currentp);
      }
    },
  },
  mounted() {
    this.getAllMoviesApi(1);
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

