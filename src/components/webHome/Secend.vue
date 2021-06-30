<template>
  <section class="hero is-white">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">校园课外娱乐网</h1>
        <h2 class="subtitle is-italic">
          <nav class="breadcrumb has-bullet-separator" aria-label="breadcrumbs">
            <ul>
              <li><a href="#">好玩</a></li>
              <li><a href="#">放松</a></li>
              <li><a href="#">知识</a></li>
              <li><a href="#">读书</a></li>
              <li><a href="#">音乐</a></li>
              <li><a href="#">电影</a></li>
              <li><a href="#">活动</a></li>
            </ul>
          </nav>
        </h2>
      </div>
    </div>
    <progress class="progress is-whrite is-small" value="100%" max="30">
      30%
    </progress>
  </section>
</template>
<script>
export default {};
</script>

<style scoped>
.title {
  text-align: left;
}
.subtitle {
  text-align: right;
}
</style>