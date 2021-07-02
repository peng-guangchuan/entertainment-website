<template>
  <div>
    <Top />
    <div id="Wrapper">
      <div class="content">
        <div id="Leftbar"></div>
        <div id="Rightbar">
          <div class="sep20"></div>
          <div class="box">
            <div class="cell">发帖提示</div>
            <div class="inner">
              <ul style="margin-top: 0px">
                <li>
                  <span class="f13">主题标题</span>
                  <div class="sep10"></div>
                  请在标题中描述内容要点。
                  <div class="sep10"></div>
                </li>
                <li>
                  <div
                    class="fr"
                    style="margin-top: -5px; margin-right: 5px"
                  ></div>
                  <span class="f13">正文</span>
                  <div class="sep10"></div>
                  可以在正文中为你要发布的主题添加更多细节。
                  <div class="sep10"></div>
                </li>
                <li>
                  <span class="f13">点击发布</span>
                  <div class="sep10"></div>
                  在最后，确保内容无误时进行发布按钮的点击即可。
                  <div class="sep10"></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="sep20"></div>
          <div class="box">
            <div class="cell">论坛原则</div>
            <div class="inner">
              <ul style="margin-top: 0px">
                <li>
                  <span class="f13">尊重原创</span>
                  <div class="sep10"></div>
                  请不要在该论坛发布任何盗版下载链接，包括软件、音乐、电影等等。
                  <div class="sep10"></div>
                </li>
                <li>
                  <span class="f13">友好互助</span>
                  <div class="sep10"></div>
                  保持对陌生人的友善。用知识去帮助别人。
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="Main">
          <div class="sep20"></div>
          <div class="box" id="box">
            <div class="cell">
              <a href="#">@{{ $store.state.user.name }}</a>
              <span class="chevron">&nbsp;›&nbsp;</span> 发表新帖
            </div>
            <form method="post" action="/new" id="compose">
              <div class="cell">
                <div class="fr fade" id="title_remaining">20</div>
                帖子标题
              </div>
              <div class="cell" style="padding: 0px">
                <textarea
                  v-model="title"
                  class="msl"
                  rows="1"
                  maxlength="20"
                  id="topic_title"
                  name="title"
                  autofocus="autofocus"
                  placeholder="请输入帖子标题，标题长度不得超过20"
                ></textarea>
              </div>
              <div class="cell">
                <div class="fr fade" id="content_remaining">10000</div>
                正文
              </div>

              <input type="hidden" name="content" value id="topic_content" />
              <input type="hidden" name="once" value="97891" />
            </form>

            <div>
              <div class="navone">
                <div
                  v-loading="quillUpdateImg"
                  element-loading-text="请稍等，图片上传中"
                >
                  <!-- 图片上传组件辅助-->
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :on-change="imgBroadcastChange"
                    :auto-upload="false"
                    name="file"
                    :headers="header"
                    :show-file-list="false"
                    :data="uploadData"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeUpload"
                    accept="image/jpg,image/png,image/jpeg"
                  >
                  </el-upload>
                  <div>
                    <quill-editor
                      class="editor"
                      v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"
                    >
                    </quill-editor>
                  </div>
                </div>
              </div>
            </div>
            <div class="cell">
              <div class="fr">
                <span id="error_message"></span> &nbsp;
                <button
                  type="button"
                  class="super normal button"
                  @click="post"
                  v-if="postSwitch"
                >
                  <li class="fa fa-paper-plane"></li>
                  &nbsp;发布
                </button>
                <button
                  type="button"
                  class="super normal button"
                  @click="updataArt"
                  v-else
                >
                  <li class="fa fa-paper-plane"></li>
                  &nbsp;更新
                </button>
              </div>
              <button class="super normal button" onclick="previewTopic();">
                <li class="fa fa-eye"></li>
                &nbsp;
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="c"></div>
      <div class="sep20"></div>
    </div>
    <Footer />
  </div>
</template>



<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { postNewEssay } from "@/api";
import Top from "../webHome/Top";
import Footer from "../webHome/Footer";

// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"], // 链接、图片、视频
];

