<template>
  <div>
    <el-row
      type="flex"
      justify="center"
      align="middle"
      class="bookCard"
      v-for="(i, index) in books"
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
            <div>{{ o.author }}</div>
            <div>{{ o.publisher }}</div>
            <el-button type="text" class="button" @click="findOneBookInfo(o.id)"
              >查看详情</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <div>
      <el-drawer
        title="书籍详情"
        :visible.sync="drawer"
        :destroy-on-close="true"
      >
        <el-container>
          <el-header
            ><span class="subtitle is-3"
              >《{{ oneBookInfo.name }}》</span
            ></el-header
          >
          <el-container>
            <el-aside width="235px" class="drw-asi">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </el-aside>
            <el-container>
              <el-main class="drw-m">
                <div>
                  <span class="textTag">作者:</span>{{ oneBookInfo.author }}
                </div>
                <div>
                  <span class="textTag">出版社:</span
                  >{{ oneBookInfo.publisher }}
                </div>
                <div>
                  <span class="textTag">出版年:</span
                  >{{ oneBookInfo.publisherYear }}
                </div>
                <div>
                  <span class="textTag">ISBN:</span>{{ oneBookInfo.isbn }}
                </div>
              </el-main>
            </el-container>
          </el-container>
          <el-footer> 评分 </el-footer>
          <div class="abc" >
            <div v-for="i in 1002" :key="i">{{i}}</div>
          </div>
        </el-container>
      </el-drawer>
    </div> -->
    <div class="block bookCard">
      <el-pagination
        @current-change="getNextBook()"
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
import { getAllBook } from "@/api";
// import { getOneBook } from "@/api";

export default {
  data() {
    return {
      // drawer: false,
      currentp: 1,
      psize: 9,
      ptotal: 0,
      books: [],
      bookInfos: [
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
    };
  },
  methods: {
    findOneBookInfo(bookid) {
      // this.drawer = true;
      // getOneBook(bookid).then((res) => {
      //   console.log(res);
      //   this.oneBookInfo = res.data.data;
      //   console.log(this.oneBookInfo);
      this.$router.push({
        path: "/bookdetail",
        query: {
          id: bookid,
        },
      });
      // this.$router.push("/bookdetail");
      // });
    },
    getNextBook() {
      // console.log("getNextBook");
      getAllBook(this.currentp).then((res) => {
        // console.log("res=");
        // console.log(res);
        this.books.length = 0;
        this.bookInfos.length = 0;
        this.bookInfos = res.data.data.records;
        // console.log(this.bookInfos);
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;

        // var temparr = []
        var temp = [];
        for (let i = 0; i < this.bookInfos.length; i++) {
          this.bookInfos[i].img =
            this.$store.state.imgBaseUrl + this.bookInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.bookInfos[i];
          } else {
            temp[temp.length] = this.bookInfos[i];
            // temparr[temparr.length] = temp;
            this.books.push(temp);
            temp = [];
          }
        }
        // this.$set(this.books, this., obj)
        // console.log(this.books);
      });
    },
  },
  mounted() {
    getAllBook(1).then((res) => {
      // console.log("res=");
      // console.log(res);
      this.bookInfos = res.data.data.records;
      // console.log(this.bookInfos);
      this.currentp = res.data.data.current; // 分页可对数据转型
      this.ptotal = res.data.data.total;
      var temp = [];
      for (let i = 0; i < this.bookInfos.length; i++) {
        this.bookInfos[i].img =
          this.$store.state.imgBaseUrl + this.bookInfos[i].img;
        if ((i + 1) % 3 != 0) {
          temp[temp.length] = this.bookInfos[i];
        } else {
          temp[temp.length] = this.bookInfos[i];
          this.books[this.books.length] = temp;
          temp = [];
        }
      }
      // console.log(this.books);
    });
  },
  computed: {},
};
</script>

<style scoped>
.bookMain {
  background-color: red;
}
.bookCard {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
/* .drw-asi {
  width: 235px;
  margin-left: 1rem;
}
.drw-m {
  text-align: left;
  padding: 0px;
  padding-left: 1rem;
}
.textTag {
  color: gray;
} */
</style>

