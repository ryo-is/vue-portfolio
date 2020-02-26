import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Index.vue'
import Info from '../views/info/Index.vue'
import Skill from '../views/skill/Index.vue'
import Acounts from '../views/acounts/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/skill',
    name: 'Skill',
    component: Skill
  },
  {
    path: '/acounts',
    name: 'Acounts',
    component: Acounts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
