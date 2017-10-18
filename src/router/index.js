import Vue from 'vue'
import Router from 'vue-router'
import map from '@/components/map'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'map',
      component: map
    },
    {
      path: '/detail/:id/:detail',
      name: 'detail',
      component: detail
    }
  ]
})
