<template>
  <div class="posts-wrap">
    <div class="masonry">
      <div class="item">
        <img src="../img/about.jpg" alt="1" />
      </div>
      <div class="item">
        <img src="../img/project2.jpg" alt="2" />
      </div>
      <div class="item">
        <img src="../img/about.jpg" alt="3" />
      </div>
      <div class="item">
        <img src="../img/project3.jpg" alt="4" />
      </div>
      <div class="item">
        <img src="../img/project4.jpg" alt="5" />
      </div>
      <div class="item">
        <img src="../img/project3.jpg" alt="6" />
      </div>
      <div class="item">
        <img src="../img/about.jpg" alt="7" />
      </div>
      <div class="item">
        <img src="../img/project4.jpg" alt="8" />
      </div>
      <div class="item">
        <img src="../img/project2.jpg" alt="9" />
      </div>
      <div class="item">
        <img src="../img/about.jpg" alt="10" />
      </div>
    </div>
    <div v-if="portfolioPosts" class="portfolio-posts masonry">
      <section v-for="post in portfolioPosts" :key="post._id" class="post card item">
        <component
          :is="setting(`portfolio.components.${comp}`)"
          v-for="(comp, i) in setting('portfolio.layout.index')"
          :key="i"
          :post-id="post._id"
          format="index"
        />
      </section>
    </div>
    <div v-else class="posts-not-found">
      <div class="text">
        <div class="title">{{ setting("portfolio.notFound.title") }}</div>
        <div class="sub-title">{{ setting("portfolio.notFound.subTitle") }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { factorLoadingRing } from "@factor/ui"
import { setting } from "@factor/api/settings"
import { stored } from "@factor/app/store"
import { requestPostIndex } from "@factor/post/request"
import Vue from "vue"
export default Vue.extend({
  components: { factorLoadingRing },
  data() {
    return {
      postType: "portfolio",
      loading: true
    }
  },
  metaInfo() {
    const tag = this.$route.params.tag || ""
    const title = tag ? `Tag "${tag}"` : "Projects"

    const description = tag ? `Articles related to tag: ${tag}` : "Projects and more..."
    return {
      title,
      description
    }
  },
  serverPrefetch() {
    return this.getPosts()
  },
  computed: {
    tag(this: any) {
      return this.$route.params.tag || this.$route.query.tag || ""
    },
    index(this: any) {
      return stored(this.postType) || {}
    },
    portfolioPosts(this: any) {
      const { posts = [] } = this.index
      return posts
    },
    page(this: any) {
      return this.$route.query.page || 1
    },
    returnLinkText() {
      return setting("portfolio.returnLinkText") || "All Projects"
    }
  },
  watch: {
    $route: {
      handler: function(this: any) {
        this.getPosts()
      }
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    setting,
    async getPosts(this: any) {
      this.loading = true

      await requestPostIndex({
        postType: this.postType,
        tag: this.tag,
        status: "published",
        sort: "-date",
        page: this.page,
        limit: setting("portfolio.limit")
      })

      this.loading = false
    }
  }
})
</script>

<style lang="less">
.posts-wrap {
  .loading-entries {
    display: flex;
    justify-content: center;
    padding: 5em;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  /* The Masonry Container */
  .masonry {
    column-count: 3;
    column-gap: 1em;
    margin: 1.5em auto;
    max-width: 100%;
    column-gap: 1.5em;

    /* The Masonry Brick */
    .item {
      background-color: #eee;
      display: inline-block;
      margin: 0 0 1em;
      width: 100%;
      transition: 0.29s cubic-bezier(0.52, 0.01, 0.16, 1);

      &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
      }
      img {
        //max-width: 100%;
        width: 100%;
        height: auto;
        vertical-align: middle;
        transition: all 0.5s ease-in-out;
        backface-visibility: hidden;
      }
    }

    @media only screen and (min-width: 1024px) {
      column-count: 3;
    }
    @media only screen and (max-width: 1023px) and (min-width: 768px) {
      column-count: 2;
    }
    @media only screen and (max-width: 767px) and (min-width: 540px) {
      column-count: 1;
    }
  }
}
</style>
