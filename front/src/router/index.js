import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/signup.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

/*import Vue from 'vue'
import VueRouter from 'vue-router'
import signup from '../views/signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: require('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: ('../views/About.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]

const router = new VueRouter({

  mode: 'history',

  routes
  
})

export default router*/
