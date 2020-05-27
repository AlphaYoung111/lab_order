import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/components/Login')
const Home = () => import('@/views/Home')
const Student = () => import('@/views/common/Student')
const AllCate = () => import('@/views/common/childCom/AllCate')
const DetailRoom = () => import('@/views/common/childCom/DetailRoom')
const RoomItem = () => import('@/views/common/childCom/RoomItem')
const Profile = () => import('@/views/common/childCom/Profile')
const Admin = () => import('@/views/admin/Admin')
const ApproveOrder = () => import('@/views/admin/childCom/ApproveOrder')
const LessonTable = () => import('@/views/admin/childCom/LessonTable')
const UploadFile = () => import('@/views/admin/childCom/UploadFile')
const CanUse = () => import('@/views/admin/childCom/CanUse')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },

  {
    path: '/common',
    name: 'student',
    component: Student,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'all_cate',
        component: AllCate
      },
      {
        path: 'detail_room/:id',
        component: DetailRoom
      },
      {
        path: 'room_item/:id/:total',
        component: RoomItem
      },
      {
        path: 'profile',
        component: Profile
      }
    ]
  },
  {
    path: '/admin',
    component: Admin,
    // 管理员界面禁止
    beforeEnter: (to, from, next) => {
      const isAdmin = window.sessionStorage.getItem('isAdmin')
      if (!isAdmin) return next('/login')
      next()
    },
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'approve_order',
        component: ApproveOrder
      },
      {
        path: 'lesson_table',
        component: LessonTable
      },
      {
        path: 'upload_file',
        component: UploadFile
      },
      {
        path: 'can_use',
        component: CanUse
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //从登录页面来的
  if (to.path === '/login') return next()
  //从其他页面来的
  const haveToken = window.sessionStorage.getItem('token')
  if (!haveToken) return next('/login')
  next()
})

export default router
