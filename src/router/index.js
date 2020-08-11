import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home', title: 'Home'
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/Home')
  },
  {
    path: '/expenses',
    name: 'expenses-list',
    meta: {
      icon: 'list-ul', title: 'Your Expenses'
    },
    component: () => import(/* webpackChunkName: "expenses-list" */ '../views/expenses/ExpensesList')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'SignIn' },
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - Xpenses`

  if (!window.uid && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
