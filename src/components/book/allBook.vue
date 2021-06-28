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
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <div>《{{o.name}}》</div>
            <div>作者:{{ o.author }}</div>
            <div>出版社:{{ o.publisher }}</div>
            <el-button type="text" class="button">查看详情</el-button>
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

export default {
  data() {
    return {
      currentp: 1,
      psize: 9,
      ptotal: 19,
      books: [
      ],
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
    getNextBook() {
      console.log("getNextBook");
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
</style>

