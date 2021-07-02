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
          <span v-if="editdes != scope.row.id">《{{ scope.row.name }}》</span>
          <el-input v-else v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="genre" label="类型" width="120px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{ scope.row.genre }}</span>
          <el-input v-else v-model="scope.row.genre"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="director" label="导演" width="120px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id"
            >{{ scope.row.director }}</span
          >
          <el-input v-else v-model="scope.row.director"></el-input>
        </template>
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
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{ scope.row.actor }}</span>
          <el-input v-else v-model="scope.row.actor"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id"
            >{{ scope.row.description }}</span
          >
          <el-input type="textarea" :rows="6" v-else v-model="scope.row.description"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="score" label="得分" width="60px">
      </el-table-column>
      <el-table-column prop="scoreNum" label="评分人数" width="80px">
      </el-table-column>
      <el-table-column label="操作" width="230px">
        <template slot-scope="scope">
          <el-button
            v-if="editdes != scope.row.id"
            type="warning"
            @click="modifydata(scope.$index, tableData)"
            >修改</el-button
          >
          <el-button
            v-else
            type="success"
            @click="updateMovieApi(scope.$index, tableData)"
            >保存</el-button
          >
          <el-button type="danger" @click="removeMovie(scope.$index, tableData)"
            >删除</el-button
          >
          <el-tooltip effect="dark" content="添加电影" placement="right">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              @click="showAddDialog()"
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加新影片" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="电影名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导演：" :label-width="formLabelWidth">
          <el-input v-model="form.director" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="演员：" :label-width="formLabelWidth">
          <el-input v-model="form.actor" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.genre" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上映时间" :label-width="formLabelWidth">
          <el-input v-model="form.showtime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <div style="float: left">
            <el-upload
              class="upload-demo"
              :action="this.$store.state.imgBaseUrl + '/admin/img'"
              :headers="{ token: this.token }"
              :on-success="handleUploadSuccess"
              list-type="picture"

              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="电影简介：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMovies } from "@/api";
import { deleteMovie } from "@/api";
import { updateMovie } from "@/api";
import { addMovie } from "@/api";
export default {
  data() {
    return {
      token: "",
      dialogFormVisible: false,
      form: {
        actor: "",
        description: "",
        director: "",
        genre: "",
        img: "",
        name: "",
        showtime: "",
      },
      filelist: [],
      formLabelWidth: "120px",
      editdes: null,
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

    modifydata(index, rows) {
      this.editdes = rows[index].id;
    },

    showAddDialog() {
      this.dialogFormVisible = true;
    },

    updateMovieApi(index, rows) {
      this.editdes = -1;
      let data = rows[index];
      console.log(data);
      updateMovie(
        this.token,
        data.id,
        data.name,
        data.showtime,
        data.director,
        data.genre,
        data.description,
        data.actor
      ).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$notify({
            title: "更新成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
        } else {
          this.$notify.info({
            title: "更新失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
      setTimeout(() => {
        this.getMoviesApi();
      }, 2000);
    },

    handleUploadSuccess(res) {
      console.log(res);
      this.form.img = res.data;
    },

    addData() {
      addMovie(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$notify({
            title: "添加成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
          this.dialogFormVisible = false;
          this.getMoviesApi();
        } else {
          this.$notify.info({
            title: "添加失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
    },

    removeMovie(index, rows) {
      var id = rows[index].id;
      deleteMovie(id).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$notify({
            title: "删除成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
          this.getBooksApi();
        } else {
          this.$notify.info({
            title: "删除失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
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
    this.token = this.$store.state.admin.token;
  },
};
</script>

<style scoped>
</style>