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
    rippleAfterEnter() {
      this.ripple = false
    },
    linkPage(linkPath: string) {
      if (linkPath !== this.$route.path) {
        this.blackoutCurtain = true
        router.push(linkPath)
      }
    },
    blackoutCurtainAfterEnter(el: HTMLElement) {
      const delay = Number(el.dataset.index as string) * 1000
      console.log(delay)
      setTimeout(() => {
        this.blackoutCurtain = false
      }, delay)
      // this.blackoutCurtain = false
    },
    blackoutCurtainLeave() {
      console.log('leave')
    },
    blackoutCurtainStyle() {
      return ''
    }
  }
})
