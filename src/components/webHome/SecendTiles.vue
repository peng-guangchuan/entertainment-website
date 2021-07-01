<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <progress class="progress is-whrite is-small" value="100%" max="30">
        30%
      </progress>
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box">
            <div class="fuck">
              <p class="title">热门随笔</p>
              <hr />
              <el-row
                style="margin: 1rem 0 1rem 0"
                v-for="(i, index) in topEssays"
                :key="index"
              >
                <el-col :offset="3" :span="18">
                  <el-card shadow="always">
                    <el-row>
                      <el-col :span="21"
                        >@{{ i.name }}:
                        <span style="cursor: pointer">《{{ i.title }}》</span>
                      </el-col>
                      <el-col :span="3">
                        <span
                          ><i class="fas fa-heart"></i> {{ i.likeNum }}</span
                        ></el-col
                      >
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">仲园风景图</p>
            <b-carousel>
              <b-carousel-item v-for="(url, i) in ImgUrl" :key="i">
                <section :class="`hero is-medium `">
                  <div class="hero-body has-text-centered">
                    <span class="image">
                      <img style="width: 530px; height: 400px" :src="url" />
                    </span>
                  </div>
                </section>
              </b-carousel-item>
            </b-carousel>
          </article>
        </div>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">友情链接</p>
          <hr />
          <div class="content">
            <a href="http://www.zhku.edu.cn/">仲恺农业工程学院官网</a>&nbsp;
            <a href="http://jw.zhku.edu.cn">仲恺农业工程学院教务网</a>&nbsp;
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="content">
          <p class="title">高分推荐榜</p>
          <el-tabs v-model="activeName" :stretch="true">
            <el-tab-pane label="书 籍" name="first">
              <span slot="label">
                <img :src="require(`@/assets/书.png`)" /> 书&nbsp;籍</span
              >
              <el-row
                type="flex"
                justify="center"
                align="middle"
                class="bookCard"
                v-for="(i, index) in books2_3"
                :key="index"
              >
                <el-col :span="12" v-for="(o, index) in i" :key="index">
                  <el-card
                    style="margin: 0 2rem 1rem 2rem"
                    :body-style="{ padding: '5px 0px 0px 0px' }"
                    shadow="hover"
                  >
                    <div style="margin: 0; padding: 0">
                      <el-image
                        style="width: 92px; height: 130px"
                        :src="o.img"
                        :preview-src-list="[o.img]"
                      >
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </el-image>
                      <div style="font-size: 14px">
                        <el-link @click="findOneBookInfo(o.id)"
                          >《{{ o.name }}》</el-link
                        >
                      </div>
                      <div>
                        <el-rate
                          v-model="o.score"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}"
                        >
                        </el-rate>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="音 乐" name="second">
              <span slot="label"
                ><img :src="require(`@/assets/音乐.png`)" /> 音&nbsp;乐</span
              >
              <el-row
                type="flex"
                justify="center"
                align="middle"
                class="bookCard"
                v-for="(i, index) in musicss2_3"
                :key="index"
              >
                <el-col :span="12" v-for="(o, index) in i" :key="index">
                  <el-card
                    style="margin: 0 2rem 1rem 2rem"
                    :body-style="{ padding: '5px 0px 0px 0px' }"
                    shadow="hover"
                  >
                    <div style="margin: 0; padding: 0">
                      <el-image
                        style="width: 130px; height: 130px"
                        :src="o.img"
                        :preview-src-list="[o.img]"
                      >
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </el-image>
                      <div style="font-size: 14px">
                        <el-link @click="findOneMusicInfo(o.id)"
                          >《{{ o.name }}》</el-link
                        >
                      </div>
                      <div>
                        <el-rate
                          v-model="o.score"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}"
                        >
                        </el-rate>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="电 影" name="third">
              <span slot="label"
                ><img :src="require(`@/assets/电影.png`)" /> 电&nbsp;影</span
              >
              <el-row
                type="flex"
                justify="center"
                align="middle"
                class="bookCard"
                v-for="(i, index) in Movies2_3"
                :key="index"
              >
                <el-col :span="12" v-for="(o, index) in i" :key="index">
                  <el-card
                    style="margin: 0 2rem 1rem 2rem"
                    :body-style="{ padding: '5px 0px 0px 0px' }"
                    shadow="hover"
                  >
                    <div style="margin: 0; padding: 0">
                      <el-image
                        style="width: 92px; height: 130px"
                        :src="o.img"
                        :preview-src-list="[o.img]"
                      >
                        <div slot="placeholder" class="image-slot">
                          加载中<span class="dot">...</span>
                        </div>
                      </el-image>
                      <div style="font-size: 14px">
                        <el-link @click="findOneMovieInfo(o.id)"
                          >《{{ o.name }}》</el-link
                        >
                      </div>
                      <div>
                        <el-rate
                          v-model="o.score"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}"
                        >
                        </el-rate>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { getTopBook } from "@/api";
