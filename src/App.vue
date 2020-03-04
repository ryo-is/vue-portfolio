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
      .content-wrapper(@click="onClick")
        transition(appear name="page-transition")
          router-view
      .blackout-curtain.wrapper
        transition(v-for="n of 10" :key="n" appear name="blackout-curtain" @after-enter="afterBlackoutCurtainEnter")
          .curtain-bar(v-if="blackoutCurtain" :style="{top: (n - 1) * 10 + '%'}")
        transition(v-for="n of 10" :key="n" appear name="blackout-curtain-after" @after-enter="afterBlackoutCurtainEnter")
          .curtain-bar(v-if="blackoutCurtain" :style="{top: (n - 1) * 10 + 5 + '%'}")
      .ripple-wrapper.wrapper.overflow-y-hidden
        transition(appear name="ripple" @after-enter="afterRippleEnter")
          span.ripple(v-if="ripple", :style="{top: y + 'px', left: x + 'px'}")
</template>

<script lang="ts">
import Vue from 'vue'
import router from '@/router/index'

const toolbarItems = [
  { text: 'home', link: '/' },
  { text: 'info', link: '/info' },
  { text: 'skill', link: '/skill' },
  { text: 'acounts', link: '/acounts' }
]

const states = {
  toolbarItems,
  blackoutCurtain: false,
  ripple: false,
  x: 0,
  y: 0
}

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
    onClick(e: MouseEvent) {
      this.ripple = true
      this.x = e.pageX
      this.y = e.pageY
    },
    afterRippleEnter() {
      this.ripple = false
    },
    linkPage(linkPath: string) {
      if (linkPath !== this.$route.path) {
        this.blackoutCurtain = true
        router.push(linkPath)
      }
    },
    afterBlackoutCurtainEnter() {
      this.blackoutCurtain = false
    },
    blackoutCurtainStyle() {
      return ''
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
}

#app {
  font-family: 'Hiragino Kaku Gothic Pro', 'ヒラギノ角ゴ Pro W3', 'メイリオ',
    Meiryo, 'MS Pゴシック', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .main-content {
    height: calc(100vh - 54px);
    position: relative;

    &::-webkit-scrollbar {
      width: 0px;
    }

    @mixin pageTransition($enterDelay: 0s) {
      &-enter-active,
      &-leave-active {
        transition: opacity 0.5s ease $enterDelay;
      }

      &-enter,
      &-leave-to {
        opacity: 0;
      }
    }

    @mixin blackoutCurtain($enterDelay: 0s) {
      @include pageTransition(0s);

      &-leave-active {
        transform: translate(0px, 0px);
        transition: transform 0.5s ease-in-out 0s;
      }

      &-leave-to {
        opacity: 1;
        transform: translateX(0) translateX(100vw);
      }
    }

    .page-transition {
      @include pageTransition(0s);
    }

    .blackout-curtain {
      @include blackoutCurtain(0s);
    }

    .blackout-curtain-after {
      @include blackoutCurtain(0s);

      &-leave-to {
        transform: translateX(-100vw) translateX(0vw);
      }
    }
  }

  .wrapper {
    height: 100%;
    left: 0;
    pointer-events: none;
    top: 0;
    width: 100%;
  }

  .blackout-curtain {
    position: absolute;

    .curtain-bar {
      background-color: #080808;
      height: 5%;
      position: absolute;
      width: 100%;
    }
  }

  .ripple-wrapper {
    position: fixed;

    .ripple {
      display: block;
      width: 180px;
      height: 180px;
      border-radius: 120px;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      background-color: rgba(#9e9e9e, 0.4);
      opacity: 0;
      transform: translate(-50%, -50%) scale(10);
      transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;

      &-enter {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0);
      }
    }
  }
}
</style>
