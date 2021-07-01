<template>
  <div>
    <el-table
      :data="tableData"
      max-height="800px"
      :border="true"
      style="width: 100%"
      :highlight-current-row="true"
      :stripe="true"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" label="ID" width="50px"></el-table-column>
      <el-table-column prop="name" label="电影名" width="120px">
        <template slot-scope="scope">
          <span>《{{ scope.row.name }}》</span>
        </template>
      </el-table-column>
      <el-table-column prop="genre" label="类型" width="120px">
      </el-table-column>
      <el-table-column prop="director" label="导演" width="120px">
      </el-table-column>
      <el-table-column label="图片" width="120px">
        <template slot-scope="props">
          <el-image
            style="width: 80px; height: 100px"
            :src="props.row.img"
            :preview-src-list="[props.row.img]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="actor" label="演员" width="200px">
      </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="score" label="得分" width="60px">
      </el-table-column>
      <el-table-column prop="scoreNum" label="评分人数" width="80px">
      </el-table-column>
      <el-table-column label="操作" width="230px">
        <el-button type="warning">修改</el-button>
        <el-button
          type="danger"
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button
        >
        <el-tooltip effect="dark" content="添加书籍" placement="right">
          <el-button type="success" icon="el-icon-plus" circle></el-button
        ></el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMovies } from "@/api";

export default {
  data() {
    return {
      tableData: [
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getMoviesApi() {
      getMovies(1, 100).then((res) => {
        this.tableData = res.data.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].img =
            this.$store.state.imgBaseUrl + this.tableData[i].img;
        }
        console.log(res);
      });
    },
  },
  mounted() {
    this.getMoviesApi();
  },
};
</script>

<style scoped>
</style>