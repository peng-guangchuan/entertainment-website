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
      <el-table-column prop="name" label="活动名称" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="活动时间" width="100px">
      </el-table-column>
      <el-table-column prop="address" label="活动地点" width="120px">
      </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="status" label="状态" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">有效</span>
          <span v-if="scope.row.status == 2">已过期</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="报名截止时间"
        width="100px"
      ></el-table-column>
      <el-table-column label="操作" width="340px">
        <template slot-scope="scope">
          <el-button type="warning">修改</el-button>
          <el-button type="danger" @click="deleteRow(scope.$index, tableData)"
            >删除</el-button
          >
          <el-button type="info" @click="addPic(scope.$index, tableData)"
            >添加图片</el-button
          >
          <el-tooltip effect="dark" content="添加活动" placement="right">
            <el-button
              type="success"
              icon="el-icon-plus"
              circle
              @click="dialogFormVisible2 = true"
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加图片" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="图片：" :label-width="formLabelWidth">
          <div style="float: left">
            <el-upload
              :action="
                this.$store.state.imgBaseUrl +
                '/admin/activity/' +
                this.imageWall.id +
                '/img'
              "
              :headers="{ token: this.$store.state.admin.token }"
              list-type="picture-card"
              :file-list="this.imageWall.list"
              :on-success="handleUploadSuccess"
              :on-preview="handlePictureCardPreview"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClearImgWall">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="发布活动" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item label="活动名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动地点：" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：" :label-width="formLabelWidth">
          <div style="float: left">
            <div class="block">
              <el-date-picker
                v-model="form.date"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="报名截止时间：" :label-width="formLabelWidth">
          <div style="float: left">
            <div class="block">
              <el-date-picker
                v-model="form.deadline"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="活动内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addActivityApi">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllActivity } from "@/api";
import { getOneActivityImg } from "@/api";
import { addActivityImage } from "@/api";
import { addActivity } from "@/api";
import { deleteActivity } from "@/api";

getOneActivityImg;
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      value3: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,

      dialogImageUrl: "",
      dialogVisible: false,

      imageList: [],

      form: {
        name: "",
        date: "",
        owner: "",
        address: "",
        description: "",
        deadline: "",
      },
      imageWall: {
        id: "",
        list: [],
      },
      formLabelWidth: "120px",
      tableData: [
        {
          address: "",
          deadline: "",
          description: "",
          id: 0,
          isRecommend: 0,
          name: "",
          owner: 0,
          peopleNum: 0,
          status: 0,
          time: "",
        },
      ],
    };
  },
  methods: {
    addActivityApi() {
      console.log(this.form);
      Date.prototype.format = function (fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        }
        for (var k in o) {
          if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
          }
        }
        return fmt;
      };

      let formdata = new FormData();
      formdata.append("name", this.form.name);
      formdata.append("owner", this.$store.state.admin.id);
      formdata.append("address", this.form.address);

      formdata.append(
        "time",
        new Date(this.form.date).format("yyyy-MM-dd hh:mm:ss")
      );
      formdata.append(
        "deadline",
        new Date(this.form.deadline).format("yyyy-MM-dd hh:mm:ss")
      );
      formdata.append("description", this.form.description);

      // this.form.owner = this.$store.state.admin.id;
      // this.form.time = new Date(this.form.deadline);
      // this.form.deadline = new Date(this.form.deadline);

      addActivity(this.$store.state.admin.token, formdata).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$notify({
            title: "添加成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
          this.dialogFormVisible2 = false;
          this.form = {};
          this.getDataApi();
        } else {
          this.$notify.info({
            title: "添加失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
    },

    addPic(index, rows) {
      var id = rows[index].id;
      this.imageWall.id = id;
      console.log("活动" + id + "图片列表");
      getOneActivityImg(id).then((res) => {
        console.log(res);
        this.imageList = res.data.data;
        for (let i = 0; i < this.imageList.length; i++) {
          let data = this.imageList[i];
          console.log(data);
          this.imageWall.list.push({
            name: data.imgId,
            url: this.$store.state.imgBaseUrl + data.url,
          });
        }
      });
      this.dialogFormVisible = true;
    },
    deleteRow(index, rows) {
      
      var id = rows[index].id;
      console.log(id);
      deleteActivity(id, this.$store.state.admin.token).then((res) => {
        console.log(res);
        if (res.data.code == 20000) {
          this.$notify({
            title: "删除成功！",
            message: "",
            type: "success",
            position: "bottom-right",
          });
          this.getDataApi();
        } else {
          this.$notify.info({
            title: "删除失败。",
            message: "",
            position: "bottom-right",
          });
        }
      });
    },
    getDataApi() {
      getAllActivity("", 1, 0, 1, 100).then((res) => {
        this.tableData = res.data.data.records;
        console.log(res);
      });
    },

    addActivityImageApi(file, id) {
      addActivityImage(this.$store.state.admin.token, file, id).then((res) => {
        console.log("上传图片返回结果");
        console.log(res);
      });
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleClearImgWall() {
      this.dialogFormVisible = false;
      this.imageWall = { id: "", list: [] };
    },

    handleUploadSuccess(res) {
      console.log(res);
      this.imageList.push(res.data);
    },
  },
  mounted() {
    this.getDataApi();
  },
};
</script>

<style scoped>
</style>