import { getTopMusic } from "@/api";
import { getTopMovie } from "@/api";
import { getTopEssay } from "@/api";

export default {
  data() {
    return {
      topEssays: [
        {
          name: "张三",
          likeNum: 15,
          title: "英语角的收获",
        },
        {
          name: "李四",
          likeNum: 14,
          title: "志愿服务令我成长",
        },
        {
          name: "王五",
          likeNum: 11,
          title: "篮球赛绽放活力",
        },
        {
          name: "刘六",
          likeNum: 8,
          title: "我的K赛之旅",
        },
        {
          name: "彭七",
          likeNum: 7,
          title: "趣味数学—体验数学之美",
        },
        {
          name: "叶八",
          likeNum: 3,
          title: "电子竞技的魅力",
        },
      ],
      activeName: "first",
      ImgUrl: [
        require(`@/assets/校园风景/1.jpg`),
        require(`@/assets/校园风景/2.jpg`),
        require(`@/assets/校园风景/3.jpg`),
        require(`@/assets/校园风景/4.jpg`),
        require(`@/assets/校园风景/5.jpg`),
        require(`@/assets/校园风景/6.jpg`),
        require(`@/assets/校园风景/7.jpg`),
      ],
      books2_3: [],
      topBooks: [
        {
          author: "",
          description: "",
          id: 0,
          img: "",
          isRecommend: 0,
          isbn: "",
          name: "",
          publisher: "",
          publisherYear: "",
          score: 0,
          scoreNum: 0,
        },
      ],
      musicss2_3: [],
      topMusics: [
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
      Movies2_3: [],
      topMovies: [
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
      topEssay: [{}],
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
    splitArr2_3(oldArr) {
      var res = [];
      var temp = [];
      if (oldArr.length > 6) {
        oldArr.length = 6;
      }
      for (let i = 0; i < oldArr.length; i++) {
        if ((i + 1) % 2 != 0) {
          temp[temp.length] = oldArr[i];
        } else {
          temp[temp.length] = oldArr[i];
          res.push(temp);
          temp = [];
        }
      }
      if (temp.length != 0) {
        res.push(temp);
      }
      return res;
    },
  },
  mounted() {
    getTopBook().then((res) => {
      this.topBooks = res.data.data;
      for (let i = 0; i < this.topBooks.length; i++) {
        this.topBooks[i].img =
          this.$store.state.imgBaseUrl + this.topBooks[i].img;
      }
      this.books2_3 = this.splitArr2_3(this.topBooks);
    });
    getTopMusic().then((res) => {
      this.topMusics = res.data.data;
      for (let i = 0; i < this.topMusics.length; i++) {
        this.topMusics[i].img =
          this.$store.state.imgBaseUrl + this.topMusics[i].img;
      }
      this.musicss2_3 = this.splitArr2_3(this.topMusics);
    });
    getTopMovie().then((res) => {
      this.topMovies = res.data.data;
      for (let i = 0; i < this.topMovies.length; i++) {
        this.topMovies[i].img =
          this.$store.state.imgBaseUrl + this.topMovies[i].img;
      }
      this.Movies2_3 = this.splitArr2_3(this.topMovies);
    });
    getTopEssay().then((res) => {
      this.topEssay = res.data.data;
      console.log(res);
    });
    console.log(this.$store.state.user.token);
  },
  components: {},
};
</script>

<style scoped>
.hero.is-medium .hero-body {
  padding-top: 0rem;
  padding-bottom: 3rem;
}
.fuck {
  overflow-y: auto;
}
.el-row {
  background-color: rgb(251, 251, 251);
}
</style>