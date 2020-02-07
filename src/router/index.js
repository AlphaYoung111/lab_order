import Vue from 'vue'
import VueRouter from 'vue-router'
const Admin = () => import('@/views/admin/Admin')
const Student = () => import('@/views/common/Student')
const AllCate = () => import('@/views/common/childCom/AllCate')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'student',
    component: Student,
    children: [{
      path: '/all_cate',
      component: AllCate
    }]
  },
  {
    path: '/admin',
    component: Admin
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router