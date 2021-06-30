<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <progress class="progress is-whrite is-small" value="100%" max="30">
        30%
      </progress>
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child box">
            <div class="fuck">
              <p class="title">校园最新活动</p>
              <hr />
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </div>
            <!-- <hr /> -->
          </article>
        </div>

        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">仲园风景图</p>
            <b-carousel>
              <b-carousel-item v-for="(carousel, i) in 6" :key="i">
                <section :class="`hero is-medium `">
                  <div class="hero-body has-text-centered">
                    <span class="image">
                      <img :src="getImgUrl(i)" />
                    </span>
                  </div>
                </section>
              </b-carousel-item>
            </b-carousel>
          </article>
        </div>
      </div>

      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">友情链接</p>
          <hr />
          <div class="content">
            <a href="http://www.zhku.edu.cn/">仲恺农业工程学院官网</a>&nbsp;
            <a href="http://jw.zhku.edu.cn">仲恺农业工程学院教务网</a>&nbsp;
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="content">
          <p class="title">高分推荐榜</p>
          <hr />
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
// import { getnew } from "@/api";
// import { gethotuser } from "@/api";

export default {
  data() {
    return {
      users: [
        {
          userId: 0,
          userPassword: 0,
          userName: "",
          userEmail: "",
          userSex: "",
          userPhone: "",
          userStatus: 0,
          userTime: "",
          userShow: "",
          userBlog: "",
          userImg: "",
          userFans: 0,
          userConcern: 0,
        },
      ],
      info: [
        {
          article: {
            artId: 0,
            artUserId: 1,
            artTitle: "",
            artTypeId: 0,
            artContent: "",
            artCommentId: 0,
            artCreTime: "",
            artView: "",
            artComNum: 0,
            artHotNum: 0,
            artLikeNum: 0,
          },
          user: {
            userId: 0,
            userPassword: 0,
            userName: "",
            userEmail: "",
            userSex: "",
            userPhone: "",
            userStatus: 0,
            userTime: "",
            userShow: "",
            userBlog: "",
            userImg: "",
            userFans: 0,
            userConcern: 0,
          },
        },
      ],
    };
  },
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/576/400`;
    },
    detail(i) {
      const detaildata = this.info[i];
      this.$router.push({
        path: "/details",
        query: {
          detaildata: JSON.stringify(detaildata),
        },
      });
    },
  },
  // mounted() {
  //   getnew().then((res) => {
  //     this.info = res.data.content;
  //   });
  //   gethotuser().then((res) => {
  //     const { data } = res;

  //     this.users = data.content;
  //   });
  // },
  components: {},
};
</script>


<style scoped>
.hero.is-medium .hero-body {
  padding-top: 0rem;
  padding-bottom: 3rem;
}
.fuck {
  /* height: 300px; */

  overflow-y: auto;
}
</style>