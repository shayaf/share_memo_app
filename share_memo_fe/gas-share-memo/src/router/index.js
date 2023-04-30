import Vue from 'vue'
import VueRouter from 'vue-router'
import ItemList from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: ItemList
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: ItemDetail
  },
]

const router = new VueRouter({
  routes
})

export default router
