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
import { getSearchBook } from "@/api";

export default {
  data() {
    return {
      searchKey: "",
      selectValue: 0,
      isSearch: false,
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
    searching() {
      if (this.searchKey == "") {
        this.$message({
          showClose: true,
          message: "请输入搜索内容！",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        this.getSearchBookApi(1);
      }
    },
    getSearchBookApi(page) {
      getSearchBook(this.searchKey, this.selectValue, page).then((res) => {
        this.books.length = 0;
        this.bookInfos.length = 0;
        this.bookInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
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
        if (temp.length != 0) {
          this.books.push(temp);
        }
      });
    },
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
    getAllBookApi(page) {
      getAllBook(page).then((res) => {
        this.books.length = 0;
        this.bookInfos.length = 0;
        this.bookInfos = res.data.data.records;
        this.currentp = res.data.data.current;
        this.ptotal = res.data.data.total;
        var temp = [];
        for (let i = 0; i < this.bookInfos.length; i++) {
          this.bookInfos[i].img =
            this.$store.state.imgBaseUrl + this.bookInfos[i].img;
          if ((i + 1) % 3 != 0) {
            temp[temp.length] = this.bookInfos[i];
          } else {
            temp[temp.length] = this.bookInfos[i];
            this.books.push(temp);
            temp = [];
          }
        }
        if (temp.length != 0) {
          this.books.push(temp);
        }
      });
    },
    getNextBook() {
      if (this.isSearch) {
        this.getSearchBookApi(this.currentp);
      } else {
        this.getAllBookApi(this.currentp);
      }
    },
  },
  mounted() {
    this.getAllBookApi(1);
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