export default {
  components: {
    quillEditor,
    Top,
    Footer,
  },
  data() {
    return {
      select: "选择",
      postSwitch: true,
      title: "",
      text: "",
      userId: 0,
      artId: 0,
      activityid: 0,
      uploadData: {}, // 图片文件
      // serverUrl: "/dev-api/wxmaterial/newsImgUpload", // 这里写你要上传的图片服务器地址
      header: {
        // 有的图片服务器要求请求头需要有token，有的可以加上
        Authorization: "Bearer ",
      },
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: "", // 内容
      fileing: "",
      editorOption: {
        // 配置项
        // placeholder: "",
        theme: "snow", // or 'bubble'
        // placeholder: "请输入文章内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              link: function (value) {
                if (value) {
                  var href = prompt("注意！只支持公众号图文链接");
                  this.quill.format("link", href);
                } else {
                  this.quill.format("link", false);
                }
              },
            },
          },
        },
      },
    };
  },
  methods: {
    post() {
      postNewEssay(
        this.$store.state.user.token,
        4,
        this.activityid,
        this.$store.state.user.id,
        1,
        this.content,
        this.title
      )
        .then((res) => {
          console.log(res);
          if (res.data.code == 20000) {
            this.$notify({
              message: "随笔发布成功",
              type: "success",
              position: "bottom-right",
            });
            this.$router.push("/");
          }
        })
        .catch();
    },
    onEditorBlur() {
      // param: editor
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
    },
    // 富文本图片上传前
    beforeUpload() {
      // 显示loading动画
      this.quillUpdateImg = true;
    },
    // uploadSuccess(res, file) {
    uploadSuccess(res) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.data) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.config.baseURL + res.data);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },

    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    imgBroadcastChange(file) {
      this.fileimg = file.raw; //保存全局对象，用以上传方法使用
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isLt2M) {
        let formData = new FormData();
        formData.append("file", this.fileimg);
        this.$axios({
          method: "post",
          url: "/stu/img",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            token: this.$store.state.user.token,
          },
        }).then((res) => {
          this.uploadSuccess(res);
        });
      } else {
        this.$message.error("上传封面图片大小不能超过 2MB!");
      }
    },
  },
  mounted() {
    this.activityid = this.$route.query.id;
  },
};
</script>

<style scoped>
.editor {
  line-height: normal !important;
  height: 420px;
  width: 730px;
  margin: 20px auto;
  display: inline-block;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.fade {
  color: #ccc;
}
.msl {
  width: 100%;
  border: none;
  resize: none;
  background-color: #f9f9f9;
  outline: 0;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  font-family: helvetica neue, hiragino sans gb, microsoft yahei, sans-serif;
  margin: 0;
  box-sizing: border-box;
}
textarea {
  /* -webkit-writing-mode: horizontal-tb !important; */
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textarea;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  flex-direction: column;
  resize: auto;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  margin: 0em;
  font: 400 13.3333px Arial;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 169, 169);
  border-image: initial;
  padding: 2px;
}
style Attribute {
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  font-size: 14px;
  line-height: 120%;
}
#Bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  background-color: var(--box-background-color);
  text-align: center;
  color: #999;
  padding: 0 10px;
}
div {
  display: block;
}
body {
  padding: 0px;
  margin: 0px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", "Segoe UI",
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
}
:root {
  --box-background-color: #fff;
  --box-background-alt-color: #f9f9f9;
  --box-background-hover-color: #fafafa;
  --box-foreground-color: #000;
  --box-border-color: #e2e2e2;
  --box-border-radius: 3px;
}
#Top {
  text-align: center;
  background-color: var(--box-background-color);
  height: 44px;
  font-size: 15px;
  font-weight: 500;
  background-size: 44px 44px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  padding: 0 20px;
}
#Wrapper {
  text-align: center;
  background-color: #e2e2e2;
  background-image: url(/static/img/shadow_light.png);
  background-repeat: repeat-x;
}
#Top > .content {
  max-width: 1060px;
}
.content {
  min-width: 600px;
  max-width: 1100px;
  margin: 0 auto;
}
/* table[Attributes Style] {
  -webkit-border-horizontal-spacing: 0px;
  -webkit-border-vertical-spacing: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  width: 100%;
} */
user agent stylesheet table {
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
/* td[Attributes Style] {
  width: 110px;
  text-align: -webkit-left;
} */
user agent stylesheet td {
  display: table-cell;
  vertical-align: inherit;
}
.c {
  clear: both;
}
.sep20 {
  height: 20px;
}
#Leftbar {
  width: 0;
  float: left;
}
#Rightbar {
  width: 270px;
  float: right;
  margin-right: 20px;
}
.fr {
  float: right;
  text-align: right;
}
#Main {
  width: auto;
  margin: 0 310px 0 20px;
}
.box {
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e2e2e2;
}
.cell {
  padding: 10px;
  font-size: 14px;
  line-height: 120%;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}
.inner {
  padding: 10px;
  font-size: 14px;
  line-height: 150%;
  text-align: left;
}
ul {
  margin: 15px 0 15px 20px;
  padding: 0;
}
user agent stylesheet ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
ol li,
ul li {
  padding: 0;
  margin: 0;
}
user agent stylesheet li {
  display: list-item;
  text-align: -webkit-match-parent;
}
.f13 {
  font-size: 13px;
}
.sep10 {
  height: 10px;
}
form {
  display: block;
  margin-top: 0em;
}
element.style {
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
  font-size: 14px;
  line-height: 120%;
}
input[type="hidden" i] {
  display: none;
  -webkit-appearance: initial;
  background-color: initial;
  cursor: default;
  padding: initial;
  border: initial;
}
#editor {
  position: relative;
  width: auto;
  height: 600px;
  font-size: 16px;
  line-height: 130%;
}
user agent stylesheet input {
  /* -webkit-writing-mode: horizontal-tb !important; */
  text-rendering: auto;
  color: -internal-light-dark-color(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  -webkit-appearance: textfield;
  background-color: -internal-light-dark-color(white, black);
  -webkit-rtl-ordering: logical;
  cursor: text;
  margin: 0em;
  font: 400 13.3333px Arial;
  padding: 1px 0px;
  border-width: 2px;
  border-style: inset;
  border-color: initial;
  border-image: initial;
}
</style>
