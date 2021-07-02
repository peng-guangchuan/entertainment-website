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
            
            style="width: 80px; height: 100px"
            :src="props.row.img"
            :preview-src-list="[props.row.img]"
          ></el-image>
          <!-- <el-input v-else v-model="props.row.img"></el-input> -->
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
            @click="updateBookApi(scope.$index, tableData)"
            >保存</el-button
          >
          <el-button type="danger" @click="removeBook(scope.$index, tableData)"
            >删除</el-button
          >
          <el-tooltip effect="dark" content="添加书籍" placement="top">
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
    <el-dialog title="添加新书" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN：" :label-width="formLabelWidth">
          <el-input v-model="form.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者：" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <div style="float: left">
            <el-upload
              class="upload-demo"
              :action="this.$store.state.imgBaseUrl + '/admin/img'"
              :headers="{ token: this.token }"
              :on-success="handleUploadSuccess"
              list-type="picture"
              multiple
              :limit="1"

            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input v-model="form.publisher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版年" :label-width="formLabelWidth">
          <el-input v-model="form.publisherYear" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍简介：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBooks } from "@/api";
import { deleteBook } from "@/api";
import { addBook } from "@/api";
import { updateBook } from "@/api";
export default {
  data() {
    return {
      token: "",
      dialogFormVisible: false,
      form: {
        name: "",
        publisher: "",
        publisherYear: "",
        author: "",
        isbn: "",
        description: "",
        img: "",
      },
      filelist: [],
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
    
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    modifydata(index, rows) {
      this.editdes = rows[index].id;
    },

    showAddDialog() {
      this.dialogFormVisible = true;
    },

    updateBookApi(index,rows){
      this.editdes = -1;
      let data = rows[index];
      console.log(data);
      updateBook(this.token,data.id,data.name,data.publisher,data.publisherYear,data.author,data.isbn,data.description).then((res)=>{
        console.log(res);
        if(res.data.code == 20000){
          this.$notify({
            title: "更新成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
        }
        else{
          this.$notify.info({
            title: "更新失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
      setTimeout(() => {this.getBooksApi()}, 2000);

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

    handleUploadSuccess(res) {
      console.log(res);
      this.form.img = res.data;
    },

    addData() {
      addBook(this.form).then((res)=>{
        console.log(res);
        if(res.data.code == 20000){
          this.$notify({
            title: "添加成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
          this.dialogFormVisible = false
          this.getBooksApi();
        }
        else{
          this.$notify.info({
            title: "添加失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
      
    },


    removeBook(index, rows) {
      var bookid = rows[index].id;
      deleteBook(bookid).then((res) => {
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
  },
  mounted() {
    this.getBooksApi();
    this.token = this.$store.state.admin.token;
  },
};
</script>

<style scoped>
</style>
