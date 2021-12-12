import Vue from 'vue'
import Router from 'vue-router'
import ApiTasks from '../components/ApiTasks'
import ApiLayout from '../components/ApiLayout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'apiTasks',
      component: ApiTasks
    },
    {
      path: '/apiLayout',
      name: 'api-layout',
      component: ApiLayout
    }
  ]
})
