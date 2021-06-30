<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="subtitle">新书速看</p>
        <hr />
        <el-carousel :interval="3000" type="card" height="530px">
          <el-carousel-item v-for="(o, index) in booksInfo" :key="index">
            <div style="margin: 1rem 1rem 0rem 1rem">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-image style="width: 254px; height: 360px" :src="o.img">
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                </el-image>
                <div style="padding: 14px">
                  <div>《{{ o.name }}》</div>
                  <div>{{ o.author }}</div>
                  <div>{{ o.publisher }}</div>
                  <el-button
                    type="text"
                    class="button"
                    @click="findOneBookInfo(o.id)"
                    >查看详情</el-button
                  >
                </div>
              </el-card>
            </div>
          </el-carousel-item>
        </el-carousel>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="subtitle">新音速听</p>
        <hr />
        <el-carousel :interval="3000" type="card" height="530px">
          <el-carousel-item v-for="(o, index) in musicsInfo" :key="index">
            <div style="margin: 4rem 1rem 0rem 1rem">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-image style="width: 254px; height: 254px" :src="o.img">
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
            </div>
          </el-carousel-item>
        </el-carousel>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="subtitle">新片速观</p>
        <hr />
        <el-carousel :interval="3000" type="card" height="530px">
          <el-carousel-item v-for="(o, index) in moviesInfo" :key="index">
            <div style="margin: 1rem 1rem 0rem 1rem">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-image style="width: 254px; height: 360px" :src="o.img">
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
            </div>
          </el-carousel-item>
        </el-carousel>
      </article>
    </div>
  </div>
</template>

<script>
import { getNewBook } from "@/api";
import { getNewMovie } from "@/api";
import { getNewMusic } from "@/api";
// import Pageination from "../forumHome/Pageination.vue";

export default {
  data() {
    return {
      contents: {
        typeId: 0,
        typeName: "",
        typeCreateTime: "",
        typeDesc: "",
        articleNum: 0,
      },
      booksInfo: [
        {
          author: "",
          description: "",
          id: 0,
          img: "",
          isRecommend: 0,
          isbn: "",
          name: "",
          publisher: "",
          publisherYear: 0,
          score: 0,
          scoreNum: 0,
        },
      ],
      moviesInfo: [
        {
          actor: "",
          description: "",
          director: "",
          genre: "",
          id: 0,
          img: "",
          isRecommend: 0,
          name: "",
          score: 0,
          scoreNum: 0,
          showtime: "",
        },
      ],
      musicsInfo: [
        {
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
      ],
    };
  },
  methods: {
    findOneBookInfo(bookid) {
      this.$router.push({
        path: "/bookdetail",
        query: {
          id: bookid,
        },
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
    findOneMusicInfo(musicid) {
      this.$router.push({
        path: "/musicdetail",
        query: {
          id: musicid,
        },
      });
    },
  },
  mounted() {
    getNewBook().then((res) => {
      this.booksInfo = res.data.data;
      for (let i = 0; i < this.booksInfo.length; i++) {
        this.booksInfo[i].img =
          this.$store.state.imgBaseUrl + this.booksInfo[i].img;
      }
      // console.log("newbook", this.booksInfo);
    });
    getNewMovie().then((res) => {
      this.moviesInfo = res.data.data;
      for (let i = 0; i < this.moviesInfo.length; i++) {
        this.moviesInfo[i].img =
          this.$store.state.imgBaseUrl + this.moviesInfo[i].img;
      }
      // console.log("newmOvie", this.moviesInfo);
    });
    getNewMusic().then((res) => {
      this.musicsInfo = res.data.data;
      for (let i = 0; i < this.musicsInfo.length; i++) {
        this.musicsInfo[i].img =
          this.$store.state.imgBaseUrl + this.musicsInfo[i].img;
      }
      console.log("newmusic", this.musicsInfo);
    });
    //   getHotArticleType()
    //     .then((res) => {
    //       const { data } = res;
    //       this.contents = data.content;
    //     })
    //     .catch(() => {});
    //   this.$store.dispatch("getpagemain");
    //   //bug，应该用action异步处理，再提交commit状态，明日更新（已解决）
    //   // getPageMain()
    //   //   .then(res => {
    //   //     const { data } = res;
    //   //     this.info = data.content;
    //   //   })
    //   //   .catch(() => {});
  },
  // components: {
  //   Pageination,
  // },
};
</script>

<style scoped>
.subtitle {
  text-align: left;
}
.button {
  text-align: center;
  margin: 0 auto;
}
.size {
  width: 64px;
  height: 64px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
