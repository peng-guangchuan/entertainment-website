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
      <el-table-column prop="name" label="书名" width="120px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">《{{ scope.row.name }}》</span>
          <el-input v-else v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>

      <el-table-column prop="isbn" label="ISBN码" width="140px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{ scope.row.isbn }}</span>
          <el-input v-else v-model="scope.row.isbn"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{ scope.row.author }}</span>
          <el-input v-else v-model="scope.row.author"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="120px">
        <template slot-scope="props">
          <el-image
            v-if="editdes != props.row.id"
            style="width: 80px; height: 100px"
            :src="props.row.img"
            :preview-src-list="[props.row.img]"
          ></el-image>
          <el-input v-else v-model="props.row.img"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="简介">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{
            scope.row.description
          }}</span>
          <el-input
            type="textarea"
            :rows="6"
            v-else
            v-model="scope.row.description"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="出版社" width="120px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{ scope.row.publisher }}</span>
          <el-input v-else v-model="scope.row.publisher"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="publisherYear" label="出版年" width="80px">
        <template slot-scope="scope">
          <span v-if="editdes != scope.row.id">{{
            scope.row.publisherYear
          }}</span>
          <el-input v-else v-model="scope.row.publisherYear"></el-input>
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
            @click="modifydata(scope.$index, tableData)"
            >保存</el-button
          >
          <el-button
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            >删除</el-button
          >
          <el-tooltip effect="dark" content="添加书籍" placement="top">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              @click="addData()"
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加新书" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBM：" :label-width="formLabelWidth">
          <el-input v-model="form.region" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者：" :label-width="formLabelWidth">
          <el-input v-model="form.date1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <div style="float: left">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="form.date2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版年" :label-width="formLabelWidth">
          <el-input v-model="form.resource" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.desc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBooks } from "@/api";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      editdes: null,
      tableData: [
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
    modifydata(index, rows) {
      this.editdes = rows[index].id;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addData() {
      console.log("adddata");
      this.dialogFormVisible = true;
    },
    getBooksApi() {
      getBooks(1, 100).then((res) => {
        this.tableData = res.data.data.records;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].img =
            this.$store.state.imgBaseUrl + this.tableData[i].img;
        }
      });
    },
  },
  mounted() {
    this.getBooksApi();
  },
};
</script>

<style scoped>
</style>
