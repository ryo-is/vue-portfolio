<template lang="pug">
  v-app
    v-card(height="54px" flat tile)
      v-app-bar.pl-12.pr-6(
        color="blue-grey darken-4" height="54px"
        prominent dense absolute elevate-on-scroll scroll-target=".main-content"
      )
        v-toolbar-items.hidden-sm-and-down
          v-btn(
            v-for="item in toolbarItems", :key="item.text"
            :color="changeLinkButtonProps(item.link, 'color')"
            :text="changeLinkButtonProps(item.link, 'text')"
            dark depressed width=160 @click="linkPage(item.link)") {{ item.text }}
    v-content.main-content.overflow-y-auto
      transition(appear name="fade")
        router-view
</template>

<script lang="ts">
import Vue from 'vue'
import router from '@/router/index'

const toolbarItems = [
  { text: 'home', link: '/' },
  { text: 'info', link: '/info' },
  { text: 'skill', link: '/skill' },
  { text: 'contact', link: '/contact' }
]

const states = { toolbarItems }

export default Vue.extend({
  data() {
    return states
  },
  computed: {
    changeLinkButtonProps(): Function {
      const currentRoute: string = this.$route.path
      return (routeString: string, propText: string): string | boolean => {
        switch (propText) {
          case 'text':
            return routeString !== currentRoute
          default:
            return routeString === currentRoute ? 'blue-grey darken-3' : ''
        }
      }
    }
  },
  methods: {
    linkPage(linkPath: string): void {
      if (linkPath !== this.$route.path) {
        router.push(linkPath)
      }
    }
  }
})
</script>

<style lang="scss">
body {
  margin: 0;

  // スクロールバー非表示
  ::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  // &::-webkit-scrollbar-track {
  //   background-color: $scrollbar-track-color;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background: rgba($scrollbar-thumb-color, .6);
  //   border-radius: 8px;
  // }
}

#app {
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'メイリオ',
    Meiryo, 'ＭＳ Ｐゴシック', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .main-content {
    height: calc(100vh - 54px);
    position: relative;

    &::-webkit-scrollbar {
      width: 0px;
    }

    .fade-enter-active {
      transition: opacity 0.5s ease 0.5s;
    }

    .fade-leave-active {
      transition: opacity 0.5s;
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    .test {
      background-color: #fff;
      height: calc(100vh - 54px);
      position: absolute;
      top: 0;
      width: 200px;
    }
  }
}
</style>
