import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const Admin = () => import('@/views/admin/Admin')
const Student = () => import('@/views/common/Student')
const AllCate = () => import('@/views/common/childCom/AllCate')
const DetailRoom = () => import('@/views/common/childCom/DetailRoom')
const RoomItem = () => import('@/views/common/childCom/RoomItem')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'student',
    component: Student,
    children: [{
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/all_cate',
        component: AllCate
      },
      {
        path: '/detail_room/:id',
        component: DetailRoom
      },
      {
        path: '/room_item/:id',
        component: RoomItem
      }
    ]
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