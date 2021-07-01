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
      <el-table-column prop="id" label="ID" width="40px"> </el-table-column>
      <el-table-column prop="name" label="歌名" width="120px">
        <template slot-scope="scope">
          <span>《{{ scope.row.name }}》</span>
        </template>
      </el-table-column>
      <el-table-column prop="singer" label="歌手" width="120px">
      </el-table-column>
      <el-table-column prop="album" label="专辑" width="120px">
      </el-table-column>
      <el-table-column label="图片" width="120px">
        <template slot-scope="props">
          <el-image
            style="width: 100px; height: 100px"
            :src="props.row.img"
            :preview-src-list="[props.row.img]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="lyric" label="歌词"> </el-table-column>
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
import { getMusics } from "@/api";

export default {
  data() {
    return {
      tableData: [
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getMusicsApi() {
      getMusics(1, 100).then((res) => {
        this.tableData = res.data.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].img =
            this.$store.state.imgBaseUrl + this.tableData[i].img;
        }
        // console.log(res);
      });
    },
  },
  mounted() {
    this.getMusicsApi();
  },
};
</script>

<style scoped>
</style>