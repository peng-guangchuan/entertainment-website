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
          <span>《{{ scope.row.name }}》</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="活动时间" width="100px">
      </el-table-column>
      <el-table-column prop="address" label="活动地点" width="120px">
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
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="status" label="状态" width="120px">
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="报名截止时间"
        width="100px"
      ></el-table-column>
      <el-table-column prop="score" label="得分" width="60px">
      </el-table-column>
      <el-table-column prop="scoreNum" label="评分人数" width="80px">
      </el-table-column>
      <el-table-column label="操作" width="340px">
        <el-button type="warning">修改</el-button>
        <el-button
          type="danger"
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button
        >
        <el-button type="info" @click="addPic()">添加图片</el-button>
        <el-tooltip effect="dark" content="添加活动" placement="right">
          <el-button
            type="success"
            icon="el-icon-plus"
            circle
            @click="addData()"
          ></el-button
        ></el-tooltip>
      </el-table-column>
    </el-table>
    <el-dialog title="添加图片" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="发布活动" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动地点：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：" :label-width="formLabelWidth">
          <div style="float: left">
            <div class="block">
              <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="图片：" :label-width="formLabelWidth">
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
        </el-form-item> -->
        <el-form-item label="报名截止时间：" :label-width="formLabelWidth">
          <div style="float: left">
            <div class="block">
              <el-date-picker
                v-model="value2"
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
            v-model="form.name"
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
import { getAllActivity } from "@/api";

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
      dialogFormVisible2:false,
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
    addData() {
      console.log("adddata");
      this.dialogFormVisible = true;
    },
        addPic() {
      console.log("adddata");
      this.dialogFormVisible2 = true;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    getMusicsApi() {
      getAllActivity("", 1, 0, 1, 100).then((res) => {
        this.tableData = res.data.data.records;
        console.log(res);
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