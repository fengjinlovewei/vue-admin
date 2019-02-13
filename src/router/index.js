import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import NotFound from '@/components/404'
import xiaoBshowAdmin from '@/components/page/xiaoBshowAdmin'
import xiaoBorderAdmin from '@/components/page/xiaoBorderAdmin'
import supplierShowAdmin from '@/components/page/supplierShowAdmin'
import supplierOrderAdmin from '@/components/page/supplierOrderAdmin'
import memberAdmin from '@/components/page/memberAdmin'
import logo from '@/components/page/logo'

Vue.use(Router)

 let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/logo',
      children:[
        {path: 'logo',name: 'logo',component: logo},
        {path: 'xiaoBshowAdmin',name: 'xiaoBshowAdmin',component: xiaoBshowAdmin},
        {path: 'xiaoBorderAdmin',name: 'xiaoBorderAdmin',component: xiaoBorderAdmin},
        {path: 'supplierShowAdmin',name: 'supplierShowAdmin',component: supplierShowAdmin},
        {path: 'supplierOrderAdmin',name: 'supplierOrderAdmin',component: supplierOrderAdmin},
        {path: 'memberAdmin',name: 'memberAdmin',component: memberAdmin}
      ]
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    }
  ]
});

router.beforeEach((to, from, next) => {
  //NProgress.start();
  console.log(to)
  if (to.path == '/login') {
    sessionStorage.removeItem('token');
  }
  let user = sessionStorage.getItem('token');
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
