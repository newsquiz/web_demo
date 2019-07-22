import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/topics',
      name: 'topics',
      component: () => import('./views/Topics.vue')
    },
    {
      path: '/topics/:topic',
      name: 'topic-view',
      component: () => import('./views/TopicView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/my-content',
      name: 'my-content',
      component: () => import('./views/MyContent.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/quiz/:quiz_id',
      name: 'quiz',
      component: () => import('./views/Quiz.vue')
    },
    {
      path: "*",
      name: 'not-found',
      component: () => import('./views/Page404.vue')
    }
  ]
})
